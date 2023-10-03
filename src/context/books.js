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
        await update(book, newShelf);
        setBooks(await getAll());
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