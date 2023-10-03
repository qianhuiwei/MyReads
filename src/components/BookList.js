import Book from "./Book";
function BookList({ bookList }) {
    return bookList.map(book =>
        <li key={book.id}>
            <Book book={book} />
        </li>
    );
}

export default BookList;