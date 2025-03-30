import { Provider } from 'react-redux';
import { store } from '../store/index';
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import "../styles/global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
