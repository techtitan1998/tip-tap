import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React from "react";

export default (props: any) => {
  return (
    <NodeViewWrapper className="react-component-with-content" draggable={true}>
      <span className="label" contentEditable={false}>
        Guardrails
      </span>

      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};
