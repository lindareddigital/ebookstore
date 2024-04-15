import 'src/styles/all.css';
import Footer from 'src/pages/components/Footer';

export default function App({ Component, pageProps: { ...pageProps }}) {

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..700&display=swap"
        rel="stylesheet"
      ></link>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}


