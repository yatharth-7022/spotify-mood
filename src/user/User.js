import { RiArrowDropDownFill } from "react-icons/ri";
function User() {
  return (
    <div className="flex h-full w-fit items-center gap-4">
      <div className="w-650%] relative flex h-6 items-center gap-1 rounded-3xl bg-black py-1 text-sm hover:cursor-pointer">
        <div className="w-[20%] rounded-full">
          <img src="/assets/Ellipse-3.png" className="h-5" alt="user logo" />
        </div>
        Angel
        <RiArrowDropDownFill className="h-6 w-6" />
      </div>
    </div>
  );
}

export default User;
