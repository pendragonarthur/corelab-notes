"use client";
import { BsFilterCircle, BsXLg } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";

interface IHeaderTab {
  handleIsShown: () => void;
  onSearch: (search: string) => void;
}

const Header: React.FC<IHeaderTab> = ({ handleIsShown, onSearch }) => {
  const [title, setSearch] = useState("");

  const handleGetTaskByTitle = async (e: any) => {
    const title = e.target.value;
    setSearch(title);
    onSearch(title);
  };

  return (
    <header className="flex text-sm p-4 items-center  justify-evenly md:justify-start md:gap-8 gap-2 bg-[#9f764e] text-[#fefefe] font-light md:text-lg">
      <h1>CoreNotes</h1>
      <input
        type="text"
        placeholder="   Search task"
        className="rounded-sm md:px-2 md:w-[50%] text-black shadow-md outline-none"
        value={title}
        onChange={handleGetTaskByTitle}
      />
      <div className="flex">
        <button>
          <BsFilterCircle
            onClick={() => {
              handleIsShown();
            }}
          />
        </button>
      </div>
      <div className="md:absolute md:top-3 md:right-2 md:p-2">
        <BsXLg />
      </div>
    </header>
  );
};

export default Header;
