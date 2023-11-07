import { mergeAttributes, Node } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

function DropdownNodeViewWrapper(props: any) {
  const { defaultOption, selectedOption = defaultOption, options, placeholder } = props.node.attrs;
  const [isOpen, setIsOpen] = useState(false);
  let parseOptions = options
    .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/) // Split by commas outside of double quotes
    .map((option: any) => option.replace(/"/g, "").trim());
  function formatCamelCase(inputString: string) {
    return inputString.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (str: string) => {
      return str.toUpperCase();
    });
  }
  return (
    <NodeViewWrapper className="dropdown-node inline-block">
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <div className="relative h-full">
          <Popover.Trigger className="flex h-full items-center gap-1 whitespace-nowrap p-2 text-sm font-medium text-stone-600 bg-stone-100 active:bg-stone-200 rounded-md" onClick={() => setIsOpen(!isOpen)}>
            <span>{formatCamelCase(selectedOption) || formatCamelCase(defaultOption) || placeholder || "Select Option"}</span>
            <ChevronDown className="h-4 w-4" />
          </Popover.Trigger>
          <Popover.Content align="start" className="z-[99999] my-1 flex max-h-80 max-w-lg flex-col overflow-hidden overflow-y-auto rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1">
            {parseOptions.map((option: any) => (
              <button
                key={option}
                onClick={() => {
                  props.updateAttributes({
                    selectedOption: option,
                  });
                  setIsOpen(false);
                }}
                className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
                type="button"
              >
                <div className="flex items-center space-x-2">
                  <span className="capitalize">{formatCamelCase(option)}</span>
                </div>
              </button>
            ))}
          </Popover.Content>
        </div>
      </Popover.Root>
    </NodeViewWrapper>
  );
}

export let DropdownNodeViewExtension = Node.create({
  name: "dropdownNode",
  group: "inline",
  inline: true,
  atom: true,
  addAttributes() {
    return {
      selectedOption: {
        // @ts-ignore
        default: this.defaultOption,
        // @ts-ignore
        get default() {
          // @ts-ignore
          return this.defaultOption;
        },
      },
      options: {
        default: [],
      },
      defaultOption: {
        default: "",
      },
      placeholder: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "wc-dropdown",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DropdownNodeViewWrapper);
  },
});
