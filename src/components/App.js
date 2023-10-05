import "../css/App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import MainPage from "./MainPage";
import useBooksContext from "../hooks/use-books-context";
import PageNotFound from "./PageNotFound";

function App() {
  const { getBooks } = useBooksContext();

  // load the books on shelf once when the component is mounted
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <MainPage />
          }
        />
        <Route
          exact
          path="/search"
          element={
            <SearchPage />
          }
        />
        <Route
          path="*"
          element={
            <PageNotFound />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
