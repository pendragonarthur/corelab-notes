"use client";
import {
  BsStar,
  BsStarFill,
  BsTrash3,
  BsPencil,
  BsPalette,
} from "react-icons/bs";
import { useState } from "react";

export interface INote {
  id: string;
  title: string;
  description: string;
  isFavorite: boolean;
  taskColor: string;
  handleDeleteNote: (id: string) => void;
  handleUpdateNote: (
    id: string,
    title: string,
    description: string,
    taskColor: string
  ) => void;
}

const Note = (props: INote) => {
  const [editTitle, setEditTitle] = useState(props.title);
  const [editDescription, setEditDescription] = useState(props.description);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(props.taskColor);
  const [isFavorited, setIsFavorited] = useState(false);

  const colors = ["#ffccd4", "#D2B48C", "#c8e6c9", "#b3e0ff"];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setIsPaletteOpen(false);
  };

  return (
    <div
      style={{ backgroundColor: selectedColor }}
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                props.handleUpdateNote(
                  props.id,
                  editTitle,
                  editDescription,
                  selectedColor
                );
              }
            }}
          />
        </p>
      </div>
      <button
        className="absolute bottom-0 right-0 p-4"
        onClick={() => {
          props.handleDeleteNote(props.id);
        }}
      >
        <BsTrash3 />
      </button>
      <button
        className="absolute top-0 right-0 p-2"
        onClick={() => {
          setIsFavorited(!isFavorited);
        }}
      >
        {props.isFavorite ? <BsStarFill /> : <BsStar />}
      </button>
      <div className="flex absolute bottom-2 left-4 justify-start items-center gap-2 ">
        <button
          className="items-center flex gap-2 border-black hover:border-[#fdf9e3] border-[1px] px-2 rounded-md hover:bg-[#fdf9e3] hover:text-black transition-all duration-300 ease-in-out"
          onClick={() => {
            props.handleUpdateNote(
              props.id,
              editTitle,
              editDescription,
              selectedColor
            );
          }}
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
                key={color}
                className={`w-6 h-6 rounded-full cursor-pointer hover:border-[#fdf9e3] transition-all duration-300 ease-in-out`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Note;
