import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookList from "./BookList";
import useBooksContext from "../hooks/use-books-context";

function SearchPage() {
  const [text, setText] = useState("");
  const { searchResult, searchBooks } = useBooksContext();

  // make the api call whenever the text state is updated
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      searchBooks(text);
    }
    
    return () => {
      mounted = false;
    };
  }, [text]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={text}
            onChange={(e) => { setText(e.target.value) }}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          <BookList bookList={searchResult} />
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;