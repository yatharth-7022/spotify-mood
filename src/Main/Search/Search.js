import BackForwardButton from "../../buttons/backForwardButton";
import AudioType from "../Tracks/AudioType";
import Genres from "../albums/Genres";
import SearchResults from "./SearchResults";
import { useNavContext } from "../../state managament/NavContext";
import User from "../../user/User";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
function Search() {
  const { query } = useNavContext();
  return (
    <>
      <div className="flex flex-col gap-5 px-4 pb-4 pt-6">
        {query.length > 1 ? (
          <SearchResults />
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <div className="mt-4 w-full text-2xl">
                <h1 className="font-bold text-white">Your top genres</h1>
              </div>
              <Genres />
            </div>
            <div className="mt-4 w-full text-2xl">
              <h1 className="font-bold text-white">Browse all</h1>
            </div>
            <AudioType />
          </>
        )}
      </div>
    </>
  );
}

export default Search;
