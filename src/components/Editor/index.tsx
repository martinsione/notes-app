import { useNotesContext } from "@/context/Notes";
import type { Note } from "@/types";
import { Plate, ELEMENT_PARAGRAPH } from "@udecode/plate";
import { useState } from "react";
import { editableProps, plugins } from "./config";

export default function Editor() {
  const { activeNoteId, notes, updateNote } = useNotesContext();

  const activeNote: Note | undefined = notes.find((note) => {
    if (activeNoteId === undefined) return undefined;
    return note.id === activeNoteId;
  });

  const handleChange = (value: any) => {
    // @ts-ignore
    updateNote({
      ...activeNote,
      content: JSON.stringify(value),
      updatedAt: Date.now(),
    });
  };

  return (
    <div className="h-full w-full max-w-3xl mx-auto">
      {activeNote ? (
        <>
          <Plate
            editableProps={editableProps}
            onChange={handleChange}
            value={JSON.parse(activeNote.content)}
            plugins={plugins}
          />
        </>
      ) : (
        <div>No active note</div>
      )}
    </div>
  );
}
