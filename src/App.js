import "./App.css";
import AppLayout from "./applayout/AppLayout";
import Callback from "./server/Callback";
import LoginButton from "./server/LoginButton";
import { Router, BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginButton />} />
        <Route path="/Callback" element={<Callback />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
