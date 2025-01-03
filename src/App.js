import "./App.css";
import Navbar from "./Main/navbar/Navbar";
import { NavProvider } from "./state managament/NavContext";
import Callback from "./server/Callback";
import LoginButton from "./server/LoginButton";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Search from "./Main/Search/Search";
import AlbumDetails from "./Main/albums/AlbumDetails";
import PlaylistDetails from "./Main/playlist/PlaylistDetails";
import ArtistDetails from "./Main/artist/ArtistDetails";
import ShowMoreAlbums from "./Main/albums/ShowMoreAlbums";
import PersistentHeader from "./Main/Header/PersistentHeaer";
import SearchResults from "./Main/Search/SearchResults";
import { Home } from "lucide-react";
import MainContent from "./Main/Applayout/MainContent";

const App = () => {
  return (
    <NavProvider>
      <BrowserRouter>
        <div className="flex h-screen w-screen flex-col overflow-y-scroll scrollbar-none">
          <div className="flex-none">
            <PersistentHeader />
          </div>

          <div className="flex flex-1 gap-2 overflow-scroll scrollbar-none">
            <div>
              <Navbar />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-scroll rounded-xl bg-custom-gradient scrollbar-none">
              <Routes>
                <Route path="/" element={<LoginButton />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/home" element={<MainContent />} />
                <Route path="/search" element={<Search />} />
                <Route path="/search/:query" element={<SearchResults />} />
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
