import { Inter } from '@next/font/google'
import TweetBox from "../components/TweetBox"
import Post from "../components/Post"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='w-[100%] md:w-[60%] md:border-r md:border-twitter-extra-light-gray overflow-y-scroll h-screen no-scrollbar'>
      <div className='px-3 py-3 text-lg  sm:text-l font-bold border-b border-twitter-extra-light-gray sticky top-0 z-50 bg-twitter-white'>HOME</div>
      <TweetBox />
      {
        new Array(16).fill(0).map((_, index) => {
          return (
            <Post key={index} />
          )
        })
      }
    </div>
  )
}
