import GridList from "src/pages/components/GridList";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

export default function Collection() {
  const router = useRouter();

  const [books, setBooks] = useState(null);
  const [length, setLength] = useState(0);


  return (
    <>
      <GridList books={books}/>
    </>
  );
}
