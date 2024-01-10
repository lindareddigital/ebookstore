import '@/styles/all.css';
import Footer from '@/pages/components/Footer';


export default function App({ Component, pageProps }) {
  return (
  <>
  <Component {...pageProps} />
  <Footer/>

  </>
  )
}


