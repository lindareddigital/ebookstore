import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import InnerHTML from "src/pages/components/atoms/InnerHTML";

export default function General() {
    const router = useRouter();
    const slug = router.query.slug?.[0];

    console.log(slug);
    

    const [item, setItem] = useState(null);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/page/${slug}`);

          const result = await response.json();
          // if (router.query.slug) {
            setItem(result?.result?.pages?.[0]);
          // }
          console.log("ddata", item, result?.result?.pages?.[0]);
        } catch (error) {
          console.error("获取数据时出错：", error);
        }
      };

      fetchData();
    }, [router]);


  return (
    <div className="contactus-page">
      <Head>
        <title>{item?.title}</title>
      </Head>
      <Navbar />
      <MenuBar />
      <div className="detail-page column-page">
        <div className="container-fluid fdc">
          <div className="detail">
            <InnerHTML text={item?.blocks[0]?.item?.content} className="" />
          </div>
        </div>
      </div>
    </div>
  );
}



