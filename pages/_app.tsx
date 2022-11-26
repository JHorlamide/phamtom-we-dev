import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import mergeStore from '../redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MoonLoader } from 'react-spinners';

const { store, persistor } = mergeStore();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className='flex items-center justify-center h-100vh'>
            <MoonLoader color='#0055d2' />
          </div>
        }
        persistor={persistor}
      >
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
