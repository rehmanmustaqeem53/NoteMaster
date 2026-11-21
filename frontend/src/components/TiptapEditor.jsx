
import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
} from "lucide-react";

export default function TiptapEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: value || "",

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class:
          "min-h-[300px] p-5 outline-none prose dark:prose-invert max-w-none",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", {
        emitUpdate: false,
      });
    }
  }, [value, editor]);

  if (!editor) return null;

  const buttons = [
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
      title: "Bold",
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
      title: "Italic",
    },
    {
      icon: UnderlineIcon,
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
      title: "Underline",
    },
    {
      icon: Heading1,
      action: () =>
        editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editor.isActive("heading", { level: 1 }),
      title: "Heading 1",
    },
    {
      icon: Heading2,
      action: () =>
        editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
      title: "Heading 2",
    },
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
      title: "Bullet List",
    },
    {
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
      title: "Numbered List",
    },
    {
      icon: AlignLeft,
      action: () =>
        editor.chain().focus().setTextAlign("left").run(),
      active: editor.isActive({ textAlign: "left" }),
      title: "Align Left",
    },
    {
      icon: AlignCenter,
      action: () =>
        editor.chain().focus().setTextAlign("center").run(),
      active: editor.isActive({ textAlign: "center" }),
      title: "Align Center",
    },
    {
      icon: AlignRight,
      action: () =>
        editor.chain().focus().setTextAlign("right").run(),
      active: editor.isActive({ textAlign: "right" }),
      title: "Align Right",
    },
  ];

  return (
    <div className="border border-slate-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900">

      <div className="flex flex-wrap items-center gap-1 p-3 border-b border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800">

        {buttons.map((button, index) => {
          const Icon = button.icon;

          return (
            <button
              key={index}
              type="button"
              title={button.title}
              onClick={button.action}
              className={`p-2 rounded-lg transition ${
                button.active
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700"
              }`}
            >
              <Icon size={17} />
            </button>
          );
        })}

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        <button
          type="button"
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 text-gray-500 hover:bg-slate-200 dark:hover:bg-gray-700 rounded-lg"
        >
          <Undo size={17} />
        </button>

        <button
          type="button"
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 text-gray-500 hover:bg-slate-200 dark:hover:bg-gray-700 rounded-lg"
        >
          <Redo size={17} />
        </button>

      </div>

      <EditorContent editor={editor} />

    </div>
  );
}
