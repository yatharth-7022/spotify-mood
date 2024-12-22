function Album({ albumData, loading }) {
  console.log(albumData);
  return (
    <>
      {albumData.albums?.map((album) => (
        <div
          key={album.id}
          className="flex h-fit flex-col bg-[#181818] pb-3 sm:gap-1 md:gap-2"
        >
          {loading ? (
            <div className="h-[10rem] w-[10rem] text-white">Loading....</div>
          ) : (
            <>
              <div className="aspect-square transform cursor-pointer transition-transform duration-300 hover:scale-105 lg:scale-75">
                <img
                  className="h-full w-full rounded-xl object-cover sm:hidden md:hidden lg:block"
                  src={album.images[0].url}
                  alt=""
                />
                <img
                  className="h-full w-full object-cover sm:hidden md:block lg:hidden"
                  src={album.images[1].url}
                  alt=""
                />
                <img
                  className="h-full w-full object-cover sm:block md:hidden lg:hidden"
                  src={album.images[2].url}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-1 lg:px-6">
                <div className="overflow-hidden truncate whitespace-nowrap text-white">
                  {album.name}
                </div>
                <span className="text-sm text-[#B3B3B3]">
                  {album.artists[0].name}
                </span>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default Album;
