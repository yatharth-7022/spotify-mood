import { useNavContext } from "../state managament/NavContext";
import NavItems from "./NavItems";
function Navbar() {
  const { isSearchRoute } = useNavContext();
  return (
    <div
      className={`h-screen w-[70px] ${isSearchRoute ? "lg:w-[70px]" : ""} bg-navbar lg:w-[250px]`}
    >
      <div className="relative flex h-full w-full flex-col gap-9 overflow-x-hidden pt-14 text-white lg:relative lg:flex lg:h-full lg:flex-col lg:gap-9 lg:px-3 lg:pt-14">
        <NavItems />
      </div>
    </div>
  );
}

export default Navbar;
