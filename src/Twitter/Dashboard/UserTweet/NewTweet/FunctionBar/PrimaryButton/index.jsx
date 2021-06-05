import styles from "./PrimaryButton.module.scss";

const PrimaryButton = () => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button}>Tweet</button>
    </div>
  );
};

export default PrimaryButton;
