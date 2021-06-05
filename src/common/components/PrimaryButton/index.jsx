import styles from "./PrimaryButton.module.scss";

const PrimaryButton = ({ content }) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button}>{content}</button>
    </div>
  );
};

export default PrimaryButton;
