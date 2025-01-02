const availableGenres = [
  { title: "Pop", coverArt: "/assets/Pop.png" },
  { title: "Hip-Hop", coverArt: "/assets/Group 11.png" },
  { title: "Indie", coverArt: "/assets/indie.png" },
  { title: "Rock", coverArt: "/assets/red.png" },
  { title: "R&B", coverArt: "/assets/blue.png" },
  { title: "Hardstyle", coverArt: "/assets/yellow.png" },
];
function Genres() {
  return (
    <div className="grid h-[50%] w-full grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {availableGenres.map((genre, index) => (
        <div
          key={index}
          className="translate relative cursor-pointer transition duration-300 hover:scale-90"
        >
          <img src={genre.coverArt} alt="" className="object-cover" />

          <div className="absolute left-4 top-5 text-4xl font-semibold text-white">
            <span>{genre.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Genres;
