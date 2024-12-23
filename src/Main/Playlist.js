import { useEffect, useState } from "react";
import Album from "./Album";
import { useNavContext } from "../state managament/NavContext";

function Playlist() {
  const { albumData, isLoading } = useNavContext();

  return (
    <div className="mt-5 grid h-[50%] w-full grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
      <Album albumData={albumData} loading={isLoading} />
    </div>
  );
}

export default Playlist;
