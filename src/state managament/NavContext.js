import React, { createContext, useState, useContext } from "react";
const NavContext = createContext();
export const NavProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(null);
  const handleIsActive = (id) => {
    setIsActive(id);
  };
  return (
    <NavContext.Provider value={{ isActive, handleIsActive }}>
      {children}
    </NavContext.Provider>
  );
};
export const useNavContext = () => {
  return useContext(NavContext);
};
