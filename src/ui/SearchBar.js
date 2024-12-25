import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useNavContext } from "../state managament/NavContext";
function SearchBar() {
  const { query, setQuery } = useNavContext();
  return (
    <div className="flex h-full w-[30%] items-center md:w-[40%]">
      <div className="gap -2 flex h-10 w-full flex-row items-center rounded-3xl bg-white px-3">
        <CiSearch className="h-full w-6 text-black" />
        <input
          type="text"
          className="h-full w-full rounded-none pl-2 font-semibold"
          placeholder="Artist, songs, or podcasts"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
