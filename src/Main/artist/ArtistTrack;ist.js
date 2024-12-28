import { useNavContext } from "../../state managament/NavContext";
import { useState } from "react";
import { MdExplicit } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
function ArtistTracklist() {
  const { selectedArtistSongs, durationConvertor } = useNavContext();
  const [showMore, setShowMore] = useState(5);
  function handleShowMore() {
    setShowMore((prevShowMore) =>
      Math.min(prevShowMore + 5, selectedArtistSongs?.length || 0),
    );
  }
  const handleShowLess = () => {
    setShowMore(Math.max(5, showMore - 5));
  };
  const displaySongs = (selectedArtistSongs || [])
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, showMore);
  return (
    <div className="mt-4 flex flex-col gap-3 px-7">
      <div className="text-2xl font-bold text-white">Popular</div>
      <div className="h-fit w-full">
        {displaySongs.map((track, index) => (
          <div
            key={track.id}
            className="group flex h-fit justify-between rounded-md px-3 hover:bg-[#282828]"
          >
            <div className="flex gap-4">
              <span className="flex items-center text-[#a0a0a0] group-hover:hidden">
                {index + 1}
              </span>
              <span className="hidden items-center text-white group-hover:flex">
                <FaPlay className="scale-75" />
              </span>
              <div className="flex gap-2">
                <div className="flex items-center">
                  <img
                    className="scale-75 rounded-lg"
                    src={track.album?.images[2]?.url}
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <span className="text-white hover:underline">
                    {track.name}
                  </span>
                  {track.explicit && (
                    <div className="flex items-center">
                      <MdExplicit className="scale-125 text-[#a0a0a0]" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center text-[#a0a0a0]">
              {durationConvertor(track.duration_ms)}
            </div>
          </div>
        ))}
        {showMore > 5 && (
          <button className="text-[#a0a0a0]" onClick={handleShowLess}>
            See less{" "}
          </button>
        )}
        {showMore < selectedArtistSongs.length && (
          <button className="text-[#a0a0a0]" onClick={handleShowMore}>
            See more{" "}
          </button>
        )}
      </div>
    </div>
  );
}

export default ArtistTracklist;
