import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import type { Note } from "@/types";

interface Props {
  activeNoteId: string | undefined;
  notes: Note[];
  [x: string]: any;
}

const initialValue = {
  activeNoteId: undefined,
  notes: [],
};

const NotesContext = createContext<Props>(initialValue);

export const useNotesContext = () => useContext(NotesContext);

export const NotesProvider: React.FC = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>(initialValue.notes);
  const [activeNoteId, setActiveNoteId] = useState<string | undefined>(
    initialValue.activeNoteId
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("activeNote", JSON.stringify(activeNoteId));
  }, [activeNoteId]);

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
    const index = notes.findIndex((note) => note.id === updatedNote.id);
    const updatedNotes = [...notes];
    updatedNotes[index] = updatedNote;
    setNotes(updatedNotes);
  };

  const value = {
    activeNoteId,
    notes,
    addNote,
    deleteNote,
    setActiveNoteId,
    updateNote,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
