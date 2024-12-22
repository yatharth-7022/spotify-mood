import "./App.css";
import AppLayout from "./applayout/AppLayout";
import { NavProvider } from "./state managament/NavContext";
import Callback from "./server/Callback";
import LoginButton from "./server/LoginButton";
import { Router, BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./ui/Search";
function App() {
  return (
    <NavProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginButton />} />
          <Route path="/Callback" element={<Callback />}></Route>
          <Route path="/Search" element={<Search />}></Route>
        </Routes>
      </BrowserRouter>
    </NavProvider>
  );
}

export default App;
