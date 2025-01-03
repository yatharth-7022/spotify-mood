import React, { createContext, useState, useContext } from "react";
import { useEffect } from "react";
const NavContext = createContext();
export const NavProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(null);
  const [albumData, setAlbumData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [query, setQuery] = useState("");
  const [isSearchRoute, setIsSearchRoute] = useState(true);
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
  const [userSavedAlbums, setUserSavedAlbums] = useState(null);
  const [result, setResult] = useState({
    songs: [],
    artists: [],
    albums: [],
    playlists: [],
    shows: [],
  });
  const isTokenExpired = () => {
    const tokenExpiration = localStorage.getItem("token_expiration");
    const currentTime = Date.now();

    return !tokenExpiration || currentTime >= tokenExpiration;
  };
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    const tokenUrl = "https://accounts.spotify.com/api/token";

    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(
        `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`,
      )}`,
    };

    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error refreshing access token:", errorDetails);
        throw new Error("Failed to refresh access token");
      }

      const data = await response.json();
      console.log("Refreshed Access Token:", data.access_token);

      // Update the  token and expiration time
      const expiresIn = 3600 * 1000; // 1 hour in milliseconds
      const expirationTime = Date.now() + expiresIn;

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_expiration", expirationTime);

      return data.access_token;
    } catch (error) {
      console.error("Error in refreshAccessToken:", error);
      throw error;
    }
  };

  const fetchUserData = async (accessToken) => {
    const userUrl = "https://api.spotify.com/v1/me";

    try {
      console.log("Fetching user data with access token:", accessToken);
      const response = await fetch(userUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error fetching user data:", errorDetails);
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      console.log("User Data:", data);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to handle API calls with token validation
  const fetchWithValidToken = async (apiCall) => {
    let accessToken = localStorage.getItem("access_token");

    if (isTokenExpired()) {
      console.log("Token expired, refreshing...");
      accessToken = await refreshAccessToken();
    }

    return apiCall(accessToken);
  };

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
  useEffect(() => {
    const fetchSavedAlbums = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        setIsLoading(false);
        return;
      }
      const limit = 50;
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/albums?limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch saved albums");
        }
        const data = await response.json();
        console.log(data, "this is user saved albums");
        setUserSavedAlbums(data.items);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSavedAlbums();
  }, []);

  const handleIsActive = (id) => {
    setIsActive(id);
  };

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
        fetchWithValidToken,
        fetchUserData,
        userData,
        userSavedAlbums,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
export const useNavContext = () => {
  return useContext(NavContext);
};
