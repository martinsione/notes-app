import { useNotesContext } from "@/context/Notes";
import type { Note } from "@/types";
import { Plate } from "@udecode/plate";
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
    <div className="flex flex-col h-full w-full max-w-3xl mx-auto">
      {activeNote ? (
        <Plate
          id={activeNote.id}
          editableProps={editableProps}
          onChange={handleChange}
          value={JSON.parse(activeNote.content)}
          plugins={plugins}
        />
      ) : (
        <p className="text-4xl m-auto">No active note</p>
      )}
    </div>
  );
}
