"use client";
import Header from "./components/Header";
import NoteList from "./components/NoteList";
import CreateNote from "./components/CreateNote";
import FilterTab from "./components/FilterTab";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [isShown, setIsShown] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (search: string) => {
    setSearch(search);
  };

  const handleIsShown = () => {
    setIsShown(!isShown);
  };

  return (
    <main className="bg-[#fdf9e3] z-0 scroll-smooth w-screen overflow-x-hidden">
      <div className="fixed z-10 w-full">
        <Header handleIsShown={handleIsShown} onSearch={handleSearch} />
        {isShown && <FilterTab />}
      </div>
      <div className="md:grid md:place-items-center px-4 mb-20">
        <CreateNote />
      </div>
      <div className="flex flex-col gap-4 p-4 h-screen">
        <NoteList search={search} />
      </div>
    </main>
  );
};

export default Home;
