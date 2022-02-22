import Editor from "@/components/Editor";
import Sidebar from "@/components/Sidebar";
import { NotesProvider } from "@/context/Notes";

export default function Home() {
  return (
    <div className="h-screen w-screen max-w-screen flex">
      <NotesProvider>
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Editor />
        </div>
      </NotesProvider>
    </div>
  );
}
