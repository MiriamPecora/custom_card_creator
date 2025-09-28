import EditorComponent from "./components/editorComponent";
import CharacterForm from "./components/characterForm";

export default function Home() {
  return (
    <>
      <div className=" crt crt-chroma-shift flex shadow-[10px_10px_1px_var(--primary-text)]/60 bg-radial from-[var(--secondary)]/80 to-[var(--background)] pt-20 pb-10 flex-col md:flex-row w-full justify-between">
        <EditorComponent />
        <CharacterForm />
      </div>
    </>
  );
}
