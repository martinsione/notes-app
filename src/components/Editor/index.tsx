import { useNotesContext } from "@/context/Notes";
import { Descendant } from "slate";
import Editor from "./Editor";

export default function EditorContainer() {
  const { activeNoteId, notes, updateNote } = useNotesContext();

  const activeNote = notes.find((note) => {
    if (activeNoteId === undefined) return undefined;
    return note.id === activeNoteId;
  });

  const handleChange = (value: Descendant[]) => {
    updateNote({
      id: activeNote!.id,
      content: value,
      updatedAt: Date.now(),
      createdAt: activeNote!.createdAt,
    });
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col h-full w-full max-w-3xl mx-auto">
        {activeNote ? (
          <Editor
            id={activeNote.id}
            initialValue={activeNote.content}
            onChange={handleChange}
          />
        ) : (
          <p className="text-4xl m-auto">No active note</p>
        )}
      </div>
    </div>
  );
}
