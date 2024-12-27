import "./App.css";
import Navbar from "./navbar/Navbar";
import { NavProvider } from "./state managament/NavContext";
import Callback from "./server/Callback";
import LoginButton from "./server/LoginButton";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./ui/Search";
import MainContent from "./Main/MainContent";
import AlbumDetails from "./Main/AlbumDetails";
import PlaylistDetails from "./Main/playlist/PlaylistDetails";
import ArtistDetails from "./Main/artist/ArtistDetails";

function App() {
  return (
    <NavProvider>
      <BrowserRouter>
        <div className="flex h-screen w-screen">
          <div>
            <Navbar />
          </div>

          <div className="relative flex h-screen flex-1 flex-col bg-custom-gradient">
            <div className="relative flex-1 overflow-y-auto scrollbar-none">
              <Routes>
                <Route path="/" element={<LoginButton />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/search" element={<Search />} />
                <Route
                  path="/album/:albumId"
                  element={<AlbumDetails />}
                ></Route>
                <Route
                  path="/playlist/:playlistId"
                  element={<PlaylistDetails />}
                ></Route>
                <Route
                  path="/artist/:artistId"
                  element={<ArtistDetails />}
                ></Route>
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </NavProvider>
  );
}
export default App;
