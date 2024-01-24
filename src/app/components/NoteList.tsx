"use client";
import Note from "./Note";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { INote } from "../components/Note";

const NoteList = ({ search }: any) => {
  // Initializing useState
  const [allNotes, setAllNotes] = useState<INote[]>([]);

  const filteredNotes = useMemo(
    () =>
      allNotes.filter((note: INote) => {
        return note.title.toLowerCase().includes(search.toLowerCase());
      }),
    [allNotes, search]
  );
  // Getting all tasks
  const getAllTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getAllTasks");
      setAllNotes(response.data);
    } catch (error) {
      console.log("Failed to fetch tasks", error);
    }
  };
  useEffect(() => {
    getAllTasks();
  }, []);

  // Updating task function
  const handleUpdateNote = async (
    id: string,
    title: string,
    description: string,
    taskColor: string
  ) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/updateTask/${id}`,
        {
          title: title,
          description: description,
          taskColor: taskColor,
        }
      );
      console.log("Note updated", response.data);
      return response.data;
    } catch (error) {
      console.log("Failed to update note", error);
    }
  };

  // Deleting task function
  const handleDeleteNote = async (id: string) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:5000/deleteTask/${id}`
      );
      console.log("Note deleted", response.data);
      setAllNotes((allNotes) => allNotes.filter((note: any) => note.id !== id));
      return response.data;
    } catch (error) {
      console.log("Failed to delete note", error);
    }
  };

  // End of back-end function

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid xl:grid-cols-4 xl:min-h-[400px]">
      {filteredNotes.map((note: any, key: any) => {
        return (
          <Note
            key={key}
            id={note._id}
            title={note.title}
            description={note.description}
            isFavorite={note.isFavorite}
            taskColor={note.taskColor}
            handleDeleteNote={handleDeleteNote}
            handleUpdateNote={handleUpdateNote}
          />
        );
      })}
    </div>
  );
};

export default NoteList;
