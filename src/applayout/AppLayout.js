import Navbar from "../navbar/Navbar";
import Header from "../Main/Header";
import Greeting from "../ui/Greeting";
import AddedPlaylist from "../Main/AddedPlaylist";
import PlayListHeading from "../ui/PlayListHeading";
import Playlist from "../Main/Playlist";
import { useNavContext } from "../state managament/NavContext";
import Search from "../ui/Search";
function AppLayout() {
  const { isActive, handleIsActive } = useNavContext();
  return (
    <div className="flex h-screen w-screen">
      <div className="h-screen w-[70px] bg-navbar lg:w-[250px]">
        <Navbar />
      </div>
      <div className="flex h-screen flex-1 flex-col bg-custom-gradient px-9 pb-5">
        <Header />
        {isActive === 2 ? (
          <Search />
        ) : (
          <div className="flex-1 overflow-y-auto scrollbar-none">
            <Greeting />
            <AddedPlaylist />
            <PlayListHeading />
            <Playlist />
          </div>
        )}
      </div>
    </div>
  );
}

export default AppLayout;
