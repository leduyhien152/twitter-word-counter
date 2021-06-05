import React, { useState } from "react";

import TextEditor from "./TextEditor";
import FunctionBar from "./FunctionBar";

import styles from "./NewTweet.module.scss";

const NewTweet = () => {
  const [tweet, setTweet] = useState("");

  return (
    <div className={styles.wrapper}>
      <TextEditor setTweet={setTweet} />
      <FunctionBar length={tweet.length} />
    </div>
  );
};

export default NewTweet;
