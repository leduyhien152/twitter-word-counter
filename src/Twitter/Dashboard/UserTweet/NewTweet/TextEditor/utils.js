export const getTextValue = (element) => {
  if (!element) return "";
  if (element.nodeType === Node.TEXT_NODE) return element.nodeValue;
  if (!element.childNodes) return "";
  let value = "";
  Array.from(element.childNodes).forEach((node) => {
    switch (node.nodeType) {
      case Node.TEXT_NODE:
        value += node.nodeValue;
        break;
      case Node.ELEMENT_NODE:
        value += getTextValue(node);
        break;
      default:
        throw new Error(`Unexpected node type: ${node.nodeType}`);
    }
  });
  return value;
};

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
