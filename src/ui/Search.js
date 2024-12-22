import Genres from "../Main/Genres";

function Search() {
  return (
    <div className="flex flex-col gap-2">
      <div className="mt-4 w-full text-2xl">
        <h1 className="font-bold text-white">Your top genres</h1>
      </div>
      <Genres />
    </div>
  );
}

export default Search;
