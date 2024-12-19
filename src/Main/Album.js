function Album({ albumData }) {
  console.log(albumData);
  return (
    <>
      {albumData.albums?.map((album) => (
        <div key={album.id} className="flex h-[90%] w-full flex-col gap-4">
          <div className="aspect-square w-full">
            <img
              className="h-full w-full object-cover sm:hidden md:hidden lg:block"
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
          <div className="flex flex-col gap-1">
            <div className="overflow-hidden truncate whitespace-nowrap text-white">
              {album.name}
            </div>
            <span className="text-sm text-[#B3B3B3]">
              {album.artists[0].name}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

export default Album;
