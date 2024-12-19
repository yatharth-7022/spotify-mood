function AddedPlaylist() {
  return (
    <div className="mt-5 h-[30%] w-full">
      <div className="flex h-14 w-[25%] flex-row items-center gap-3 rounded-sm bg-[#303030] transition-colors duration-300 hover:bg-[#505050]">
        <div className="h-full object-contain">
          <img src="./assets/heart.png" className="h-full w-auto" alt="heart" />
        </div>
        <div className="text-sm font-semibold text-white">
          <span>Liked Songs</span>
        </div>
      </div>
    </div>
  );
}

export default AddedPlaylist;
