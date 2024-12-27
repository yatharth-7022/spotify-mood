import { useEffect, useState } from "react";
import { useNavContext } from "../../state managament/NavContext";
import ColorThief from "colorthief";
function PlaylistDetailsHeader() {
  const [gradientColors, setGradientColors] = useState(["#000000", "#000000"]);
  const { selectedPlaylist } = useNavContext();
  useEffect(() => {
    if (selectedPlaylist?.images) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = selectedPlaylist?.images[0]?.url;

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
  }, [selectedPlaylist]);

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

  if (!selectedPlaylist) {
    return <div>Loading album details...</div>;
  }

  //   const releaseDate = selectedPlaylist?.release_date || "";
  //   const year = new Date(releaseDate).getFullYear();
  //   const totalDuration =
  //     selectedPlaylist?.tracks?.items?.reduce(
  //       (total, item) => total + item.duration_ms,
  //       0,
  //     ) || 0;
  //   const totalSeconds = Math.floor(totalDuration / 1000);
  //   const minutes = Math.floor(totalSeconds / 60);
  //   const seconds = totalSeconds % 60;

  return (
    <div
      className="flex h-[100%] w-full gap-5"
      style={{
        background: `linear-gradient(to top, ${gradientColors[0]}, ${gradientColors[1]})`,
      }}
    >
      <div className="ml-3 flex items-center">
        <img
          className="sm-hidden hidden w-fit scale-90 rounded-md shadow-xl md:block lg:block"
          src={selectedPlaylist?.images?.[1]?.url}
          alt=""
        />

        <img
          className="w-fit scale-90 rounded-md shadow-xl sm:block md:hidden lg:hidden"
          src={selectedPlaylist?.images?.[2]?.url}
          alt=""
        />
      </div>
      <div className="flex h-[100%] flex-col justify-center gap-5 pr-4 text-white">
        <span>
          {selectedPlaylist.type.slice(0, 1)[0].toUpperCase() +
            selectedPlaylist.type.slice(1)}
        </span>
        <span
          style={{
            fontSize: selectedPlaylist?.name.length > 30 ? "3rem" : "3rem",
          }}
          className="line-clamp-2 font-black sm:text-2xl md:text-5xl lg:text-7xl"
        >
          {selectedPlaylist?.name}
        </span>
        <div className="flex">
          {/* <div>{selectedPlaylist?.artists?.[0]?.name} &bull; &nbsp; </div> */}
          {/* <div className="text-[#eaeaea]"> {year} &bull; &nbsp;</div>
          <div className="text-[#eaeaea]">
            {selectedPlaylist?.total_tracks} songs, {minutes} min{" "}
            {seconds} sec
          </div> */}
        </div>
      </div>
    </div>
  );
}
export default PlaylistDetailsHeader;
