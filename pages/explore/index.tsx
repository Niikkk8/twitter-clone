import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [searchInput, setSearchInput] = useState<string>("");
  useEffect(() => {
    console.log(searchInput);
  }, [searchInput]);
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
                event.target.value.toLowerCase().replace(/\s/g, '')
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
    </div>
  );
}