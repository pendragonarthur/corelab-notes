"use client";
import { useState } from "react";
import { INote } from "./Note";
import {
  BsPalette,
  BsPencil,
  BsStar,
  BsStarFill,
  BsTrash3,
} from "react-icons/bs";
import axios from "axios";

export const Note2 = ({
  note,
  onUpdate,
}: {
  note: INote;
  onUpdate: () => void;
}) => {
  const [editTitle, setEditTitle] = useState(note.title);
  const [editDescription, setEditDescription] = useState(note.description);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const colors = ["#ffccd4", "#D2B48C", "#c8e6c9", "#b3e0ff"];

  const handleEditNote = async () => {
    await axios.patch(`http://localhost:5000/updateTask/${note._id}`, {
      ...note,
      title: editTitle,
      description: editDescription,
    });
    onUpdate();
  };

  const handleChangeColor = async (selectedColor: string) => {
    await axios.patch(`http://localhost:5000/updateTask/${note._id}`, {
      ...note,
      taskColor: selectedColor,
    });
    setIsPaletteOpen(false);
    onUpdate();
  };

  const handleToggleFavorite = async () => {
    console.log(note);
    await axios.patch(`http://localhost:5000/updateTask/${note._id}`, {
      ...note,
      isFavorite: !note.isFavorite,
    });
    onUpdate();
  };

  const handleDeleteNote = async () => {
    await axios.delete(`http://localhost:5000/deleteTask/${note._id}`);
    onUpdate();
  };

  return (
    <div
      style={{ backgroundColor: note.taskColor }}
      className=" text-black relative md:min-h-[400px] rounded-2xl h-[400px] p-2 shadow-md shadow-[#212121]"
    >
      <h2 className="font-bold">
        <input
          type="text"
          className="bg-transparent outline-none"
          value={editTitle}
          onChange={(e) => {
            setEditTitle(e.target.value);
          }}
        />
      </h2>
      <span className="w-full flex border-[1px] border-white"></span>
      <div className="py-2">
        <p>
          <input
            type="text"
            className="bg-transparent outline-none"
            value={editDescription}
            onChange={(e) => {
              setEditDescription(e.target.value);
            }}
          />
        </p>
      </div>
      <button
        className="absolute bottom-0 right-0 p-4"
        onClick={handleDeleteNote}
      >
        <BsTrash3 />
      </button>
      <button
        onClick={handleToggleFavorite}
        className="absolute top-0 right-0 p-2"
      >
        {note.isFavorite ? <BsStarFill /> : <BsStar />}
      </button>
      <div className="flex absolute bottom-2 left-4 justify-start items-center gap-2 ">
        <button
          className="items-center flex gap-2 border-black hover:border-[#fdf9e3] border-[1px] px-2 rounded-md hover:bg-[#fdf9e3] hover:text-black transition-all duration-300 ease-in-out"
          onClick={handleEditNote}
        >
          <BsPencil /> Save edits
        </button>
        <button
          onClick={() => {
            setIsPaletteOpen(!isPaletteOpen);
          }}
        >
          <BsPalette />
        </button>
        {isPaletteOpen && (
          <div className="absolute bottom-[-60px] bg-[#fdf9e3] z-50 bg- left-0 flex gap-2 border-[1px] p-4 border-[#b6b3a2] rounded-md">
            {colors.map((color) => (
              <div
                onClick={() => handleChangeColor(color)}
                key={color}
                className={`w-6 h-6 rounded-full cursor-pointer hover:border-[#fdf9e3] transition-all duration-300 ease-in-out`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
