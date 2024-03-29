import Sidebar from '@/components/Sidebar'
import Trending from '@/components/Trending'
import { useRouter } from 'next/router';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store'

export default function App({ Component, pageProps }: AppProps) {
  const isLoggedIn: boolean = false;
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [isLoggedIn, router]);
  const showSidebarAndTrending = isLoggedIn && router.pathname !== '/login';
  return (
    <Provider store={store}>
      <div className='min-h-screen max-w-[1400px] mx-auto flex'>
        {showSidebarAndTrending && <Sidebar />}
        <Component {...pageProps} />
        {showSidebarAndTrending && <Trending />}
      </div>
    </Provider>
  );
}