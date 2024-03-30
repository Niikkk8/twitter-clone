import Sidebar from '@/components/Sidebar'
import Trending from '@/components/Trending'
import { useRouter } from 'next/router';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from '@/redux/store'

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
  const isLoggedIn: boolean = useSelector((state: any) => state.user.userUID) ? true : false;
  const username = useSelector((state: any) => state.user.userID)
  console.log(username)
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn && router.pathname === '/login') {
      router.push('/');
    }

    if (!isLoggedIn && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  const showSidebarAndTrending = isLoggedIn && router.pathname !== '/login';

  return (
    <div className='min-h-screen max-w-[1400px] mx-auto flex'>
      {showSidebarAndTrending && <Sidebar />}
      <Component {...pageProps} />
      {showSidebarAndTrending && <Trending />}
    </div>
  )
}