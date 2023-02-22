import { ChangeEvent, useCallback, useRef, useState } from "react";
import Card from "./Card";
import Error from "./Error";
import Loading from "./Loading";
import useBookSearch from "./useBookSearch";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { books, hasMore, loading, error } = useBookSearch(query, pageNumber);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookRef: React.RefCallback<HTMLDivElement> = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
      console.log(node, "node being observed");
    },
    [loading, hasMore]
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <main>
      <input
        onChange={handleSearch}
        type="text"
        className="rounded mb-7 py-2 px-5 border-none bg-slate-100 focus:(ring ring-sky-400 outline-none)"
      />
      {books.map((book, index) => {
        if (books.length !== index + 1) {
          return <Card key={book}>{book}</Card>;
        }

        return (
          <Card ref={lastBookRef} key={book}>
            {book}
          </Card>
        );
      })}
      {loading && <Loading />}
      {error && <Error />}
    </main>
  );
}

export default App;
