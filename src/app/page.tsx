"use client";
import Header from "./components/Header";
import NoteList from "./components/NoteList";
import CreateNote from "./components/CreateNote";
import FilterTab from "./components/FilterTab";
import axios from "axios";
import { useState, useEffect } from "react";
import { INote } from "./components/Note";

const Home = () => {
  // Initializing useState
  const [isShown, setIsShown] = useState(false);
  const [search, setSearch] = useState("");
  const [allNotes, setAllNotes] = useState<INote[]>([]);

  const filteredNotes = allNotes.filter((note: INote) => {
    return note.title.toLowerCase().includes(search.toLowerCase());
  });

  // Getting all tasks
  const getAllNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getAllNotes");
      setAllNotes(response.data);
    } catch (error) {
      console.log("Failed to fetch tasks", error);
    }
  };
  useEffect(() => {
    getAllNotes();
  }, []);

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
        <CreateNote onUpdate={getAllNotes} />
      </div>
      <div className="flex flex-col gap-4 p-4 h-screen">
        <NoteList filteredNotes={filteredNotes} onUpdate={getAllNotes} />
      </div>
    </main>
  );
};

export default Home;
