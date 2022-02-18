import "../styles/globals.css";
import { NotesProvider } from "@/context/Notes";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotesProvider>
      <Component {...pageProps} />
    </NotesProvider>
  );
}
