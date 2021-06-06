import React, { useState } from "react";

import TextEditor from "./TextEditor";
import FunctionBar from "./FunctionBar";

import styles from "./NewTweet.module.scss";

const NewTweet = () => {
  const [newTweet, setNewTweet] = useState("");

  return (
    <div className={styles.wrapper}>
      <TextEditor setNewTweet={setNewTweet} />
      <FunctionBar newTweet={newTweet} />
    </div>
  );
};

export default NewTweet;
