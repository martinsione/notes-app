import { useNotesContext } from "@/context/Notes";
import { PlusIcon, TrashIcon } from "@heroicons/react/outline";
import Resize from "./Resize";

export default function Sidebar() {
  const { activeNoteId, addNote, deleteNote, notes, setActiveNoteId } =
    useNotesContext();

  return (
    <Resize minWidth={200} maxWidth={500}>
      <div className="w-full flex-col overflow-y-auto">
        <div className="flex justify-between items-center p-5">
          <p className="text-4xl font-bold">Notes</p>
          <button className="w-8 text-black" onClick={addNote}>
            <PlusIcon />
          </button>
        </div>
        <div className="flex flex-col">
          {notes.map((note) => (
            <div
              className={`cursor-pointer transition hover:bg-slate-200 px-5 py-1 ${
                note.id === activeNoteId && "font-semibold bg-slate-200"
              }`}
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
            >
              <div className="flex justify-between items-center gap-4">
                <p className="w-full text-ellipsis whitespace-nowrap overflow-hidden">
                  {note.content[0].children[0].text || "Untitled"}
                </p>
                <button className="w-5" onClick={() => deleteNote(note.id)}>
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Resize>
  );
}
