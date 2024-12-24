import { useNavContext } from "../state managament/NavContext";
import ColorThief from "colorthief";
import { useState, useEffect } from "react";
function AlbumDetailsHeader() {
  const [gradientColors, setGradientColors] = useState(["#000000", "#000000"]);
  const { selectedAlbum } = useNavContext();
  console.log(selectedAlbum);
  useEffect(() => {
    if (selectedAlbum.images) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = selectedAlbum.images[0].url;

      img.onload = () => {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        const palette = colorThief.getPalette(img, 2);

        const rgbToHex = ([r, g, b]) =>
          `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        const dominantHex = rgbToHex(dominantColor);
        let secondaryHex = palette[1] ? rgbToHex(palette[1]) : dominantHex;
        if (dominantHex === secondaryHex) {
          secondaryHex = lightenColor(dominantHex, 20);
        }
        setGradientColors([dominantHex, secondaryHex]);
      };
    }
  }, [selectedAlbum.images]);
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
  const releaseDate = selectedAlbum.release_date;

  const year = new Date(releaseDate).getFullYear();
  const totalDuration = [];
  selectedAlbum.tracks.items.forEach((item) =>
    totalDuration.push(item.duration_ms),
  );
  const ms_duration = totalDuration.reduce((a, b) => a + b);
  const totalSeconds = Math.floor(ms_duration / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <div
      className="flex h-[40%] w-full gap-5"
      style={{
        background: `linear-gradient(to top, ${gradientColors[0]}, ${gradientColors[1]})`,
      }}
    >
      <div className="ml-3 flex items-center">
        <img
          className="sm-hidden hidden w-fit scale-90 rounded-md shadow-xl md:block lg:block"
          src={selectedAlbum.images[1]?.url}
          alt=""
        />
        <img
          className="w-fit scale-90 rounded-md shadow-xl sm:block md:hidden lg:hidden"
          src={selectedAlbum.images[2]?.url}
          alt=""
        />
      </div>
      <div className="flex h-full flex-col justify-center gap-5 text-white">
        <span>Album</span>
        <h1 className="font-black sm:text-2xl md:text-5xl lg:text-7xl">
          {selectedAlbum.name}
        </h1>
        <div className="flex">
          <div>{selectedAlbum.artists[0].name} &bull; &nbsp; </div>
          <div className="text-[#eaeaea]"> {year} &bull; &nbsp;</div>
          <div className="text-[#eaeaea]">
            {selectedAlbum.total_tracks} songs, {minutes} min {seconds} sec
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumDetailsHeader;
