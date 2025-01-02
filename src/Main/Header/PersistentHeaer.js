// components/PersistentHeader.js
import React from "react";
import BackForwardButton from "../../buttons/backForwardButton";
import SearchBar from "../Search/SearchBar";
import User from "../../user/User";
import { FaSpotify } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
import { useNavigate } from "react-router";
import { useNavContext } from "../../state managament/NavContext";
const PersistentHeader = () => {
  const navigate = useNavigate();
  const { query, setQuery } = useNavContext();
  // Header component
  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between bg-black px-6 py-2">
      <div
        onClick={() => {
          navigate(`/callback`);
          setQuery("");
        }}
        className="cursor-pointer text-white"
      >
        <FaSpotify className="h-[2rem] w-[2rem]" />
      </div>
      <div className="flex flex-1 items-center justify-center gap-3">
        <div
          onClick={() => {
            navigate(`/callback`);
            setQuery("");
          }}
          className="cursor-pointer rounded-full bg-[#222222] p-2 hover:scale-105"
        >
          <MdHomeFilled className="h-[2rem] w-[2rem] shrink-0 text-white" />
        </div>
        <div className="w-[40%] md:w-[40%]">
          <SearchBar className="w-full" />
        </div>
      </div>
      <User />
    </div>
  );
};

export default PersistentHeader;
