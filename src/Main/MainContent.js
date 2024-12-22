import React from "react";
import Greeting from "../ui/Greeting";
import AddedPlaylist from "../Main/AddedPlaylist";
import PlayListHeading from "../ui/PlayListHeading";
import Playlist from "../Main/Playlist";
import { useNavContext } from "../state managament/NavContext";
import Search from "../ui/Search";
import Header from "../Main/Header";

function MainContent() {
  const { isActive } = useNavContext();

  return (
    <>
      <Header />
      <div className="flex-1">
        {isActive === 2 ? (
          <Search />
        ) : (
          <>
            <Greeting />
            <AddedPlaylist />
            <PlayListHeading />
            <Playlist />
          </>
        )}
      </div>
    </>
  );
}

export default MainContent;
