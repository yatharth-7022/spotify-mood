import { MdPlayCircle } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
function AlbumControl() {
  return (
    <div className="flex h-fit w-full justify-between px-5">
      <div className="flex items-center gap-8">
        <MdPlayCircle className="h-[4rem] w-[4rem] cursor-pointer text-green-500 hover:scale-110 hover:text-green-600" />
        <IoAddCircleOutline className="h-[2rem] w-[2rem] cursor-pointer text-[#a0a0a0] hover:text-[white]" />
        <div className="cursor-pointer text-[#a0a0a0] hover:text-[white]">
          &bull; &bull; &bull;
        </div>
      </div>
      <div className="flex cursor-pointer items-center gap-3 text-[#a0a0a0] hover:text-[white]">
        List
        <FaListUl />
      </div>
    </div>
  );
}

export default AlbumControl;
