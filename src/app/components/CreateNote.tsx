"use client";
import {
  BsStar,
  BsPalette,
  BsStarFill,
  BsBoxArrowUpLeft,
} from "react-icons/bs";
import { useState } from "react";
import { INote } from "./Note";
import axios from "axios";

const CreateNote = ({ onUpdate }: { onUpdate: () => void }) => {
  // Initializing useState
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const handleChangeDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const colors = ["#ffccd4", "#D2B48C", "#c8e6c9", "#b3e0ff"];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setIsPaletteOpen(false);
  };

  // Consuming back-end
  const handleCreateNote = async () => {
    if (!title || !description) {
      return alert("Failed to create note. Description and title are required");
    }
    await axios.post("http://localhost:5000/postTask", {
      title: title,
      description: description,
      isFavorite: isFavorited,
      taskColor: selectedColor,
    });
    onUpdate();
    setTitle("");
    setDescription("");
    setSelectedColor("");
    setIsFavorited(false);
  };
  // End of back-end function

  return (
    <div
      style={{ backgroundColor: selectedColor }}
      className="text-black relative rounded-xl p-2 top-[80px] md:h-[150px] md:w-1/2  w-full border-[#D2B48C] border-[2px]"
    >
      <h2 className="pl-2">
        <input
          type="text"
          className="font-bold  placeholder-black bg-transparent outline-none"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Title"
          value={title}
        />
      </h2>
      <span className="w-full flex border-[1px] border-white my-2"></span>
      <button
        className="absolute top-0 right-0 p-2 m-2 "
        onClick={() => {
          setIsFavorited(!isFavorited);
        }}
      >
        {isFavorited ? <BsStarFill /> : <BsStar />}
      </button>
      <textarea
        cols={80}
        rows={5}
        maxLength={150}
        className="bg-transparent py-2 pl-2 outline-none"
        placeholder="Type to add a note"
        value={description}
        onChange={handleChangeDescription}
      ></textarea>
      <div>
        <button
          className="absolute bottom-0 right-0 p-2 m-2 "
          onClick={handleCreateNote}
        >
          <BsBoxArrowUpLeft />
        </button>
      </div>
      <button
        className="absolute bottom-0 left-0 p-2 m-2 "
        onClick={() => {
          setIsPaletteOpen(!isPaletteOpen);
        }}
      >
        <BsPalette />
      </button>
      {isPaletteOpen && (
        <div className="absolute bottom-[-50px] bg-[#fdf9e3] z-30 left-0 flex gap-2 border-[1px] p-4 border-[#b6b3a2] rounded-md">
          {colors.map((color) => (
            <div
              key={color}
              className={`w-6 h-6 rounded-full cursor-pointer hover:border-[#fdf9e3] transition-all duration-300 ease-in-out`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateNote;
