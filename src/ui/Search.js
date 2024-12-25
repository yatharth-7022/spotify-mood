import BackForwardButton from "../buttons/backForwardButton";
import AudioType from "../Main/AudioType";
import Genres from "../Main/Genres";
import SearchResults from "../Main/SearchResults";
import { useNavContext } from "../state managament/NavContext";
import User from "../user/User";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
function Search() {
  const { query, result, setResult } = useNavContext();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.log("no access token found login again please");
    }
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist,album,track,playlist,show`;
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();

        setResult({
          songs: data.tracks?.items || [],
          artists: data.artists?.items || [],
          albums: data.albums?.items || [],
          playlists: data.playlists?.items || [],
          shows: data.shows?.items || [],
        });
        console.log(data, "hehe");
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  // console.log(query);
  return (
    <>
      <div className="flex flex-col gap-5 px-4 pb-4 pt-6">
        <div className="flex w-full justify-between">
          <BackForwardButton />
          <SearchBar />
          <User />
        </div>
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
