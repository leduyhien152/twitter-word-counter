export const getTextSegments = (element) => {
  const textSegments = [];
  Array.from(element.childNodes).forEach((node) => {
    switch (node.nodeType) {
      case Node.TEXT_NODE:
        textSegments.push({ text: node.nodeValue, node });
        break;
      case Node.ELEMENT_NODE:
        textSegments.splice(textSegments.length, 0, ...getTextSegments(node));
        break;
      default:
        throw new Error(`Unexpected node type: ${node.nodeType}`);
    }
  });
  return textSegments;
};

export const generateElement = ({
  children,
  startIndex,
  endIndex,
  className,
}) => {
  const element = document.createElement("span");
  element.dataset.startIndex = startIndex;
  element.dataset.endIndex = endIndex;
  element.classList.add(className);
  if (children && children.length) {
    element.append(...children);
  }
  return element;
};
