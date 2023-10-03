import "../css/App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import MainPage from "./MainPage";
import useBooksContext from "../hooks/use-books-context";

function App() {
  const { getBooks } = useBooksContext();

  // load the books on shelf once when the component is mounted
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getBooks();
    }

    return () => {
      mounted = false;
    };
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
      </Routes>
    </div>
  );
}

export default App;
