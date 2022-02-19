import Sidebar from "@/components/Sidebar";
import Editor from "@/components/Editor";

export default function Home() {
  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <Editor />
    </div>
  );
}
