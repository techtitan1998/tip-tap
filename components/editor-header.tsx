import React from "react";
import { Bold, Code, Heading1, Heading2, Highlighter, Italic, List, ListOrdered, ListTodo, Minus, Pilcrow, Redo, RemoveFormatting, SquareDashedBottomCode, Strikethrough, TextQuote, Undo, WrapText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/core";

interface Props {
  editor: Editor;
}
const EditorHeader = ({ editor }: Props) => {
  return (
    <div className="editor__header rounded-md">
      <span className={cn("menu-item cursor-pointer", editor.isActive("bold") ? "is-active" : "")} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
        <Bold color="white" height={20} width={20} />
      </span>
      <span className={cn("menu-item cursor-pointer", editor.isActive("italic") ? "is-active" : "")} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
        <Italic color="white" height={20} width={20} />
      </span>
      <span className={cn("menu-item cursor-pointer", editor.isActive("strike") ? "is-active" : "")} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strike">
        <Strikethrough color="white" height={20} width={20} />
      </span>
      <span className={cn("menu-item cursor-pointer", editor.isActive("code") ? "is-active" : "")} onClick={() => editor.chain().focus().toggleCode().run()} title="Code">
        <Code color="white" height={20} width={20} />
      </span>
      <span className={cn("menu-item cursor-pointer", editor.isActive("highlight") ? "is-active" : "")} onClick={() => editor.chain().focus().toggleHighlight().run()} title="Highlight">
        <Highlighter color="white" height={20} width={20} />
      </span>
      <div className="divider"></div>
      <span className={cn("menu-item cursor-pointer", editor.isActive("heading", { level: 1 }) ? "is-active" : "")} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="Heading 1">
        <Heading1 color="white" height={20} width={20} />
      </span>
      <span className={cn("menu-item cursor-pointer", editor.isActive("heading", { level: 2 }) ? "is-active" : "")} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">
        <Heading2 color="white" height={20} width={20} />
      </span>
      <span className="menu-item cursor-pointer is-active" title="Paragraph">
        <Pilcrow color="white" height={20} width={20} />
      </span>
      <span className={cn("menu-item cursor-pointer", editor.isActive("bulletList") ? "is-active" : "")} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List">
        <List color="white" height={20} width={20} />
      </span>
      <span className={cn("menu-item cursor-pointer", editor.isActive("orderedList") ? "is-active" : "")} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Ordered List">
        <ListOrdered color="white" height={20} width={20} />
      </span>
      <span className={cn("menu-item cursor-pointer", editor.isActive("taskItem") ? "is-active" : "")} onClick={() => editor.chain().focus().toggleTaskList().run()} title="Task List">
        <ListTodo color="white" height={20} width={20} />
      </span>
      <span className={cn("menu-item cursor-pointer", editor.isActive("codeBlock") ? "is-active" : "")} onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="Code Block">
        <SquareDashedBottomCode color="white" height={20} width={20} />
      </span>
      <div className="divider"></div>
      <span className={cn("menu-item cursor-pointer", editor.isActive("blockquote") ? "is-active" : "")} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote">
        <TextQuote color="white" height={20} width={20} />
      </span>
      <span className={cn("menu-item cursor-pointer")} onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
        <Minus color="white" height={20} width={20} />
      </span>
      <div className="divider"></div>
      <span className={cn("menu-item cursor-pointer")} onClick={() => editor.chain().focus().setHardBreak().run()} title="Hard Break">
        <WrapText color="white" height={20} width={20} />
      </span>
      <span className={cn("menu-item cursor-pointer")} title="Clear Format" onClick={() => editor.commands.clearNodes()}>
        <RemoveFormatting color="white" height={20} width={20} />
      </span>
      <div className="divider"></div>
      <span className={cn("menu-item cursor-pointer")} title="Undo" onClick={() => editor.commands.undo()}>
        <Undo color="white" height={20} width={20} />
      </span>
      <span className={cn("menu-item cursor-pointer")} title="Redo" onClick={() => editor.commands.redo()}>
        <Redo color="white" height={20} width={20} />
      </span>
    </div>
  );
};

export default EditorHeader;
