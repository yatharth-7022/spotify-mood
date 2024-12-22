import { CiSearch } from "react-icons/ci";
function SearchBar() {
  return (
    <div className="flex h-full w-[30%] items-center md:w-[40%]">
      <div className="gap -2 flex h-10 w-full flex-row items-center rounded-3xl bg-white px-3">
        <CiSearch className="h-full w-6 text-black" />
        <input
          type="text"
          className="h-full w-full pl-2 font-semibold"
          placeholder="Artist, songs, or podcasts"
        />
      </div>
    </div>
  );
}

export default SearchBar;
