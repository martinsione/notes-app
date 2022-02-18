import "github-markdown-css/github-markdown.css";
import { ChangeEvent } from "react";
import { useNotesContext } from "@/context/Notes";
import { Note } from "@/types";
import ReactMarkdown from "react-markdown";

export default function Main() {
  const { activeNoteId, notes, updateNote } = useNotesContext();
  type event = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

  const activeNote: Note | undefined = notes.find((note) => {
    if (activeNoteId === undefined) return undefined;
    return note.id === activeNoteId;
  });

  const handleChange = (e: event) => {
    updateNote({
      ...activeNote,
      [e.target.name]: e.target.value,
      updatedAt: Date.now(),
    });
  };

  return (
    <>
      {activeNote ? (
        <div className="flex p-10 gap-5">
          <div className="flex flex-col">
            <input
              autoFocus
              className="text-4xl focus:outline-none mb-6"
              name="title"
              onChange={(e) => handleChange(e)}
              placeholder="Untitled"
              value={activeNote.title}
            />
            <textarea
              className="h-full resize-none focus:outline-none"
              name="content"
              onChange={(e) => handleChange(e)}
              placeholder="Write your note here..."
              value={activeNote.content}
            />
          </div>
          <div className="flex flex-col preview markdown-body">
            <h1>{activeNote.title || "Untitled"}</h1>
            <ReactMarkdown>{activeNote.content}</ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="m-auto">
          <p className="text-5xl text-slate-400">No Active Note</p>
        </div>
      )}
    </>
  );
}
