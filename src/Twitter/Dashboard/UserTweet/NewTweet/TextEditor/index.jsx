import React, { useRef } from "react";

import { MAX_LENGTH } from "common/constants/Twitter";
import { getTextSegments, generateElement } from "./utils";

import styles from "./TextEditor.module.scss";

const TextEditor = ({ setNewTweet }) => {
  const textEditorRef = useRef();

  const restoreSelection = (absoluteAnchorIndex, absoluteFocusIndex) => {
    const sel = window.getSelection();
    const textSegments = getTextSegments(textEditorRef.current);
    let anchorNode = textEditorRef.current;
    let anchorIndex = 0;
    let focusNode = textEditorRef.current;
    let focusIndex = 0;
    let currentIndex = 0;
    textSegments.forEach(({ text, node }) => {
      const startIndexOfNode = currentIndex;
      const endIndexOfNode = startIndexOfNode + text.length;
      if (
        startIndexOfNode <= absoluteAnchorIndex &&
        absoluteAnchorIndex <= endIndexOfNode
      ) {
        anchorNode = node;
        anchorIndex = absoluteAnchorIndex - startIndexOfNode;
      }
      if (
        startIndexOfNode <= absoluteFocusIndex &&
        absoluteFocusIndex <= endIndexOfNode
      ) {
        focusNode = node;
        focusIndex = absoluteFocusIndex - startIndexOfNode;
      }
      currentIndex += text.length;
    });
    sel.setBaseAndExtent(anchorNode, anchorIndex, focusNode, focusIndex);
  };

  const generateChildren = (element, currentIndex) => {
    let text = element.textContent;
    if (!text) {
      text += "\n";
      const newLineElement = generateElement({
        children: ["\n"],
        startIndex: currentIndex,
        endIndex: currentIndex + 1,
      });
      const result = generateElement({
        children: [newLineElement],
        startIndex: currentIndex,
        endIndex: currentIndex + 1,
      });
      return { result, text };
    }
    if (!text.endsWith("\n") && element.nextSibling) text += "\n";
    const normalText = text.slice(0, Math.max(0, MAX_LENGTH - currentIndex));
    const normalElement = generateElement({
      children: [normalText],
      startIndex: currentIndex,
      endIndex: currentIndex + normalText.length,
    });
    if (MAX_LENGTH - currentIndex > text.length) {
      const result = generateElement({
        children: [normalElement],
        startIndex: currentIndex,
        endIndex: currentIndex + normalText.length,
      });
      return { result, text };
    }
    const highlightText = text.slice(Math.max(0, MAX_LENGTH - currentIndex));
    const highlightElement = generateElement({
      children: [highlightText],
      startIndex: currentIndex + normalText.length,
      endIndex: currentIndex + text.length,
      className: styles.textHighlight,
    });
    const result = generateElement({
      children: [normalElement, highlightElement],
      startIndex: currentIndex,
      endIndex: currentIndex + text.length,
    });
    return { result, text };
  };

  const replaceChildren = (elementList) => {
    const sel = window.getSelection();
    const {
      anchorOffset,
      focusOffset,
      anchorNode: { nodeValue: anchorNodeValue },
      focusNode: { nodeValue: focusNodeValue },
    } = sel;
    let value = "";
    let anchorIndex = 0;
    let focusIndex = 0;
    let currentIndex = 0;
    elementList.forEach((child) => {
      const { result, text } = generateChildren(child, value.length);
      value += text;
      if (child.nodeType === Node.TEXT_NODE) {
        const newChild = document.createElement("div");
        newChild.classList.add(styles.textEditorLine);
        newChild.appendChild(result);
        if (sel.anchorNode === child) {
          anchorIndex = currentIndex + anchorOffset;
          if (text.endsWith(anchorNodeValue)) {
            anchorIndex += text.length - anchorNodeValue.length;
          }
        }
        if (sel.focusNode === child) {
          focusIndex = currentIndex + focusOffset;
          if (text.endsWith(focusNodeValue)) {
            focusIndex += text.length - focusNodeValue.length;
          }
        }
        textEditorRef.current.replaceChild(newChild, child);
      } else {
        child.innerHTML = "";
        child.appendChild(result);
        if (sel.anchorNode === child) {
          anchorIndex = currentIndex + anchorOffset;
          if (text.endsWith(anchorNodeValue)) {
            anchorIndex += text.length - anchorNodeValue.length;
          }
        }
        if (sel.focusNode === child) {
          focusIndex = currentIndex + focusOffset;
          if (text.endsWith(focusNodeValue)) {
            focusIndex += text.length - focusNodeValue.length;
          }
        }
      }
      currentIndex += text.length;
    });
    setNewTweet(value);
    restoreSelection(anchorIndex, focusIndex);
  };

  const onInput = () => {
    const children = textEditorRef.current.childNodes;
    replaceChildren(children);
  };

  const onKeyUp = (e) => {
    switch (e.key) {
      case "Backspace": {
        const { textContent } = e.target;
        if (!textContent || textContent === "\n") {
          textEditorRef.current.innerHTML = "";
          setNewTweet("");
        }
        break;
      }
      default:
    }
  };

  return (
    <div className={styles.wrapper}>
      <div
        ref={textEditorRef}
        id="new-tweet-text-editor"
        className={styles.textEditor}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        data-placeholder="What's happening?"
        onInput={onInput}
        onKeyUp={onKeyUp}
      ></div>
    </div>
  );
};

export default TextEditor;
