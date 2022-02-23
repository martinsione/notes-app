import EditorContainer from "@/components/Editor";
import Sidebar from "@/components/Sidebar";
import { NotesProvider } from "@/context/Notes";

export default function Home() {
  return (
    <div className="h-screen w-screen max-w-screen flex">
      <NotesProvider>
        <Sidebar />
        <EditorContainer />
      </NotesProvider>
    </div>
  );
}
