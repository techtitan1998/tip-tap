import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./Component";

export default Node.create({
  name: "reactComponent",

  group: "block",

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: "wc-guardrail",
      },
    ];
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => {
        return this.editor.chain().insertContentAt(this.editor.state.selection.head, { type: this.type.name }).focus().run();
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["wc-guardrail", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
