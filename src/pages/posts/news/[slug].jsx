import { useEffect, useRef, useState, useMemo } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import MenuBar from 'src/components/molecules/MenuBar';
import Head from 'next/head';
import GalleryModal from "src/components/GalleryModal";
import Navbar from "src/components/molecules/Navbar";
import Breadcrumb from "src/components/molecules/Breadcrumb";
import InnerHTML from "src/components/atoms/InnerHTML";
import Error from "next/error";

export default function Detail({}) {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const id = router.query.slug;


  // console.log("posts id", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        const result = await res.json();  
            
        const item = result.data.posts[0];
        setItem(item);
        setIsLoading(false);
      } catch (error) {
        console.error(error);

      }
    };

    fetchData();
  }, [id]);

  // console.log("post data", item);


  if (item)
    return (
      <div>
        {item != null && (
          <div className="detail-page column-page">
            <Head>
              <title>{item?.title}</title>
            </Head>
            <Navbar />
            <MenuBar />
            <div className="container-fluid fdc">
              <Breadcrumb data={item?.category?.name} />

              <div className="detail">
                <div className="article-title">
                  <h1>{item?.title}</h1>
                </div>
                <div className="content">
                  <>
                    <img
                      onClick={() => setShow(true)}
                      src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${item?.key_image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                      className="primary-img"
                      alt={item?.key_image?.id}
                    />

                    <div className="info">
                      <h1>{item?.title}</h1>
                      <InnerHTML text={item?.content} className="" />
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

    if (!item) {
      return <Error statusCode={404} />;
    }
}

