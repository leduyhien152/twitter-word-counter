import styles from "./UserAvatar.module.scss";

const UserAvatar = () => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.image} src="/logo192.png" alt="" />
    </div>
  );
};

export default UserAvatar;
