import { useNavContext } from "../../state managament/NavContext";
import NavItems from "./NavItems";
function Navbar() {
  const { isSearchRoute } = useNavContext();
  return (
    <div
      className={`flex h-full w-[70px] rounded-xl bg-[#121212] lg:w-[400px] ${isSearchRoute ? "lg:w-[71px]" : ""}`}
    >
      <div className="flex w-full flex-col justify-start gap-9 overflow-x-hidden overflow-y-scroll pt-3 text-white scrollbar-none lg:flex lg:h-full lg:flex-col lg:gap-9 lg:px-[px] lg:pt-6">
        <NavItems />
      </div>
    </div>
  );
}

export default Navbar;
