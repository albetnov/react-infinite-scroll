import { useEffect, useState } from "react";
import axios, { Canceler } from "axios";

export default function useBookSearch(query: string, pageNumber: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState<string[]>([]);
  console.log(books);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    let cancel: Canceler;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios({
          method: "GET",
          url: "http://openlibrary.org/search.json",
          params: { q: query, page: pageNumber },
          cancelToken: new axios.CancelToken((c) => {
            cancel = c;
          }),
        });
        setBooks((prevBook) => [
          ...new Set([...prevBook, ...res.data.docs.map((b: any) => b.title)]),
        ]);
        setHasMore(res.data.docs.length > 0);
        console.log(res.data);
      } catch (e) {
        if (axios.isCancel(e)) return;
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => cancel();
  }, [query, pageNumber]);

  return {
    loading,
    error,
    books,
    hasMore,
  };
}
