import Sidebar from '@/components/Sidebar';
import Trending from '@/components/Trending';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Page from './login';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <WrapperComponent Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

interface WrapperComponentProps {
  Component: React.ElementType;
  pageProps: any;
}

function WrapperComponent({ Component, pageProps }: WrapperComponentProps) {
  const isLoggedIn = useSelector((state: any) => state.user.userUID);

  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      {isLoggedIn ? (
        <div className='min-h-screen max-w-[1400px] mx-auto flex'>
          <Sidebar />
          <Component {...pageProps} />
          <Trending />
        </div>
      ) : (
        <Page />
      )}
    </>
  );
}