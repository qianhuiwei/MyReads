import { createContext, useState, useCallback } from "react";
import { getAll, update, search } from "../utils/BooksAPI";

const BooksContext = createContext();

function Provider({ children }) {
    const [books, setBooks] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

    const getBooks = useCallback(async () => {
        setBooks(await getAll());
    }, []);

    const updateBookShelf = async (book, newShelf) => {
        book.shelf = newShelf;
        // step 1: update the book status in the db
        await update(book, newShelf)
            // step 2: update the books state with the specific book and its new shelf
            .then(() => {
                setBooks([...books.filter(b => b.id !== book.id), book]);
            });
    }

    const searchBooks = async (text) => {
        const res = await search(text);
        if (!res) {
            setSearchResult([]);
        } else if (res.error) {
            setSearchResult(res);
        } else {
            // step 1: filter out books without a thumbnail
            // step 2: sync book shlef status
            setSearchResult(syncBookStatus(filterBooks(res)));
        }
    }

    // Helper function that filters out books without a thumbnail
    const filterBooks = (searchReturnedBooks) => {
        return searchReturnedBooks.filter(book => book.imageLinks);
    }

    // Helper function that makes sure the books has correct book shelf 
    const syncBookStatus = (searchReturnedBooks) => {
        return searchReturnedBooks.map(searchBook => {
            const bookFound = books.find(book => book.id === searchBook.id);
            if (bookFound) {
                searchBook.shelf = bookFound.shelf;
            } else {
                searchBook.shelf = "none";
            }
            return searchBook;
        })
    }

    const booksContext = {
        books,
        searchResult,
        getBooks,
        updateBookShelf,
        searchBooks,
    };

    return <BooksContext.Provider value={booksContext}>
        {children}
    </BooksContext.Provider>
}

export { Provider };
export default BooksContext;