import { useNavContext } from "../state managament/NavContext";
import AlbumControl from "./AlbumControl";
import AlbumDetailsHeader from "./AlbumDetailsHeader";
import TrackHeading from "./TrackHeading";

function AlbumDetails() {
  const { selectedAlbum } = useNavContext();
  return (
    <div className="flex h-full w-full flex-col gap-5">
      <AlbumDetailsHeader />
      <AlbumControl />
      <TrackHeading />
    </div>
  );
}

export default AlbumDetails;
