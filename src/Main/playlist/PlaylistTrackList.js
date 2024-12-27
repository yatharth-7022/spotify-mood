import { useState } from "react";
import { useNavContext } from "../../state managament/NavContext";
import { IoPlay } from "react-icons/io5";
function PlaylistTrackList() {
  const { selectedPlaylist } = useNavContext();
  const [hoveredTrack, setHoveredTrack] = useState(null);
  // console.log(selectedPlaylist, "this is selected in header");
  function durationConvertor(duration) {
    let totalSeconds = Math.floor(duration / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  if (!selectedPlaylist?.tracks?.items) {
    return <div className="text-white">Loading tracks...</div>;
  }
  // console.log(selectedPlaylist, "sele");
  return (
    <div className="flex flex-col px-8 pb-4 text-white">
      {selectedPlaylist?.tracks?.items?.map((track, index) => (
        <div
          key={index}
          className="flex cursor-pointer justify-between rounded-md px-3 py-2 hover:bg-[#282828]"
          onMouseEnter={() => setHoveredTrack(index)}
          onMouseLeave={() => setHoveredTrack(null)}
        >
          <div className="flex gap-6">
            <div
              className={`${
                hoveredTrack === index ? "text-white" : "text-[#a0a0a0]"
              } flex items-center`}
            >
              {hoveredTrack === index ? <IoPlay /> : index + 1}
            </div>

            <div className="flex flex-col">
              <span className="line-clamp-1 overflow-hidden">
                {track?.track?.name}
              </span>
              <div
                className={`${
                  hoveredTrack === index ? "text-white" : "text-[#a0a0a0]"
                }`}
              >
                {track?.track?.artists
                  ?.map((artist) => artist?.name)
                  .join(", ")}
              </div>
            </div>
          </div>
          <div className="flex items-center text-[#a0a0a0]">
            {durationConvertor(track?.track?.duration_ms)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlaylistTrackList;
