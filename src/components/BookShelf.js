import BookList from "./BookList";

function BookShelf({ shelf, bookList }) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    <BookList bookList={bookList} />
                </ol>
            </div>
        </div>
    );
}

export default BookShelf;