import BookShelf from "./BookShelf";
import { Link } from "react-router-dom"
import useBooksContext from "../hooks/use-books-context";

function MainPage() {
    const { books } = useBooksContext();

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <BookShelf
                    shelf="Currently Reading"
                    bookList={books.filter(book => book.shelf === "currentlyReading")} />
                <BookShelf
                    shelf="Want to Read"
                    bookList={books.filter(book => book.shelf === "wantToRead")} />
                <BookShelf
                    shelf="Read"
                    bookList={books.filter(book => book.shelf === "read")} />
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
}

export default MainPage;