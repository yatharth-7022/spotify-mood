// Layout.js
import React from "react";
import BackForwardButton from "../buttons/backForwardButton";
import SearchBar from "../components/SearchBar";
import User from "../user/User";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex w-full justify-between bg-[#121212] px-4 py-4">
        <BackForwardButton />
        <SearchBar />
        <User />
      </header>

      <main className="flex-1 overflow-y-auto bg-[#181818]">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
