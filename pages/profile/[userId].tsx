import Post from "@/components/Post";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useRouter } from "next/router";

interface UserData {
  userUID: string;
  userName: string;
  userID: string;
  userPosts: any[];
  userFollowers: any[];
  userFollowing: any[];
}

export default function ProfilePage() {
  const router = useRouter();
  const { userId } = router.query;
  const [displayUserData, setDisplayUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [displayUserPosts, setDisplayUserPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const q = collection(db, "users");
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const userData = doc.data() as UserData;
            if (userData.userID === userId) {
              setDisplayUserData(userData);
            }
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  console.log(displayUserData)

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (displayUserData) {
        try {
          const postDocs = displayUserData.userPosts.map((postId: string) => doc(db, "posts", postId));
          const postSnapshots = await Promise.all(postDocs.map(getDoc));
          const userPosts = postSnapshots.map((snapshot: any) => ({ id: snapshot.id, ...snapshot.data() }));
          setDisplayUserPosts(userPosts);
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      }
    };

    fetchUserPosts();
  }, [displayUserData]);

  return (
    <div className="w-[100%] md:w-[60%] md:border-r md:border-twitter-extra-light-gray overflow-y-scroll h-screen no-scrollbar pb-20 md:pb-0">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="px-3 py-1 border-b border-twitter-extra-light-gray sticky top-0 z-50 bg-twitter-white flex items-center">
            <Link href="/" className="p-3 px-4 hover:bg-twitter-black hover:bg-opacity-20 rounded-full">
              <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
            </Link>
            <div className="ml-2">
              <div className="font-bold text-lg">{displayUserData?.userName}</div>
              <div className="text-twitter-dark-gray text-sm">{displayUserData?.userPosts?.length || 0} posts</div>
            </div>
          </div>
          <img src="/assets/profile_banner.jpg" alt="" className="max-h-[250px] w-full object-cover aspect-video" />
          <div className="px-6 mt-4">
            <div className="font-bold text-xl">{displayUserData?.userName}</div>
            <div className="font-regular text-md opacity-70">@{displayUserData?.userID}</div>
          </div>
          <div className="flex text-sm mx-6 my-4 space-x-2">
            <div>{displayUserData?.userFollowers?.length || 0} followers</div>
            <div>{displayUserData?.userFollowing?.length || 0} following</div>
          </div>
          <div className="text-xl font-semibold text-center border-b border-twitter-extra-light-gray pb-2 relative after:content-'' after:w-[25%] after:absolute after:bg-twitter-color after:rounded-full after:h-[2px] after:bottom-0 after:left-[50%] after:translate-x-[-50%]">
            Posts
          </div>
          {displayUserPosts.map((post, index) => (
            <div key={index}>
              <Post key={post.id} post={post} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
