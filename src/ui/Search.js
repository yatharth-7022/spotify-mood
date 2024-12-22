import AudioType from "../Main/AudioType";
import Genres from "../Main/Genres";

function Search() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="mt-4 w-full text-2xl">
          <h1 className="font-bold text-white">Your top genres</h1>
        </div>
        <Genres />
      </div>
      <div className="mt-4 w-full text-2xl">
        <h1 className="font-bold text-white">Browse all</h1>
      </div>
      <AudioType />
    </div>
  );
}

export default Search;
