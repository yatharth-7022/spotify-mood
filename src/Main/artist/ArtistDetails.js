import { useNavContext } from "../../state managament/NavContext";
import AlbumControl from "../AlbumControl";
import ArtistControl from "./ArtistControl";
import ArtistDiscography from "./ArtistDiscography";
import ArtistHeader from "./ArtistHeader";
import ArtistTracklist from "./ArtistTrack;ist";
import RelatedArtist from "./RelatedArtist";
import { useState, useEffect, useRef } from "react";
import { MdPlayCircle } from "react-icons/md";
function ArtistDetails() {
  const { selectedArtist } = useNavContext();
  const [isSticky, setIsSticky] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        setIsSticky(scrollTop > window.innerHeight * 0.5);
      }
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="mb-6 h-full w-full overflow-y-scroll scrollbar-none"
    >
      {isSticky && (
        <div
          className="fixed top-0 z-10 flex items-center gap-2 bg-[#212121] px-4 py-2 text-white shadow-lg"
          style={{
            left: "var(--navbar-width)",
            width: "calc(100% - var(--navbar-width))",
          }}
        >
          <div>
            {" "}
            <MdPlayCircle className="h-[4rem] w-[4rem] cursor-pointer text-green-500 hover:scale-110 hover:text-green-600" />
          </div>
          <h1 className="text-2xl font-black">{selectedArtist.name}</h1>
        </div>
      )}
      <div
        className="relative mb-3 flex min-h-[50vh] w-full flex-col justify-end bg-cover bg-center py-5"
        style={{
          backgroundImage: selectedArtist?.images[0]?.url
            ? `url(${selectedArtist?.images[0]?.url})`
            : "none",
          backgroundPosition: "center 30%",
        }}
      >
        <ArtistHeader />
      </div>

      <div className="flex flex-col gap-3">
        <ArtistControl />
        <ArtistTracklist />
        <ArtistDiscography />
        <RelatedArtist />
      </div>
    </div>
  );
}

export default ArtistDetails;
