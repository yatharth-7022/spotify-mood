import AlbumControl from "../albums/AlbumControl";
import TrackHeading from "../Tracks/TrackHeading";
import PlaylistDetailsHeader from "./PlaylistDetailsHeader";
import PlaylistTrackList from "./PlaylistTrackList";

function PlaylistDetails() {
  return (
    <div className="flex h-full w-full flex-col gap-5">
      <PlaylistDetailsHeader />

      <AlbumControl />
      <TrackHeading />
      <PlaylistTrackList />
    </div>
  );
}

export default PlaylistDetails;
