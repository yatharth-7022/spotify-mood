import { useEffect, useState } from "react";
import { useNavContext } from "../../state managament/NavContext";
import ColorThief from "colorthief";
import { VscVerifiedFilled } from "react-icons/vsc";
function ArtistHeader() {
  const [gradientColors, setGradientColors] = useState(["#000000", "#000000"]);
  const { selectedArtist } = useNavContext();
  useEffect(() => {
    if (selectedArtist?.images) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = selectedArtist?.images[0]?.url;

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
  }, [selectedArtist]);
  const bigNumberConvertor = (num) => {
    return num.toLocaleString("en-US");
  };
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

  if (!selectedArtist) {
    return <div>Loading Artist details...</div>;
  }
  return (
    <div
      className="relative flex h-[45%] w-full flex-col justify-end bg-cover bg-center py-5"
      style={{
        backgroundImage: selectedArtist.images[0]?.url
          ? `url(${selectedArtist.images[0]?.url})`
          : "none",
        backgroundPosition: "center 30%",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="z-10 flex items-center gap-2 px-7">
        <span className="text-2xl text-[#4cb3ff]">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.38 14.72H7.67L6 13H3.53L3 12.5V10.08L1.31 8.36004V7.65004L3 5.93004V3.50004L3.53 3.00004H6L7.67 1.29004H8.38L10.1 3.00004H12.53L13.03 3.49004V5.93004L14.74 7.65004V8.36004L13 10.08V12.5L12.5 13H10.1L8.38 14.72Z"
              fill="currentColor"
            />

            <path
              d="M6.73004 10.4799H7.44004L11.21 6.71L10.5 6L7.09004 9.41991L5.71 8.03984L5 8.74984L6.73004 10.4799Z"
              fill="white"
            />
          </svg>
        </span>

        <span className="text-sm text-white">Verified Artist</span>
      </div>
      <div className="relative z-10 flex flex-col gap-1">
        <div className="flex h-[80%] items-end px-7 text-white lg:text-8xl lg:font-black">
          {selectedArtist.name}
        </div>
        <div className="flex gap-2 px-9">
          <div className="text-white">
            {bigNumberConvertor(selectedArtist.followers.total)}
          </div>
          <span className="text-white">monthly listeners</span>
        </div>
      </div>
    </div>
  );
}

export default ArtistHeader;
