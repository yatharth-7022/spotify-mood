import React, { createContext, useState, useContext } from "react";
import { useEffect } from "react";
const NavContext = createContext();
// const albumIds = [
//   "7D2NdGvBHIavgLhmcwhluK",
//   "6X1x82kppWZmDzlXXK3y3q",
//   "0UMMIkurRUmkruZ3KGBLtG",
//   "0ptlfJfwGTy0Yvrk14JK1I",
//   "690w3h4czL3x3W3zIgEcB6",
//   "4SZko61aMnmgvNhfhgTuD3",
//   "41GuZcammIkupMPKH2OJ6I",
//   "4PWBTB6NYSKQwfo79I3prg",
//   "16PSZwABl4VFJvfDFOPOoB",
//   "1kTlYbs28MXw7hwO0NLYif",
//   "2ODvWsOgouMbaA5xf0RkJe",
// ];
export const NavProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(null);
  const [albumData, setAlbumData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [query, setQuery] = useState("");
  const [isSearchRoute, setIsSearchRoute] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedArtist, setSelectedAritst] = useState(null);
  const [id, setId] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [artistId, setArtistId] = useState("");
  const [showMoreAlbums, setShowMoreAlbums] = useState(false);
  const [selectedArtistAlbums, setSelectedArtistAlbums] = useState("");
  const [selectedArtistSongs, setSelectedArtistSongs] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [result, setResult] = useState({
    songs: [],
    artists: [],
    albums: [],
    playlists: [],
    shows: [],
  });
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const accessToken = localStorage.getItem("access_token");
  //     if (!accessToken) {
  //       // Redirect to login or show login prompt
  //       console.log("No access token found - user needs to login");
  //       // You might want to set some state to show login UI
  //       setIsLoggedIn(false); // Add this state if you haven't
  //       return;
  //     }

  //     try {
  //       const response = await fetch("https://api.spotify.com/v1/me", {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });

  //       if (response.status === 401) {
  //         // Token expired or invalid
  //         localStorage.removeItem("access_token");
  //         // Redirect to login
  //         console.log("Token expired - need to login again");
  //         setIsLoggedIn(false);
  //         return;
  //       }

  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch user data: ${response.status}`);
  //       }

  //       const userData = await response.json();
  //       setUserData(userData);
  //       setIsLoggedIn(true);
  //       console.log(userData, "userData");
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //       setIsLoggedIn(false);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

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
  }, [query, setQuery]);
  // album fetching
  useEffect(() => {
    const albumDisplay = async () => {
      if (!id || id.length === 0) return;
      setIsLoading(true);
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.log("No access token found. Please log in again.");
        return;
      }
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/albums?ids=${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Cannot fetch data");
        }
        const data = await response.json();
        console.log("Fetched album data:", data);
        setSelectedAlbum(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    albumDisplay();
  }, [id]);

  //playlist fetching
  useEffect(() => {
    const playlistDisplay = async () => {
      if (!playlistId || playlistId.length === 0) return;
      setIsLoading(true);
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.log("No access token found. Please log in again.");
        return;
      }
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Cannot fetch data");
        }
        const data = await response.json();
        console.log("Fetched playlist data:", data);
        setSelectedPlaylist(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    playlistDisplay();
  }, [playlistId]);
  //artist fetching

  useEffect(() => {
    const artistDisplay = async () => {
      if (!artistId || artistId.length === 0) return;
      setIsLoading(true);
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.log("No access token found. Please log in again.");
        return;
      }
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Cannot fetch data");
        }
        const artist = await response.json();
        console.log("Fetched artist data:", artist);
        setSelectedAritst(artist);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    artistDisplay();
  }, [artistId]);
  useEffect(() => {
    const artistSongDisplay = async () => {
      if (!artistId || artistId.length === 0) return;
      setIsLoading(true);
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.log("No access token found. Please log in again.");
        return;
      }
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Cannot fetch data");
        }
        const artistSongs = await response.json();
        console.log("Fetched artist sonngs:", artistSongs);
        setSelectedArtistSongs(artistSongs.tracks);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    artistSongDisplay();
  }, [artistId]);
  // console.log(selectedAlbum, "sel");
  useEffect(() => {
    const artistAlbumDisplay = async () => {
      if (!artistId || artistId.length === 0) return;
      setIsLoading(true);
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.log("No access token found. Please log in again.");
        return;
      }
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/albums`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Cannot fetch data");
        }
        const artistAlbums = await response.json();
        console.log("Fetched artist albums:", artistAlbums.items);
        setSelectedArtistAlbums(artistAlbums.items);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    artistAlbumDisplay();
  }, [artistId]);
  const handleIsActive = (id) => {
    setIsActive(id);
  };
  // const handleAlbumSelection = (id) => {
  //   for (let i = 0; i < albumData.albums.length; i++) {
  //     if (albumData.albums[i].id === id) {
  //       setSelectedAlbum(albumData.albums[i]);
  //     }
  //   }
  // };
  const handleAlbumOnSearch = (albumId) => {
    console.log("handleAlbumOnSearch called with ID:", albumId); // Debugging
    setId([albumId]);
  };
  const handlePlayListOnSearch = (playListID) => {
    setPlaylistId([playListID]);
  };
  const handleArtistOnSearch = (artistID) => {
    setArtistId([artistID]);
  };
  const handleShowMoreAlbums = () => {
    // setShowMoreAlbums(true);
  };
  function durationConvertor(duration) {
    let totalSeconds = Math.floor(duration / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  function releaseYear(year) {
    return new Date(year).getFullYear();
  }

  return (
    <NavContext.Provider
      value={{
        isActive,
        handleIsActive,
        selectedAlbum,
        albumData,
        query,
        setQuery,
        result,
        setResult,
        isSearchRoute,
        setIsSearchRoute,
        handleAlbumOnSearch,
        selectedPlaylist,
        handlePlayListOnSearch,
        playlistId,
        setPlaylistId,
        handleArtistOnSearch,
        selectedArtist,
        selectedArtistSongs,
        durationConvertor,
        selectedArtistAlbums,
        showMoreAlbums,
        setShowMoreAlbums,
        handleShowMoreAlbums,
        setRecentSearches,
        recentSearches,
        releaseYear,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
export const useNavContext = () => {
  return useContext(NavContext);
};
