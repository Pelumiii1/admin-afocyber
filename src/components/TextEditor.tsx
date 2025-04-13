"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Bold, Italic, List } from "lucide-react";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex gap-2 mb-2 border p-2 rounded">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "font-bold text-blue-600" : ""}
        type="button"
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "italic text-blue-600" : ""}
        type="button"
      >
        <Italic size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "text-blue-600" : ""}
        type="button"
      >
        <List size={16} />
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "text-blue-600" : ""}
        type="button"
      >
        <ListOrdered size={16} />
      </button> */}
    </div>
  );
};

const TextEditor = ({
  content,
  setContent,
}: {
  content: string;
  setContent: (value: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        hardBreak: {
          keepMarks: false,
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "min-h-[200px] outline-none",
      },
    },
    content: content || "<p></p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML()); // Save content as HTML
    },
  });

  // When post data is fetched & content changes (editing existing post)
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div>
      <MenuBar editor={editor} />
      <div className="border rounded-lg p-2 min-h-[200px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;
