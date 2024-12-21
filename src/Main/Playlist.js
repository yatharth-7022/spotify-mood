import { useEffect, useState } from "react";
import Album from "./Album";

const albumIds = [
  "7D2NdGvBHIavgLhmcwhluK",
  "6X1x82kppWZmDzlXXK3y3q",
  "0UMMIkurRUmkruZ3KGBLtG",
  "0ptlfJfwGTy0Yvrk14JK1I",
  "690w3h4czL3x3W3zIgEcB6",
  "4SZko61aMnmgvNhfhgTuD3",
  "41GuZcammIkupMPKH2OJ6I",
  "4PWBTB6NYSKQwfo79I3prg",
  "16PSZwABl4VFJvfDFOPOoB",
  "1kTlYbs28MXw7hwO0NLYif",
  "2ODvWsOgouMbaA5xf0RkJe",
];

function Playlist() {
  const [albumData, setAlbumData] = useState([]);
  useEffect(() => {
    const albumDisplay = async () => {
      const accessToken = localStorage.getItem("access_token");
      console.log(accessToken);
      if (!accessToken) {
        console.log("no access token found login again please");
      }
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/albums?ids=${albumIds.join(",")}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("cannot fetch data");
        }
        const data = await response.json();
        setAlbumData((prevData) => data);
      } catch (err) {
        console.log(err);
      }
    };
    albumDisplay();
  }, []);

  return (
    <div className="mt-5 grid h-[50%] w-full grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
      <Album albumData={albumData} />
    </div>
  );
}

export default Playlist;
