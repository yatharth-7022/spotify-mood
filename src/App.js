import "./App.css";
import Navbar from "./navbar/Navbar";
import { NavProvider } from "./state managament/NavContext";
import Callback from "./server/Callback";
import LoginButton from "./server/LoginButton";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./ui/Search";
import MainContent from "./Main/MainContent";

function App() {
  return (
    <NavProvider>
      <BrowserRouter>
        <div className="flex h-screen w-screen">
          <div className="h-screen w-[70px] bg-navbar lg:w-[250px]">
            <Navbar />
          </div>

          <div className="relative flex h-screen flex-1 flex-col bg-custom-gradient px-9 py-4">
            <div className="relative flex-1 overflow-y-auto scrollbar-none">
              <Routes>
                <Route path="/" element={<LoginButton />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </NavProvider>
  );
}
export default App;
