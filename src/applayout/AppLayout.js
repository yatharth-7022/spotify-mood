import Navbar from "../navbar/Navbar";
import Header from "../Main/Header";
import Greeting from "../ui/Greeting";
import AddedPlaylist from "../Main/AddedPlaylist";
import PlayListHeading from "../ui/PlayListHeading";
import Playlist from "../Main/Playlist";
function AppLayout() {
  return (
    <div className="flex h-screen w-screen">
      <div className="h-screen w-[70px] bg-navbar lg:w-[250px]">
        <Navbar />
      </div>
      <div className="flex h-screen flex-1 flex-col bg-custom-gradient px-9 pb-5">
        <Header />
        <div className="flex-1 overflow-y-auto scrollbar-none">
          <Greeting />
          <AddedPlaylist />
          <PlayListHeading />
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
