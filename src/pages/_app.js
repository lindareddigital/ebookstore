import 'src/styles/all.css';
import Footer from 'src/pages/components/Footer';


export default function App({ Component, pageProps }) {
  return (
  <>
  <Component {...pageProps} />
  <Footer/>

  </>
  )
}


