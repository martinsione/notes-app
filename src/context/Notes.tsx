import type { Note } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

type ActiveNoteId = string | null;

interface Props {
  activeNoteId: ActiveNoteId;
  notes: Note[];
  setActiveNoteId: (id: string) => void;
  addNote: () => void;
  deleteNote: (id: string) => void;
  updateNote: (updatedNote: Note) => void;
}

const initialState = {
  activeNoteId: null,
  notes: [],
  setActiveNoteId: () => {},
  addNote: () => {},
  deleteNote: () => {},
  updateNote: () => {},
};

const NotesContext = createContext<Props>(initialState);

export const useNotesContext = () => useContext(NotesContext);

export const NotesProvider: React.FC = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<ActiveNoteId>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setNotes(JSON.parse(localStorage.getItem("notes") || "[]"));
      setActiveNoteId(localStorage.getItem("activeNoteId") || null);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("activeNoteId", activeNoteId!);
  }, [activeNoteId]);

  const addNote = () => {
    const newNote: Note = {
      id: uuid(),
      content: [{ type: "title", children: [{ text: "" }] }],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setNotes([...notes, newNote]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = (updatedNote: Note) => {
    const index = notes.findIndex((note) => note.id === updatedNote.id);
    const updatedNotes = [...notes];
    updatedNotes[index] = updatedNote;
    setNotes(updatedNotes);
  };

  const value = {
    activeNoteId,
    notes,
    setActiveNoteId,
    addNote,
    deleteNote,
    updateNote,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
