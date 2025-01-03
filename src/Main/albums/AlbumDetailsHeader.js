import { useNavContext } from "../../state managament/NavContext";
import ColorThief from "colorthief";
import { useState, useEffect } from "react";

function AlbumDetailsHeader() {
  const [gradientColors, setGradientColors] = useState(["#000000", "#000000"]);
  const { selectedAlbum } = useNavContext();
  useEffect(() => {
    if (selectedAlbum?.albums[0].images) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = selectedAlbum?.albums[0]?.images[0]?.url;

      img.onload = () => {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        const palette = colorThief.getPalette(img, 2);

        const rgbToHex = ([r, g, b]) =>
          `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        const dominantHex = rgbToHex(dominantColor);
        const secondaryHex =
          palette[1] && dominantHex !== rgbToHex(palette[1])
            ? rgbToHex(palette[1])
            : lightenColor(dominantHex, 20);
        setGradientColors([dominantHex, secondaryHex]);
      };
    }
  }, [selectedAlbum]);

  const lightenColor = (hex, percent) => {
    const num = parseInt(hex.slice(1), 16);
    const r = Math.min(255, Math.floor((num >> 16) + (255 * percent) / 100));
    const g = Math.min(
      255,
      Math.floor(((num >> 8) & 0x00ff) + (255 * percent) / 100),
    );
    const b = Math.min(
      255,
      Math.floor((num & 0x0000ff) + (255 * percent) / 100),
    );
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  };

  if (!selectedAlbum) {
    return <div>Loading album details...</div>;
  }

  const releaseDate = selectedAlbum.albums[0]?.release_date || "";
  const year = new Date(releaseDate).getFullYear();
  const totalDuration =
    selectedAlbum.albums[0]?.tracks?.items?.reduce(
      (total, item) => total + item.duration_ms,
      0,
    ) || 0;
  const totalSeconds = Math.floor(totalDuration / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <div
      className="flex h-[40%] w-full gap-5"
      style={{
        background: `linear-gradient(to top, ${gradientColors[0]}, ${gradientColors[1]})`,
      }}
    >
      <div className="ml-3 flex items-center py-5">
        <img
          className="sm-hidden hidden h-[15rem] w-auto transform rounded-md object-cover shadow-xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl md:block lg:block"
          src={selectedAlbum.albums[0]?.images?.[1]?.url}
          alt=""
        />

        <img
          className="w-fit scale-90 transform rounded-md shadow-xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl sm:block md:hidden lg:hidden"
          src={selectedAlbum.albums[0]?.images?.[2]?.url}
          alt=""
        />
      </div>

      <div className="flex h-full flex-col justify-center gap-5 text-white">
        <span>Album</span>
        <h1 className="font-black sm:text-2xl md:text-5xl lg:text-7xl">
          {selectedAlbum.albums[0]?.name}
        </h1>
        <div className="flex">
          <div>
            {selectedAlbum.albums[0]?.artists?.[0]?.name} &bull; &nbsp;{" "}
          </div>
          <div className="text-[#eaeaea]"> {year} &bull; &nbsp;</div>
          <div className="text-[#eaeaea]">
            {selectedAlbum.albums[0]?.total_tracks} songs, {minutes} min{" "}
            {seconds} sec
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumDetailsHeader;
