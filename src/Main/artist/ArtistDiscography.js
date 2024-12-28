import { useEffect, useState } from "react";
import { useNavContext } from "../../state managament/NavContext";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
function ArtistDiscography() {
  const [activeId, setActiveId] = useState(null);
  const {
    selectedArtistAlbums = [],
    selectedArtist,
    handleAlbumOnSearch,
    setIsSearchRoute,
    showMoreAlbums,
    handleShowMoreAlbums,
  } = useNavContext();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("/artist/")) {
      setIsSearchRoute(true);
    } else {
      setIsSearchRoute(false);
    }
  }, [location.pathname]);

  const handleSortButtonClick = (id) => {
    setActiveId(id);
  };

  const buttons = [
    { id: "1", label: "Popular Releases" },
    { id: "2", label: "Albums" },
    { id: "3", label: "Singles and EPs" },
  ];
  function dateToYearConvertor(releaseDate) {
    const year = new Date(releaseDate).getFullYear();
    return year;
  }
  const navigate = useNavigate();
  const navigateShowMoreAlbums = useNavigate();

  return (
    <div className="mt-3 flex flex-col gap-3 px-7">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-white">Discography</h1>
        <span
          onClick={() => {
            navigateShowMoreAlbums(`/artist/album/${selectedArtist?.id}`);
          }}
          className="cursor-pointer text-sm font-bold text-[#a0a0a0] hover:underline"
        >
          Show All
        </span>
      </div>
      <div className="mt-3 flex gap-3 text-sm font-medium text-white">
        {buttons.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleSortButtonClick(id)}
            className={`h-[2rem] w-fit rounded-2xl px-4 py-1 ${
              activeId === id
                ? "bg-white text-[#2a2a2a]"
                : "bg-[#2a2a2a] hover:bg-[#3a3a3a]"
            } transition-colors duration-300`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-3 flex w-full gap-2 overflow-x-scroll scrollbar-none">
        {Array.isArray(selectedArtistAlbums) &&
        selectedArtistAlbums.length > 0 ? (
          selectedArtistAlbums.slice(0, 7).map((album) => (
            <div
              className="flex cursor-pointer flex-col gap-1 p-2 hover:bg-[#282828]"
              onClick={() => {
                handleAlbumOnSearch(album.id);
                navigate(`/album/${album.id}`);
              }}
            >
              <div>
                <img src={album?.images[1]?.url} alt="album cover" />
              </div>
              <span className="text-md line-clamp-1 overflow-hidden font-medium text-white hover:underline">
                {album.name}
              </span>
              <div className="text-sm font-medium text-[#a0a0a0]">
                <span>{dateToYearConvertor(album.release_date)} &bull; </span>
                <span>
                  {album.album_type.slice(0, 1).toUpperCase() +
                    album.album_type.slice(1)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div>No albums available</div>
        )}
      </div>
    </div>
  );
}

export default ArtistDiscography;
