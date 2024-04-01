import Post from "@/components/Post";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function page() {
  const user = useSelector((state: any) => state.user);
  return (
    <div className="w-[100%] md:w-[60%] md:border-r md:border-twitter-extra-light-gray overflow-y-scroll h-screen no-scrollbar pb-20 md:pb-0">
      <div className="px-3 py-1 border-b border-twitter-extra-light-gray sticky top-0 z-50 bg-twitter-white flex items-center">
        <Link
          href="/"
          className="p-3 px-4 hover:bg-twitter-black hover:bg-opacity-20 rounded-full"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
        </Link>
        <div className="ml-2">
          <div className="font-bold text-lg">{user.userName}</div>
          <div className="text-twitter-dark-gray text-sm"> {user.userPosts?.length} posts</div>
        </div>
      </div>
      <img
        src="/assets/profile_banner.jpg"
        alt=""
        className="max-h-[250px] w-full object-cover aspect-video"
      />
      <div className="flex justify-between items-center px-6">
        <img
          src="/assets/demo_profile-picture.jpg"
          alt=""
          className="rounded-full w-[20%] min-w-[140px] mt-[-15%] md:mt-[-10%] border-[4px] border-twitter-white"
        />
        <button className="border border-twitter-dark-gray px-6 py-2 rounded-full hover:bg-twitter-black hover:bg-opacity-30 font-semibold cursor-not-allowed">
          Edit profile
        </button>
      </div>
      <div className="px-6 mt-4">
        <div className="font-bold text-xl">{user.userName}</div>
        <div className="font-regular text-md opacity-70">@{user.userID}</div>
      </div>
      <div className="flex text-sm mx-6 my-4 space-x-2">
        <div>{user.userFollowers?.length} followers</div>
        <div>{user.userFollowing?.length} following</div>
      </div>
      <div
        className="text-xl font-semibold text-center border-b border-twitter-extra-light-gray pb-2 relative 
          after:content-'' after:w-[25%] after:absolute after:bg-twitter-color after:rounded-full after:h-[2px] after:bottom-0 after:left-[50%] after:translate-x-[-50%]">
        Posts
      </div>
      {
        new Array(6).fill(0).map((_, index) => {
          return (
            <Post key={index} />
          )
        })
      }
    </div>
  );
}
