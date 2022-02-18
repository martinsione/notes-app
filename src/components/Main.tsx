import ReactMarkdown from "react-markdown";
import { ChangeEvent } from "react";
import { useNotesContext } from "@/context/Notes";
import "github-markdown-css/github-markdown.css";

export default function Main() {
  const { activeNoteId, notes, updateNote } = useNotesContext();
  type event = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

  const activeNote = notes.find((note) => note.id === activeNoteId);

  const handleChange = (e: event) => {
    updateNote({
      ...activeNote,
      [e.target.name]: e.target.value,
      lastModified: Date.now(),
    });
  };

  return (
    <>
      {activeNote ? (
        <div className="w-full flex p-10 gap-5">
          <div className="w-full flex flex-col">
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
          <div className="w-full preview markdown-body">
            <h1>{activeNote.title || "Untitled"}</h1>
            <ReactMarkdown>{activeNote.content}</ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-5xl text-slate-400">No Active Note</p>
        </div>
      )}
    </>
  );
}
