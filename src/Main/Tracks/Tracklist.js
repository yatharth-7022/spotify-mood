import { useNavContext } from "../../state managament/NavContext";
import { IoPlay } from "react-icons/io5";
import { useState } from "react";

function Tracklist() {
  const { selectedAlbum } = useNavContext();
  const [hoveredTrack, setHoveredTrack] = useState(null);
  // console.log(selectedAlbum, "this is selected in header");
  function durationConvertor(duration) {
    let totalSeconds = Math.floor(duration / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  if (!selectedAlbum?.albums[0]?.tracks?.items) {
    return <div className="text-white">Loading tracks...</div>;
  }
  // console.log(selectedAlbum, "sele");
  return (
    <div className="flex flex-col px-8 pb-4 text-white">
      {selectedAlbum.albums[0]?.tracks.items.map((track, index) => (
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
              <div>{track.name}</div>
              <div
                className={`${
                  hoveredTrack === index ? "text-white" : "text-[#a0a0a0]"
                }`}
              >
                {track.artists.map((artist) => artist.name).join(", ")}
              </div>
            </div>
          </div>
          <div className="flex items-center text-[#a0a0a0]">
            {durationConvertor(track.duration_ms)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tracklist;
