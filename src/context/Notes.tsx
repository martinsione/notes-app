import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import type { Note } from "@/types";

interface Props {
  activeNote: Note | undefined;
  notes: Note[];
  [x: string]: any;
}

const initialValue = {
  activeNote: undefined,
  notes: [],
};

const NotesContext = createContext<Props>(initialValue);

export const useNotesContext = () => useContext(NotesContext);

export const NotesProvider: React.FC = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>(initialValue.notes);
  const [activeNote, setActiveNote] = useState(initialValue.activeNote);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("activeNote", JSON.stringify(activeNote));
  }, [activeNote]);

  const addNote = () => {
    const newNote: Note = {
      id: uuid(),
      title: "",
      content: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = (updatedNote: Note) => {
    console.log(notes);
    // console.log(updatedNote);
    const index = notes.findIndex((note) => note.id === updatedNote.id);
    const updatedNotes = [...notes];
    updatedNotes[index] = updatedNote;
    setNotes(updatedNotes);
    // const updatedNotes = notes.map((note) => {
    //   return note.id === updatedNote.id ? updatedNote : note;
    // });

    // setNotes(updatedNotes);
  };

  const value = {
    activeNote,
    notes,
    addNote,
    deleteNote,
    setActiveNote,
    updateNote,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
