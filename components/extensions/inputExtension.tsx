import { mergeAttributes, Node } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";

function InputNodeViewWrapper(props: any) {
  const { placeholder, value, defaultValue } = props.node.attrs;

  return (
    <NodeViewWrapper className="input-node inline-block">
      <input
        className="border rounded px-2 py-1 text-black outline-none"
        placeholder={placeholder || ""}
        value={value || ""}
        onChange={(e) => {
          props.updateAttributes({
            value: e.target.value,
          });
        }}
      />
    </NodeViewWrapper>
  );
}

export let InputNodeViewExtension = Node.create({
  name: "inputNode",
  group: "inline",
  inline: true,

  addAttributes() {
    return {
      placeholder: {
        default: "",
      },
      value: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "wc-input",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["wc-input", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(InputNodeViewWrapper);
  },
});
