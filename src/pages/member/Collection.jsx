import GridList from "src/pages/components/GridList";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

export default function Collection() {
  const router = useRouter();
  const isFirstRendering = useRef(true);

  const [books, setBooks] = useState(null);
  const [length, setLength] = useState(0);
  const [arr, setArr] = useState([]);
  const [bookMark, setBookMark] = useState(null);




  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    // if (isFirstRendering.current) {
    //   isFirstRendering.current = false;
    //   return;
    // }

    const getUserBookMark = async () => {
      const response = await fetch(`/api/bookmark/getUserBookMark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          token: token,
        }),
      });
      const books = await response.json();
      console.log("user_bookmark", books?.result?.user_bookmark);
      console.log(token);
      setBookMark(books?.result?.user_bookmark);

      const productIds = books?.result?.user_bookmark?.map(
        (item) => item.product.id
      );

      setArr(productIds);

      console.log("arr", arr);
    };

    getUserBookMark();

    const filterByPublisher = async () => {
      console.log("all book");

      const response = await fetch(`/api/product/publisher/polis-press`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publisher: "polis-press",
        }),
      });

      const books = await response.json();
      console.log(books?.result?.product, "all books");

      const filteredData = books?.result?.product?.filter((item) =>{        
        return arr?.includes(item.id);
      });

      console.log(filteredData, "filteredData");

      setBooks(filteredData);
    };

    filterByPublisher();
  }, []);

  

  return (
    <>
      <GridList
        isFirstRendering
        books={books}
        bookMark={bookMark}
        arr={arr}
      />
    </>
  );
}
