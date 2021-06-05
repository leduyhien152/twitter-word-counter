import React from "react";

import UserAvatar from "common/components/UserAvatar";
import NewTweet from "./NewTweet";

import styles from "./UserTweet.module.scss";

const UserTweet = () => {
  return (
    <div className={styles.wrapper}>
      <UserAvatar />
      <NewTweet />
    </div>
  );
};

export default UserTweet;
