import React from "react";

import styles from "./TextEditor.module.scss";

const TextEditor = ({ setTweet }) => {
  const onInput = (e) => {
    setTweet(e.target.textContent);
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.textEditor}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        data-placeholder="What's happening?"
        onInput={onInput}
      ></div>
    </div>
  );
};

export default TextEditor;
