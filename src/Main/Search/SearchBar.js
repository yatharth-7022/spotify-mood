import { CiSearch } from "react-icons/ci";
import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { useNavContext } from "../../state managament/NavContext";
import { IoMdRemoveCircle } from "react-icons/io";
import { debounce } from "lodash";
function SearchBar() {
  const navigate = useNavigate();
  const { query, setQuery, recentSearches, setRecentSearches } =
    useNavContext();
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const removeSearch = (searchTerm) => {
    // console.log("Removing:", searchTerm);
    setRecentSearches(recentSearches.filter((term) => term !== searchTerm));
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (query && !recentSearches.includes(query)) {
        if (recentSearches.length <= 6) {
          setRecentSearches([...recentSearches, query]);
        } else {
          setRecentSearches([...recentSearches.slice(-1), query]);
        }
      }
    }
  }
  const handleOpen = () => {
    if (query.length > 0) {
      setIsOpen(false);
    }
  };
  const debouncedNavigate = useMemo(
    () =>
      debounce((value) => {
        if (value.trim()) {
          navigate(`/search/${query}`);
        }
      }, 300),
    [navigate],
  );
  function handleSearch(e) {
    const value = e.target.value;
    setQuery(value);
    debouncedNavigate(value);
  }
  return (
    <div
      ref={searchContainerRef}
      className="relative flex h-full w-full items-center"
    >
      <div className="flex h-12 w-full flex-row items-center gap-4 rounded-3xl bg-[#1f1f1f] px-3">
        <CiSearch className="h-full w-6 scale-105 text-[#a2a2a2] hover:text-white" />
        <input
          type="text"
          className="h-full w-full rounded-none bg-[#1f1f1f] pl-2 font-semibold text-white focus:outline-none focus:ring-0"
          placeholder="Artist, songs, or podcasts"
          onChange={handleSearch}
          onClick={handleOpen}
          value={query}
          onKeyDown={handleKeyDown}
        />
      </div>

      {isOpen && !query && (
        <div className="absolute top-14 w-full rounded-xl bg-[#282828] p-4 shadow-lg">
          <div className="mb-2 text-sm font-semibold text-white">
            Recent searches
          </div>
          <div className="flex flex-col gap-2">
            {recentSearches.map((search, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-[#3e3e3e]"
                onClick={() => {
                  setQuery(search);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <iClock2 className="h-4 w-4 text-[#a2a2a2]" />
                  <span className="text-sm text-[#e2e2e2]">{search}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSearch(search);
                  }}
                  className="text-[#a2a2a2] hover:text-white"
                >
                  <div className="h-4 w-4">
                    <IoMdRemoveCircle />{" "}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default SearchBar;
