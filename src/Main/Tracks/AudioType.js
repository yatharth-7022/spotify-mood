const audioTypes = [
  { title: "Podcasts", cover: "/assets/podcast.png" },
  { title: "Made For You", cover: "/assets/madeforyou.png" },
  { title: "Charts", cover: "/assets/charts.png" },
  { title: "New Releases", cover: "/assets/newreleases.png" },
  { title: "Discover", cover: "/assets/discover.png" },
  { title: "Concerts", cover: "/assets/concerts.png" },
];
function AudioType() {
  return (
    <div className="grid h-[70%] w-full gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:gap-0">
      {audioTypes.map((type, index) => (
        <div
          key={index}
          className="translate relative h-[50%] cursor-pointer transition duration-300 hover:scale-90"
        >
          <img src={type.cover} alt="" />
          <div className="absolute left-4 top-5 text-xl font-semibold text-white">
            <span>{type.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AudioType;
