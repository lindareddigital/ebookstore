import GridList from "src/pages/polis-press/GridList.jsx";
import { useEffect, useState} from "react";

export default function Collection() {

  const [books, setBooks] = useState(null);
  const [length, setLength] = useState(0);

  useEffect(() => {

    const filterByPublisher = async () => {
      const response = await fetch(`api/product/publisher/polis-press`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sort: ["-date_created"],
          page: 1,
          publisher: "polis-press",
          limit: 15,
        }),
      });
      const books = await response.json();
      const length = books?.result?.product_aggregated?.[0].countDistinct?.id;
      console.log("146books", books?.result?.product);

      setLength(length);
      setBooks(books?.result?.product);
    };
    

    filterByPublisher();

  }, []);

  

  return (
    <>
      <GridList books={books} />
    </>
  );
}
