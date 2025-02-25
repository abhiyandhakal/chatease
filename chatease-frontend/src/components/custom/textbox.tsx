import { Dispatch, SetStateAction } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Textbox({
  handleSubmit,
  input,
  setInput,
}: {
  handleSubmit: () => void;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
}) {
  const extensions = [StarterKit];

  const editor = useEditor({
    extensions,
    content: "",
    editorProps: {
      handleDOMEvents: {
        keydown: function (_, event) {
          const text = editor?.getText().trim();
          if (text) setInput(text);
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Stop new block creation

            if (text) {
              if (text.trim() === "") {
                return;
              }
              handleSubmit();
              editor?.commands.clearContent(true); // Clear input properly
            }

            return true;
          }
          return false;
        },
      },
    },
  });

  return (
    <div className="w-full mt-2 flex gap-2">
      <EditorContent
        editor={editor}
        className="bg-slate-400 text-black p-2 rounded w-full"
      />
      <button
        className="text-black bg-cyan-400 w-fit px-4 rounded"
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  );
}
