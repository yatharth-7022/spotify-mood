import { useNavigate } from "react-router";
import { useNavContext } from "../state managament/NavContext";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { BiLibrary } from "react-icons/bi";
const navItems1 = [
  {
    id: 1,
    label: "Home",
    logo: "/assets/Group-3.png",
  },
  { id: 2, label: "Search", logo: "/assets/fi-rs-search.png" },
  { id: 3, label: "Your Library", logo: "/assets/library.png" },
];
const navItems2 = [
  {
    id: 4,
    label: "Create Playlist",
    logo: "/assets/add.png",
  },
  { id: 5, label: "Liked Songs", logo: "/assets/smallheart.png" },
  { id: 6, label: "Your episodes", logo: "/assets/episodes.png" },
];
function NavItems() {
  const { isActive, handleIsActive } = useNavContext();
  const { isSearchRoute, setIsSearchRoute } = useNavContext();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/search") {
      setIsSearchRoute(true);
    } else {
      setIsSearchRoute(false);
    }
  }, [location.pathname]);
  return (
    <div className="flex flex-col gap-3">
      <div
        onClick={() => setIsSearchRoute((prev) => !prev)}
        className="justify-left flex w-full px-3 text-white"
      >
        <BiLibrary className="h-[2rem] w-auto" />
        {isSearchRoute || (
          <span className="rounded-md py-2 font-semibold text-white hover:cursor-pointer lg:justify-start lg:px-3 lg:py-2 lg:text-[1rem]">
            Your Library
          </span>
        )}
      </div>
      <div className="items-centre flex flex-col gap-2 lg:gap-2">
        {navItems1.map((navItem) => (
          <div
            className={`${
              isActive === navItem.id
                ? "bg-[#282828] transition-all duration-300 ease-in-out"
                : "transition-all duration-300 ease-in-out hover:bg-[#282828]"
            } flex flex-row justify-center rounded-md py-2 font-semibold hover:cursor-pointer lg:justify-start lg:px-3 lg:py-2 lg:text-[1rem]`}
            key={navItem.id}
            onClick={() => {
              handleIsActive(navItem.id);
              if (navItem.id === 2) {
                navigate("/search");
              } else if (navItem.id === 1) {
                navigate("/callback");
              }
            }}
          >
            <div className="flex w-fit flex-row items-center gap-4">
              <img src={navItem.logo} alt="label logo" />
              <span
                className={`hidden lg:block ${isSearchRoute ? "lg:hidden" : ""}`}
              >
                {navItem.label}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="items-centre flex flex-col gap-2 px-2 lg:gap-2 lg:px-0">
        {navItems2.map((navItem) => (
          <div
            className={`${
              isActive === navItem.id
                ? "bg-[#282828] transition-all duration-300 ease-in-out"
                : "transition-all duration-300 ease-in-out hover:bg-[#282828]"
            } flex flex-row justify-center rounded-md py-2 font-semibold hover:cursor-pointer lg:justify-start lg:px-2 lg:py-2 lg:text-[1rem]`}
            key={navItem.id}
            onClick={() => handleIsActive(navItem.id)}
          >
            <div className="flex w-fit flex-row items-center gap-4">
              <img src={navItem.logo} alt="label logo" />
              <span
                className={`hidden lg:block ${isSearchRoute ? "lg:hidden" : ""}`}
              >
                {navItem.label}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 px-2">
        <span
          className={`hidden hover:cursor-pointer lg:block ${isSearchRoute ? "lg:hidden" : ""}`}
        >
          {" "}
          Daily Mix 1
        </span>
        <span
          className={`hidden hover:cursor-pointer lg:block ${isSearchRoute ? "lg:hidden" : ""}`}
        >
          {" "}
          Malyalam
        </span>
        <span
          className={`hidden hover:cursor-pointer lg:block ${isSearchRoute ? "lg:hidden" : ""}`}
        >
          {" "}
          Dance/Electronic Mix
        </span>
        <span
          className={`hidden hover:cursor-pointer lg:block ${isSearchRoute ? "lg:hidden" : ""}`}
        >
          {" "}
          EDM/Popular
        </span>
        <span
          className={`hidden hover:cursor-pointer lg:block ${isSearchRoute ? "lg:hidden" : ""}`}
        >
          {" "}
        </span>
      </div>
    </div>
  );
}

export default NavItems;
