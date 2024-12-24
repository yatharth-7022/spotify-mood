import { useNavContext } from "../state managament/NavContext";
import AlbumControl from "./AlbumControl";
import AlbumDetailsHeader from "./AlbumDetailsHeader";
import TrackHeading from "./TrackHeading";
import Tracklist from "./Tracklist";
function AlbumDetails() {
  return (
    <div className="flex h-full w-full flex-col gap-5">
      <AlbumDetailsHeader />
      <AlbumControl />
      <TrackHeading />
      <Tracklist />
    </div>
  );
}

export default AlbumDetails;
