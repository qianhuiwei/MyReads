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
        // first update the book status in the db
        await update(book, newShelf)
            // then update the books state with the specific book and its new shelf
            .then(() => {
                setBooks([...books.filter(b => b.id !== book.id), book]);
            });
    }

    const searchBooks = async (text) => {
        const res = await search(text);
        if (!res || res.error) {
            setSearchResult([]);
        } else {
            syncBookStatus(res);
            setSearchResult(filterBooks(res));
        }
    }

    // Helper function that makes sure the books has correct book shelf 
    const syncBookStatus = (rawData) => {
        rawData.forEach(rawBook => {
            books.forEach(book => {
                if (rawBook.id === book.id) {
                    rawBook.shelf = book.shelf;
                }
            });
        });
    }

    // Helper function that filters out books without a thumbnail
    const filterBooks = (rawData) => {
        return rawData.filter(book => book.imageLinks);
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