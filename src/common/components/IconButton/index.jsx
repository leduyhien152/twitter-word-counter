import styles from "./IconButton.module.scss";

const IconButton = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default IconButton;
