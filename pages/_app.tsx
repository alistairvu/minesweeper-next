import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default MyApp;
