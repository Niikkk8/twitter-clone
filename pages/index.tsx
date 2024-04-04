import { Inter } from '@next/font/google';
import TweetBox from "../components/TweetBox";
import Post from "../components/Post";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/firebase';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const user = useSelector((state: any) => state.user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const finalQuery = query(collection(db, "posts"), where("postUserUID", "in", [user.userUID, ...user.userFollowing]), orderBy("postTimeStamp", "desc"));

      try {
        const querySnapshot = await getDocs(finalQuery);
        const postsData: any = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [user]);

  return (
    <div className='w-[100%] md:w-[60%] md:border-r md:border-twitter-extra-light-gray overflow-y-scroll h-screen no-scrollbar pb-20 md:pb-0'>
      <div className='px-3 py-3 text-lg  sm:text-l font-bold border-b border-twitter-extra-light-gray sticky top-0 z-50 bg-twitter-white'>HOME</div>
      <TweetBox />
      {posts.map((post: any, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
}
