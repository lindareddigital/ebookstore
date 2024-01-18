import 'src/styles/all.css';
import Footer from 'src/pages/components/Footer';
import { Provider } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps }}) {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </>
  );
}


