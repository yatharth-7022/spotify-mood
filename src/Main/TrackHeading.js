import { CiClock2 } from "react-icons/ci";
function TrackHeading() {
  return (
    <div className="flex justify-between px-10 text-[#a0a0a0]">
      <div className="flex gap-5">
        <div>#</div>
        <div>Title</div>
      </div>
      <div>
        <CiClock2 className="scale-125" />
      </div>
    </div>
  );
}

export default TrackHeading;
