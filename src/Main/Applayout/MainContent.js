import React from "react";
import Greeting from "../../ui/Greeting";
import AddedPlaylist from "../Playlists/AddedPlaylist";
import PlayListHeading from "../playlist/PlayListHeading";
import Playlist from "../Playlists/Playlist";
import { useNavContext } from "../../state managament/NavContext";

import SearchResults from "../Search/SearchResults";

function MainContent() {
  const { query } = useNavContext();

  return (
    <div className="px-6 py-2">
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
