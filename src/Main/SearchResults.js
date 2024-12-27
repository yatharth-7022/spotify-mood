import { useNavContext } from "../state managament/NavContext";
import SortSearchResults from "./SortSearchResults";
import { IoPlay } from "react-icons/io5";
import { IoPlayCircle } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router";
function SearchResults() {
  const {
    result,
    query,
    handleAlbumSelection,
    handleAlbumOnSearch,
    handlePlayListOnSearch,
    playlistId,
    handleArtistOnSearch,
  } = useNavContext();
  const resultKeys = Object.keys(result);
  const capitalized = resultKeys.map((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  const navigate = useNavigate();
  const navigatePlaylist = useNavigate();
  const navigateArtist = useNavigate();
  function durationConvertor(duration) {
    let totalSeconds = Math.floor(duration / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  function dateToYearConvertor(dateRecieved) {
    const date = new Date(dateRecieved);
    const year = date.getFullYear();
    return year;
  }

  console.log("Search Results:", result);
  return (
    <div className="mt-3 flex w-full flex-col gap-7 overflow-y-scroll scrollbar-none">
      <SortSearchResults />
      {Object.entries(result).map(
        ([key, value]) =>
          value.length > 0 && (
            <div key={key} className="flex w-full flex-col gap-3 text-white">
              <div className="px-3 text-3xl font-extrabold">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </div>
              <div className="flex h-fit w-full flex-col gap-1 overflow-x-scroll scrollbar-none">
                {key === "songs" ? (
                  value.slice(0, 4).map((val) => (
                    <div
                      key={val.id}
                      className="group flex justify-between rounded-md pl-2 pr-4 hover:bg-[#282828]"
                    >
                      <div className="flex gap-1">
                        <div className="group relative flex items-center">
                          <img
                            className="scale-75 rounded-md object-cover transition-transform duration-300"
                            src={val.album.images[2].url}
                            alt="song album cover"
                          />

                          <div className="absolute inset-0 flex scale-75 items-center justify-center bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-50">
                            <i className="text-xl text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <IoPlay />
                            </i>
                          </div>
                        </div>
                        <div className="flex flex-col pt-2">
                          <div className="font-semibold hover:underline">
                            {val?.name}
                          </div>
                          <div className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-[#a0a0a0] hover:text-white hover:underline">
                            {val.artists
                              .map((artist) => artist.name)
                              .join(", ")}
                          </div>
                        </div>
                      </div>
                      <div className="group flex items-center gap-4 text-[#a0a0a0]">
                        <div>{durationConvertor(val.duration_ms)}</div>
                        <div className="cursor-pointer text-[10px] text-white opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                          &bull; &bull; &bull;
                        </div>
                      </div>
                    </div>
                  ))
                ) : key === "artists" ? (
                  <div className="flex" key="artists">
                    {value.slice(0, 7).map((val) => (
                      <div
                        key={val.id}
                        className="flex flex-col items-center gap-2 rounded-md p-2 text-white hover:bg-[#282828]"
                        onClick={() => {
                          handleArtistOnSearch(val.id);
                          navigateArtist(`/artist/${val.id}`);
                        }}
                      >
                        <div className="lg:h-35 lg:w-35 overflow-hidden rounded-full">
                          <img
                            className="h-full w-full object-cover"
                            src={
                              val.images[1]?.height > 320
                                ? val.images[2]?.url
                                : val.images[1]?.url
                            }
                            alt="artist_img"
                          />
                        </div>
                        <div className="flex flex-col items-center">
                          <div>{val.name}</div>
                          <div className="text-[#a0a0a0]">
                            {val.type.charAt(0).toUpperCase() +
                              key.slice(1, -1)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : key === "albums" ? (
                  <div className="flex gap-1" key="albums">
                    {}
                    {value.slice(0, 7).map((val) => {
                      return (
                        <div
                          key={val.id}
                          className="flex flex-col gap-1 p-2 hover:cursor-pointer hover:bg-[#282828] md:w-[150px] lg:w-[200px]"
                          onClick={() => {
                            // console.log("album clicked", val.id);
                            handleAlbumOnSearch(val.id);
                            navigate(`/album/${val.id}`);
                          }}
                        >
                          <div className="group relative">
                            <img
                              className="rounded-md object-cover"
                              src={val.images[1]?.url}
                              alt=""
                            />
                            <div className="absolute bottom-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <IoPlayCircle className="text-6xl text-green-500" />
                            </div>
                          </div>
                          <div className="hover:underline">{val?.name}</div>

                          <div className="text-sm text-[#a0a0a0]">
                            <span>
                              {dateToYearConvertor(val.release_date)} &bull;{" "}
                            </span>
                            <span className="hover:underline">
                              {val.artists
                                .map((artist) => artist.name)
                                .join(", ")}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : key === "playlists" ? (
                  <div className="flex gap-2" key="playlists">
                    {value
                      .filter((va) => va !== null && va.images[1])
                      .slice(0, 7)
                      .map((val) => (
                        <div
                          className="flex cursor-pointer flex-col gap-1 p-2 hover:bg-[#282828] md:w-[150px] lg:w-[200px]"
                          key={val.id}
                          onClick={() => {
                            handlePlayListOnSearch(val.id);
                            navigatePlaylist(`/playlist/${val.id}`);
                          }}
                        >
                          <div className="group relative overflow-hidden">
                            <img
                              className="object-cover"
                              src={val.images[1]?.url}
                              alt=""
                            />
                            <div className="absolute bottom-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <IoPlayCircle className="text-6xl text-green-500" />
                            </div>
                          </div>
                          <span className="line-clamp-2 text-sm font-medium hover:underline">
                            {val?.name}
                          </span>
                          <span className="line-clamp-1 text-sm text-[#a0a0a0]">
                            By {val.owner.display_name}
                          </span>
                        </div>
                      ))}
                  </div>
                ) : key === "shows" ? (
                  <div className="flex gap-1" key="shows">
                    {value.slice(0, 7).map((val) => (
                      <div
                        key={val.id}
                        className="flex flex-col gap-1 p-2 hover:bg-[#282828] md:w-[150px] lg:w-[200px]"
                      >
                        <div className="group relative">
                          <img src={val.images[1]?.url} alt="" />
                          <div className="absolute bottom-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <IoPlayCircle className="text-6xl text-green-500" />
                          </div>
                        </div>
                        <span className="line-clamp-2 text-sm font-medium hover:underline">
                          {val?.name}
                        </span>
                        <span className="line-clamp-1 text-sm text-[#a0a0a0]">
                          {val.publisher}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ),
      )}
    </div>
  );
}

export default SearchResults;
