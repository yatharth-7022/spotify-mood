import React from "react";
import Greeting from "../ui/Greeting";
import AddedPlaylist from "../Main/AddedPlaylist";
import PlayListHeading from "../ui/PlayListHeading";
import Playlist from "../Main/Playlist";
import { useNavContext } from "../state managament/NavContext";
import Search from "./Search/Search";
import Header from "../Main/Header";
import SearchResults from "./Search/SearchResults";

function MainContent() {
  const { isActive, query } = useNavContext();

  return (
    <div className="px-6 py-5">
      <div className="flex-1">
        {query.length > 0 && <SearchResults />}
        <div>
          <Greeting />
          <AddedPlaylist />
          <PlayListHeading />
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default MainContent;
