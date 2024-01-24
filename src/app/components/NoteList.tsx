"use client";
import { Note2 } from "./Note2";
import { INote } from "./Note";

const NoteList = ({
  filteredNotes,
  onUpdate,
}: {
  filteredNotes: Array<INote>;
  onUpdate: () => void;
}) => {
  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid xl:grid-cols-4 xl:min-h-[400px]">
      {filteredNotes.map((note: any) => (
        <Note2 key={note._id} note={note} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default NoteList;
