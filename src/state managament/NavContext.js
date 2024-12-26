import React, { createContext, useState, useContext } from "react";
import { Link } from "react-router";
import { useEffect } from "react";
const NavContext = createContext();
const albumIds = [
  "7D2NdGvBHIavgLhmcwhluK",
  "6X1x82kppWZmDzlXXK3y3q",
  "0UMMIkurRUmkruZ3KGBLtG",
  "0ptlfJfwGTy0Yvrk14JK1I",
  "690w3h4czL3x3W3zIgEcB6",
  "4SZko61aMnmgvNhfhgTuD3",
  "41GuZcammIkupMPKH2OJ6I",
  "4PWBTB6NYSKQwfo79I3prg",
  "16PSZwABl4VFJvfDFOPOoB",
  "1kTlYbs28MXw7hwO0NLYif",
  "2ODvWsOgouMbaA5xf0RkJe",
];
export const NavProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(null);
  const [albumData, setAlbumData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [query, setQuery] = useState("");
  const [isSearchRoute, setIsSearchRoute] = useState(false);
  const [id, setId] = useState("");
  const [result, setResult] = useState({
    songs: [],
    artists: [],
    albums: [],
    playlists: [],
    shows: [],
  });

  useEffect(() => {
    const albumDisplay = async () => {
      if (!id || id.length === 0) return; // Skip if no ID is set
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
  console.log(selectedAlbum, "sel");
  const handleSelectedAlbum = (id) => {
    setSelectedAlbum(id);

    // console.log(selectedAlbum);
  };
  const handleIsActive = (id) => {
    setIsActive(id);
  };
  const handleAlbumSelection = (id) => {
    for (let i = 0; i < albumData.albums.length; i++) {
      if (albumData.albums[i].id === id) {
        setSelectedAlbum(albumData.albums[i]);
      }
    }
  };
  const handleAlbumOnSearch = (albumId) => {
    console.log("handleAlbumOnSearch called with ID:", albumId); // Debugging
    setId([albumId]);
  };

  return (
    <NavContext.Provider
      value={{
        isActive,
        handleIsActive,
        handleSelectedAlbum,
        selectedAlbum,
        albumData,
        handleAlbumSelection,
        query,
        setQuery,
        result,
        setResult,
        isSearchRoute,
        setIsSearchRoute,
        handleAlbumOnSearch,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
export const useNavContext = () => {
  return useContext(NavContext);
};
