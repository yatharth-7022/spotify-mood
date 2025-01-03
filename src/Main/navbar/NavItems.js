import { useNavigate } from "react-router";
import { useNavContext } from "../../state managament/NavContext";
import { BiLibrary } from "react-icons/bi";
const navItems1 = [
  {
    id: 1,
    label: "Home",
    logo: "/assets/Group-3.png",
  },
  { id: 2, label: "Search", logo: "/assets/fi-rs-search.png" },
];

function NavItems() {
  const { isActive, handleIsActive, setQuery, userSavedAlbums } =
    useNavContext();
  const { isSearchRoute, setIsSearchRoute } = useNavContext();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      <div
        onClick={() => setIsSearchRoute((prev) => !prev)}
        className="justify-left flex w-full pl-2 text-white"
      >
        <button title="Expand your library">
          <BiLibrary className="h-[2rem] w-auto" />
        </button>

        {isSearchRoute || (
          <span className="rounded-md py-2 font-semibold text-white hover:cursor-pointer lg:justify-start lg:px-3 lg:py-2 lg:text-[1rem]">
            Your Library
          </span>
        )}
      </div>
      <div className="items-centre flex flex-col gap-2">
        {navItems1.map((navItem) => (
          <div
            className={`${
              isActive === navItem.id
                ? "bg-[#282828] transition-all duration-300 ease-in-out"
                : "transition-all duration-300 ease-in-out hover:bg-[#282828]"
            } flex flex-row justify-center rounded-md font-semibold hover:cursor-pointer lg:justify-start lg:text-[1rem]`}
            key={navItem.id}
            onClick={() => {
              handleIsActive(navItem.id);
              if (navItem.id === 2) {
                navigate("/search");
              } else if (navItem.id === 1) {
                navigate("/callback");
                setQuery("");
              }
            }}
          >
            <div className="flex w-fit flex-row items-center gap-4">
              <img src={navItem.logo} alt="label logo" />
              {isSearchRoute || <span>{navItem.label}</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="items-centre flex flex-col gap-2 px-2 lg:gap-2 lg:px-0">
        {userSavedAlbums.map((savedAlbums) => (
          <div>
            <div
              className={`mx-[6px] flex gap-1 rounded-md hover:cursor-pointer ${isSearchRoute || "hover:bg-[#282828]"}`}
            >
              <div className="h-13 w-13 rounded-md px-2 py-2 hover:bg-[#282828]">
                <img
                  className="max-h-[52px] max-w-[52px] rounded-md object-contain"
                  src={savedAlbums?.album?.images[2]?.url}
                  alt="album cover"
                />
              </div>
              <div
                className={`${isSearchRoute ? "hidden" : ""} flex flex-col justify-center`}
              >
                <span className="text-md text-white">
                  {savedAlbums?.album?.name}
                </span>
                <div className="flex gap-1 text-sm text-[#a0a0a0]">
                  <span>
                    {savedAlbums?.album?.type.slice(0, 1).toUpperCase() +
                      savedAlbums?.album?.type.slice(1)}{" "}
                    &bull;{" "}
                  </span>
                  <span>{savedAlbums?.album?.artists[0]?.name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NavItems;
