import GridList from "src/pages/components/GridList";
import { useEffect, useState} from "react";

export default function Collection() {

  const [books, setBooks] = useState(null);
  const [length, setLength] = useState(0);



  useEffect(() => {

    const id = localStorage.getItem("id");

    const getUserBookMark = async () => {
      const response = await fetch(`/api/bookmark/getUserBookMark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const books = await response.json();
      // const length = books?.result?.product_aggregated?.[0].countDistinct?.id;
      console.log("146books", books);

      // setLength(length);
      // setBooks(books?.result?.product);
    };
    

    getUserBookMark();

  }, []);

  

  return (
    <>
      <GridList books={books} />
    </>
  );
}
