import { useEffect, useState } from "react";
import { useNavContext } from "../../state managament/NavContext";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { MdViewModule } from "react-icons/md";
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdExplicit } from "react-icons/md";
import { IoPlay } from "react-icons/io5";
import axios from "axios";
import TrackHeading from "../Tracks/TrackHeading";
import { IoIosAddCircle } from "react-icons/io";
function ShowMoreAlbums() {
  const {
    selectedArtistAlbums = [],
    selectedArtist,
    releaseYear,
    durationConvertor,
  } = useNavContext();
  const [albumsWithTracks, setAlbumsWithTracks] = useState([]);
  const [hoveredTrack, setHoveredTrack] = useState(null);
  useEffect(() => {
    const fetchTracksForAlbums = async () => {
      const accessToken = localStorage.getItem("access_token");

      const albumsWithTracksData = await Promise.all(
        selectedArtistAlbums.map(async (album) => {
          try {
            const response = await axios.get(
              `https://api.spotify.com/v1/albums/${album.id}/tracks`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );
            return { ...album, tracks: response.data.items };
          } catch (error) {
            console.error(
              `Failed to fetch tracks for album ${album.id}`,
              error,
            );
            return { ...album, tracks: [] };
          }
        }),
      );
      setAlbumsWithTracks(albumsWithTracksData);
    };

    if (selectedArtistAlbums.length > 0) {
      fetchTracksForAlbums();
    }
  }, [selectedArtistAlbums]);
  console.log(albumsWithTracks);
  return (
    <div className="flex h-full w-full flex-col bg-[#121212] text-white">
      <div className="flex h-[15%] items-end justify-between px-7">
        <div className="text-2xl font-extrabold">{selectedArtist?.name}</div>
        <div className="flex gap-2">
          <div>
            <MdOutlineFormatListBulleted className="h-[1.5rem] w-auto" />
          </div>
          <div>
            <MdViewModule className="h-[1.5rem] w-auto" />
          </div>
        </div>
      </div>

      <div className="flex h-[85%] w-full flex-col gap-6 p-8">
        {albumsWithTracks
          .slice()
          .reverse()
          .map((album, index) => (
            <div key={album.id} className="flex flex-col gap-6">
              <div className="flex gap-4 px-8">
                <div>
                  <img
                    className="h-[9rem] w-auto rounded-md"
                    src={album?.images[0]?.url}
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-3xl font-bold text-white hover:cursor-pointer hover:underline">
                    {album.name}
                  </div>
                  <div className="flex flex-col gap-7">
                    <span className="tex-sm font-medium text-[#a0a0a0]">
                      {album.type.slice(0, 1).toUpperCase() +
                        album.type.slice(1)}{" "}
                      <span className="text-[#a0a0a0]"> &bull; </span>{" "}
                      <span className="text-sm font-medium text-[#a0a0a0]">
                        {releaseYear(album.release_date)}
                      </span>
                      <span className="text-sm font-normal text-[#a0a0a0]">
                        {" "}
                        &bull;{" "}
                      </span>
                      <span className="text-sm font-medium text-[#a0a0a0]">
                        {album.tracks.length} Songs
                      </span>
                    </span>
                    <div className="flex items-center gap-4">
                      <FaCirclePlay className="h-8 w-auto hover:scale-110 hover:cursor-pointer hover:text-white" />
                      <IoIosAddCircleOutline
                        style={{ strokeWidth: 5 }}
                        className="h-7 w-auto text-[#a0a0a0] hover:scale-110 hover:cursor-pointer hover:text-white"
                      />
                      <span className="font-extralight text-[#a0a0a0] hover:scale-110 hover:cursor-pointer hover:text-white">
                        &bull; &bull; &bull;
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <TrackHeading />
              </div>
              <div className="mb-10 flex h-fit flex-col justify-center">
                {album.tracks.map((track, index) => (
                  <div
                    key={track.id}
                    className="group flex w-full justify-between rounded-md px-4 py-1 transition duration-200 hover:bg-[#282828]"
                    onMouseEnter={() => setHoveredTrack(track.id)}
                    onMouseLeave={() => setHoveredTrack(null)}
                  >
                    <div className="flex w-full gap-5">
                      <div className="flex items-center text-[#a0a0a0]">
                        <span className="h-[20px] w-[10px]">
                          {hoveredTrack === track.id ? (
                            <IoPlay className="h-[20px] w-auto text-white hover:cursor-pointer" />
                          ) : (
                            index + 1
                          )}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <div className="font-medium hover:cursor-pointer hover:underline">
                          {track.name}
                        </div>
                        <div className="flex items-center gap-1 text-[#a0a0a0]">
                          <span className="flex items-center">
                            {track.explicit && (
                              <MdExplicit className="text-xl font-light text-[#a0a0a0]" />
                            )}
                          </span>
                          <span className="font-medium group-hover:text-white hover:cursor-pointer hover:underline">
                            {track.artists
                              ?.map((artist) => artist.name)
                              .join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-[9rem] items-center gap-4">
                      <div className="flex gap-7">
                        <span className="flex h-5 w-auto items-center">
                          <IoIosAddCircle className="hidden h-5 w-auto group-hover:block" />
                        </span>
                        <div className="flex h-auto w-fit items-center text-[#a0a0a0]">
                          {durationConvertor(track.duration_ms)}
                        </div>
                      </div>

                      <span className="flex hidden items-center text-sm font-extralight text-white transition duration-200 group-hover:block hover:cursor-pointer">
                        &bull; &bull; &bull;
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ShowMoreAlbums;
