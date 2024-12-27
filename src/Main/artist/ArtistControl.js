import { MdPlayCircle } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
function ArtistControl() {
  return (
    <div className="flex h-fit w-full justify-between px-5">
      <div className="flex items-center gap-8">
        <MdPlayCircle className="h-[4rem] w-[4rem] cursor-pointer text-green-500 hover:scale-110 hover:text-green-600" />
        <div className="w-fit cursor-pointer rounded-3xl border-2 border-[#a0a0a0] bg-transparent px-4 py-1 text-sm font-medium text-white hover:scale-110 hover:border-white">
          Follow
        </div>
        <div className="cursor-pointer text-[#a0a0a0] hover:text-[white]">
          &bull; &bull; &bull;
        </div>
      </div>
    </div>
  );
}

export default ArtistControl;
