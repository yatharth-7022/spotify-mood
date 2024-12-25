import { useNavContext } from "../state managament/NavContext";
import SortSearchResults from "./SortSearchResults";
import { IoPlay } from "react-icons/io5";
function SearchResults() {
  const { result, query } = useNavContext();
  const resultKeys = Object.keys(result);

  const capitalized = resultKeys.map((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  function durationConvertor(duration) {
    let totalSeconds = Math.floor(duration / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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
                {key === "songs"
                  ? value.slice(0, 4).map((val) => (
                      <div className="group flex justify-between rounded-md pl-2 pr-4 hover:bg-[#282828]">
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
                            <div className="cursor-pointer text-[#a0a0a0] hover:text-white hover:underline">
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
                  : value.map((val) => (
                      <div>
                        <div>{val?.name}</div>
                      </div>
                    ))}
              </div>
            </div>
          ),
      )}
    </div>
  );
}

export default SearchResults;