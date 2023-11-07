import { mergeAttributes, Node } from "@tiptap/core";
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
const ViewWrapper = (props: any) => {
  return (
    <NodeViewWrapper>
      <NodeViewContent />
    </NodeViewWrapper>
  );
};
export default Node.create({
  name: "agreement",
  group: "block",
  content: "block*",
  parseHTML() {
    return [{ tag: "wc-agreement" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["wc-agreement", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ViewWrapper);
  },
});
