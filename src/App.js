import "./App.css";
import Navbar from "./Main/navbar/Navbar";
import { NavProvider } from "./state managament/NavContext";
import Callback from "./server/Callback";
import LoginButton from "./server/LoginButton";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./Main/Search/Search";
import MainContent from "./Main/Applayout/MainContent";
import AlbumDetails from "./Main/albums/AlbumDetails";
import PlaylistDetails from "./Main/playlist/PlaylistDetails";
import ArtistDetails from "./Main/artist/ArtistDetails";
import ShowMoreAlbums from "./Main/albums/ShowMoreAlbums";
import PersistentHeader from "./Main/Header/PersistentHeaer";

const App = () => {
  return (
    <NavProvider>
      <BrowserRouter>
        <div className="flex h-screen w-screen flex-col">
          <div className="flex-none">
            <PersistentHeader />
          </div>

          <div className="flex flex-1 gap-2 overflow-hidden">
            <div>
              <Navbar />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto rounded-xl bg-custom-gradient">
              <Routes>
                <Route path="/" element={<LoginButton />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/search" element={<Search />} />
                <Route path="/album/:albumId" element={<AlbumDetails />} />
                <Route
                  path="/playlist/:playlistId"
                  element={<PlaylistDetails />}
                />
                <Route path="/artist/:artistId" element={<ArtistDetails />} />
                <Route
                  path="/artist/album/:artistId"
                  element={<ShowMoreAlbums />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </NavProvider>
  );
};

export default App;
