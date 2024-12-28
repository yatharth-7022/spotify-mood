import BackForwardButton from "../buttons/backForwardButton";
import Search from "./Search/Search";
import SearchBar from "./Search/SearchBar";

import User from "../user/User";
function Header() {
  return (
    <div className="flex h-[10%] w-full flex-row justify-between gap-7 text-white">
      <BackForwardButton />
      <User />
    </div>
  );
}

export default Header;
