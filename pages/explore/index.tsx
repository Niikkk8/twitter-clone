import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import Link from "next/link";

export default function Page() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);
      const userData: any[] = [];
      querySnapshot.forEach((doc) => {
        userData.push(doc.data());
      });
      setUsers(userData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchUsers();
    }, 1500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const searchUsers = async () => {
    const filtered = users.filter((user) =>
      (user.userID.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.userName.toLowerCase().includes(searchInput.toLowerCase())) && searchInput
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="w-[100%] md:w-[60%] md:border-r md:border-twitter-extra-light-gray overflow-y-scroll h-screen no-scrollbar pb-20 md:pb-0">
      <div className="px-3 py-3 text-lg  sm:text-l font-bold border-b border-twitter-extra-light-gray sticky top-0 z-50 bg-twitter-white">
        EXPLORE
      </div>
      <div className="p-4 border-b border-twitter-extra-light-gray">
        <div className="bg-twitter-extra-light-gray bg-opacity-60 flex justify-between items-center  rounded-full px-2">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search..."
            value={searchInput}
            onChange={(event) =>
              setSearchInput(
                event.target.value.toLowerCase().replace(/\s/g, "")
              )
            }
            className="bg-transparent w-[80%] p-2 pl-4 text-md border-none outline-none"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="text-twitter-dark-gray p-4 text-xl"
          />
        </div>
      </div>
      <>
        {
          filteredUsers.map(user =>
            <Link href={`/profile/${user.userID}`} key={user.userID}>
              <div className="bg-twitter-extra-light-gray bg-opacity-50 flex items-center px-4 py-3 m-2 rounded-full">
                <img src="/assets/demo_profile-picture.jpg" alt="" className="w-[72px] rounded-full mr-4" />
                <div className="">
                  <h4 className="font-semibold">{user.userName}</h4>
                  <span className="opacity-70 text-sm">@{user.userID}</span>
                </div>
              </div>
            </Link>
          )
        }
      </>
    </div>
  );
}