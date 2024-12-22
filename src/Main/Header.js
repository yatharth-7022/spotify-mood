import BackForwardButton from "../buttons/backForwardButton";
import { useNavContext } from "../state managament/NavContext";
import Search from "../ui/Search";
import SearchBar from "../ui/SearchBar";

import User from "../user/User";
function Header() {
  const { isActive, handleIsActive } = useNavContext();
  return (
    <div className="flex h-[10%] w-full flex-row justify-between gap-7 text-white">
      <BackForwardButton />
      {isActive === 2 ? <SearchBar /> : null}
      <User />
    </div>
  );
}

export default Header;
