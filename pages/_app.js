import '../styles/globals.css';

import { defineCustomElements, applyPolyfills } from 'red-ui/loader';
applyPolyfills().then(defineCustomElements);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
