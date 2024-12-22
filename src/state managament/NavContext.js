import React, { createContext, useState, useContext } from "react";
import { Link } from "react-router";
const NavContext = createContext();
export const NavProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const handleSelectedAlbum = (id) => {
    setSelectedAlbum(id);

    // console.log(selectedAlbum);
  };
  const handleIsActive = (id) => {
    setIsActive(id);
  };
  return (
    <NavContext.Provider
      value={{ isActive, handleIsActive, handleSelectedAlbum, selectedAlbum }}
    >
      {children}
    </NavContext.Provider>
  );
};
export const useNavContext = () => {
  return useContext(NavContext);
};
