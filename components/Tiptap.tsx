"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { DropdownNodeViewExtension } from "./extensions/dropdownExtension";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { Markdown } from "tiptap-markdown";
import { InputNodeViewExtension } from "./extensions/inputExtension";
import DragAndDrop from "./extensions/drag-and-drop";
import EditorHeader from "./editor-header";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import HardBreak from "@tiptap/extension-hard-break";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import CustomNode from "./extensions/CustomNode";
import clauseNode from "./extensions/clauseNode";
import agreementNode from "./extensions/agreementNode";
import SlashCommand from "./extensions/slash-command";

const content = `
<wc-agreement>

## **Preliminary Job Offer for Employment - Advanced**

*Welcome to [Company Name] Portal!*

Dear [Recipient's Name] (Candidate),

We are pleased to extend a preliminary job offer for employment with <wc-dropdown options="ACME Corp.,Chalo Mobility Private Limited" defaultOption="" placeholder=""></wc-dropdown> . Please find the terms of this offer detailed below:

</wc-agreement>
`;

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      TaskList.configure({
        HTMLAttributes: {
          className: "not-prose pl-2",
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          className: "flex items-start my-4",
        },
        nested: true,
      }),
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: true,
      }),
      Underline,
      Markdown,
      InputNodeViewExtension,
      // DragAndDrop,
      // Code,
      // CodeBlock,
      // HardBreak,
      // HorizontalRule,
      CustomNode,
      DropdownNodeViewExtension,
      clauseNode,
      agreementNode,
      SlashCommand,
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none max-w-[100%]",
      },
      handleDOMEvents: {
        keydown: (_view, event) => {
          // prevent default event listeners from firing when slash command is active
          if (["ArrowUp", "ArrowDown", "Enter"].includes(event.key)) {
            const slashCommand = document.querySelector("#slash-command");
            if (slashCommand) {
              return true;
            }
          }
        },
      },
    },
  });
  if (!editor) return null;
  return (
    <div className="space-x-4 border-2 border-black rounded-md">
      <EditorHeader editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
