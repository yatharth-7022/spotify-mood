import { useEffect } from "react";
import { useNavContext } from "../state managament/NavContext";
import { useLocation } from "react-router";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { MdViewModule } from "react-icons/md";
function ShowMoreAlbums() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("/artist/")) {
      setIsSearchRoute(true);
    } else {
      setIsSearchRoute(false);
    }
  }, [location.pathname]);
  const {
    selectedArtistAlbums = [],
    setIsSearchRoute,
    selectedArtist,
  } = useNavContext();
  console.log(selectedArtistAlbums, "these are the albums");
  return (
    <div className="flex flex-col text-white">
      <div className="flex justify-between">
        <div>{selectedArtist.name}</div>
        <div className="flex gap-2">
          <div>
            <MdOutlineFormatListBulleted />
          </div>
          <div>
            <MdViewModule />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowMoreAlbums;
