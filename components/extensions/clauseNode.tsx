import { mergeAttributes, Node } from "@tiptap/core";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { Trash } from "lucide-react";
const ViewWrapper = (props: any) => {
  return (
    <NodeViewWrapper>
      <div
        className="absolute right-5 top-3 z-50 cursor-pointer"
        onClick={() => props.deleteNode()}
      >
        <Trash size={20} />
      </div>
      <NodeViewContent />
    </NodeViewWrapper>
  );
};
export default Node.create({
  name: "clauses",
  group: "block",
  content: "block*",
  draggable: true,
  parseHTML() {
    return [{ tag: "wc-clause" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["wc-clause", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ViewWrapper);
  },
});
