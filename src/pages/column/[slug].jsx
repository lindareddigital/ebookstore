import { useEffect, useRef, useState, useMemo } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import useCalc from 'src/pages/components/atoms/useCalc';
import Desc from "../detail/Desc";
import MenuBar from 'src/pages/components/molecules/MenuBar';
import Head from 'next/head';
import GalleryModal from "src/pages/components/GalleryModal";
import Navbar from "src/pages/components/molecules/Navbar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";
import InnerHTML from "src/pages/components/atoms/InnerHTML";

export default function Detail({}) {
  const { mobile } = useCalc();
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(null);

  const router = useRouter();
  const id = router.query.slug;

  console.log("id", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          });

          const data = await response.json();

          const item = data?.data?.posts?.find((item) => {
            return item.id === id;
          });

          setItem(item);
      } catch (error) {
        console.error("", error);
      }
    };

    fetchData();
  }, [router]);

  console.log("column data", item);

  return (
    <div>
      {item != null && (
        <div className="detail-page">
          <Head>
            <title>{item.title}</title>
          </Head>
          <Navbar />
          <MenuBar />
          <div className="container-fluid fdc">
            <Breadcrumb data={item?.category?.name} />

            <div className="detail">
              <div className="content">
                <>
                  <img
                    onClick={() => setShow(true)}
                    src={`https://directus-cms.vicosys.com.hk/assets/${item?.key_image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                    className="primary-img"
                    alt={item?.key_image?.id}
                  />

                  <div className="info">
                    <h1>{item.title}</h1>
                    <InnerHTML text={item.content} className="" />
                  </div>
                </>

                <GalleryModal
                  show={show}
                  item={item}
                  onHide={() => setShow(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

