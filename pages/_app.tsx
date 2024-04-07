import Sidebar from '@/components/Sidebar';
import Trending from '@/components/Trending';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Page from './login';
import CommentModal from '@/components/CommentModal';
import { useEffect, useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);


  return (
    <>
      {isLoading ?
        <div className="h-screen w-screen flex justify-center items-center">
          <img src="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952md6qz6bxd32ano1pl4kz3f7k18udtl1zjyyscqbf&ep=v1_gifs_search&rid=200w.gif&ct=g" alt="Loading..." />
        </div>
        :
        <>
          {
            isLoggedIn ? (
              <div className='min-h-screen max-w-[1400px] mx-auto flex'>
                <Sidebar />
                <Component {...pageProps} />
                <CommentModal />
                <Trending />
              </div >
            ) : (
              <Page />
            )
          }
        </>
      }
    </>
  );
}