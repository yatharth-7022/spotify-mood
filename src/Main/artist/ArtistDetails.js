import AlbumControl from "../AlbumControl";
import ArtistControl from "./ArtistControl";
import ArtistDiscography from "./ArtistDiscography";
import ArtistHeader from "./ArtistHeader";
import ArtistTracklist from "./ArtistTrack;ist";
import RelatedArtist from "./RelatedArtist";

function ArtistDetails() {
  return (
    <div className="flex h-full w-full flex-col gap-3 overflow-y-scroll scrollbar-none">
      <ArtistHeader />
      <ArtistControl />
      <ArtistTracklist />
      <ArtistDiscography />
      <RelatedArtist />
    </div>
  );
}

export default ArtistDetails;
