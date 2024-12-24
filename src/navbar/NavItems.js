import { useContext } from "react";
import { useNavigate } from "react-router";
import { useNavContext } from "../state managament/NavContext";
import Search from "../ui/Search";
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
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full justify-center lg:flex lg:justify-start">
        <img
          className="absolute top-2 block h-20 w-20 object-contain hover:cursor-pointer lg:hidden"
          src="/assets/small-logo.png"
          alt="Spotify logo"
        />
        <img
          className="absolute left-4 top-4 hidden h-[3rem] w-[8rem] object-contain hover:cursor-pointer lg:block"
          src="/assets/Spotify-logo.png"
          alt="Spotify logo"
        />
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
              <span className="hidden lg:block">{navItem.label}</span>
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
              <span className="hidden lg:block">{navItem.label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 px-2">
        <span className="hidden hover:cursor-pointer lg:block">
          {" "}
          Daily Mix 1
        </span>
        <span className="hidden hover:cursor-pointer lg:block"> Malyalam</span>
        <span className="hidden hover:cursor-pointer lg:block">
          {" "}
          Dance/Electronic Mix
        </span>
        <span className="hidden hover:cursor-pointer lg:block">
          {" "}
          EDM/Popular
        </span>
        <span className="hidden hover:cursor-pointer lg:block"> </span>
      </div>
    </>
  );
}

export default NavItems;
