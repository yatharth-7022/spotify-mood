import NavItems from "./NavItems";
function Navbar() {
  return (
    <div className="relative flex h-full w-full flex-col gap-9 overflow-x-hidden pt-14 text-white lg:relative lg:flex lg:h-full lg:flex-col lg:gap-9 lg:px-3 lg:pt-14">
      <NavItems />
    </div>
  );
}

export default Navbar;
