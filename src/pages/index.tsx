import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";

export default function Home() {
  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <Main />
    </div>
  );
}
