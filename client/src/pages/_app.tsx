import '../styles/globals.css';
import { Provider } from 'urql';
import { client } from '../urqlClient';
import { Provider as ReduxProvider } from 'react-redux';
import { ChakraProvider, layout } from '@chakra-ui/react';
import { store } from '../redux/store';
import customTheme from '../styles/extendTheme';
import type { AppProps } from 'next/app';
import Layout from '../components/Navibar/Layout';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ReduxProvider store={store}>
      <Provider value={client}>
        <ChakraProvider theme={customTheme}>
          <Component {...pageProps} />
          <Layout />
        </ChakraProvider>
      </Provider>
    </ReduxProvider>
  );
}

export default MyApp;
