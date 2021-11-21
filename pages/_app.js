import '../styles/global.scss'
import '../styles/form.scss'

export default function App({ Component, pageProps }) {
  // React.useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }
  // }, []);

  return <Component {...pageProps} />
}