import { MdPlayCircle } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
function AlbumControl() {
  return (
    <div className="flex h-fit w-full justify-between px-5">
      <div className="flex items-center gap-8">
        <MdPlayCircle className="h-[5rem] w-[5rem] cursor-pointer text-green-500" />
        <IoAddCircleOutline className="h-[3rem] w-[3rem] cursor-pointer text-[#a0a0a0]" />
        <div className="cursor-pointer text-[#a0a0a0]">
          &bull; &bull; &bull;
        </div>
      </div>
      <div className="flex items-center gap-3 text-[#a0a0a0]">
        List
        <FaListUl className="" />
      </div>
    </div>
  );
}

export default AlbumControl;
