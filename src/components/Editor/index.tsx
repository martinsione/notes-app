import { useNotesContext } from "@/context/Notes";
import { Plate } from "@udecode/plate";
import "tippy.js/dist/tippy.css";
import { editableProps, plugins } from "./config";
import { MarkBallonToolbar } from "./config/components";

export default function Editor() {
  const { activeNoteId, notes, updateNote } = useNotesContext();

  const activeNote = notes.find((note) => {
    if (activeNoteId === undefined) return undefined;
    return note.id === activeNoteId;
  });

  const handleChange = (content: any[]) => {
    // @ts-ignore
    updateNote({ ...activeNote, content, updatedAt: Date.now() });
  };

  return (
    <div className="flex flex-col h-full w-full max-w-3xl mx-auto">
      {activeNote ? (
        <Plate
          id={activeNote.id}
          editableProps={editableProps}
          onChange={handleChange}
          value={activeNote.content}
          plugins={plugins}
        >
          <MarkBallonToolbar />
        </Plate>
      ) : (
        <p className="text-4xl m-auto">No active note</p>
      )}
    </div>
  );
}
