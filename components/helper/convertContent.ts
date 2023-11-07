export function convertContent(content: any) {
  for (const [index, item] of content.content.entries()) {
    if (item.content && item.content.length > 0) {
      for (const [childIndex, child] of item.content.entries()) {
        if (child?.content && child?.content.length > 0) {
          for (const [thirdIndex, thirdChild] of child?.content.entries()) {
            for (const [fourthIndex, fourthChild] of thirdChild?.content.entries()) {
              if (fourthChild.text) {
                const textParts = fourthChild.text.split("<<");
                for (let i = 0; i < textParts.length; i++) {
                  const text = textParts[i];
                  if (text && text.includes(">>")) {
                    console.log(text);
                    const parseObject = JSON.parse(text.split(">>")[0]);
                    for (const [listItemIndex, listItem] of content.content[index].content.entries()) {
                      for (const [paraIndex, paraItem] of listItem?.content.entries()) {
                        for (const [textIndex, textItem] of paraItem?.content.entries()) {
                          if (textItem.text) {
                            const splitText = textItem.text.split("<<");
                            if (splitText.length > 1) {
                              for (let j = 0; j < splitText.length; j++) {
                                if (splitText[j].length > 0) {
                                  const split = splitText[j].split(">>");
                                  if (split.length > 1) {
                                    const parseObj = JSON.parse(split[0]);
                                    content.content[index].content[listItemIndex].content[paraIndex].content[textIndex + 1] = {
                                      type: "dropdownNode",
                                      attrs: {
                                        selectedOption: "",
                                        options: parseObj.options,
                                        defaultOption: parseObj.defaultValue || "",
                                        placeholder: parseObj.nameWhenUnselected,
                                      },
                                    };
                                  } else {
                                    content.content[index].content[listItemIndex].content[paraIndex].content[textIndex] = { type: "text", text: split[0] };
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    // if (parseObject.type === "dropdown") {
                    //   content.content[index].content[thirdIndex].content[0].content.push({
                    //     type: "dropdownNode",
                    //     attrs: {
                    //       selectedOption: "",
                    //       options: parseObject.options,
                    //       defaultOption: parseObject.defaultValue || "",
                    //       placeholder: parseObject.nameWhenUnselected,
                    //     },
                    //   });
                    // } else if (parseObject.type === "input") {
                    //   content.content[index].content[thirdIndex].content[0].content.push({
                    //     type: "inputNode",
                    //     attrs: {
                    //       value: parseObject.defaultValue || "",
                    //       placeholder: parseObject.placeholder,
                    //     },
                    //   });
                    // }
                    // const textAfterOptions = text.split(">>")[1];
                    // if (textAfterOptions) {
                    //   content.content[index].content[thirdIndex].content[0].content.push({ type: "text", text: textAfterOptions });
                    // }
                    // for (const [objIndex, obj] of content.content[index].content[thirdIndex].content[0].content.entries()) {
                    //   if (obj.type === "text" && obj.text) {
                    //     const splitText = obj.text.split("<<");
                    //     if (splitText.length > 1) {
                    //       // console.log(splitText, content.content[index].content[thirdIndex].content[0].content, obj);
                    //       content.content[index].content[thirdIndex].content[0].content.splice(objIndex, 0);
                    //       content.content[index].content[thirdIndex].content[0].content[objIndex] = { type: "text", text: splitText[0] };
                    //     }
                    //   }
                    // }
                  }
                }
              }
            }
          }
        } else if (child.text) {
          const textParts = child.text.split("<<");
          for (let i = 0; i < textParts.length; i++) {
            const text = textParts[i];
            if (text.includes(">>")) {
              const parseObject = JSON.parse(text.split(">>")[0]);
              if (parseObject.type === "dropdown") {
                content.content[index].content.push({
                  type: "dropdownNode",
                  attrs: {
                    selectedOption: "",
                    options: parseObject.options,
                    defaultOption: parseObject.defaultValue || "",
                    placeholder: parseObject.nameWhenUnselected,
                  },
                });
              } else if (parseObject.type === "input") {
                content.content[index].content.push({
                  type: "inputNode",
                  attrs: {
                    value: parseObject.defaultValue || "",
                    placeholder: parseObject.placeholder,
                  },
                });
              }
              const textAfterOptions = text.split(">>")[1];
              if (textAfterOptions) {
                content.content[index].content.push({ type: "text", text: textAfterOptions });
              }
              content.content[index].content.shift();
              content.content[index].content.unshift({ type: "text", text: textParts[0] });
            }
          }
        }
      }
    }
  }

  return content;
}
