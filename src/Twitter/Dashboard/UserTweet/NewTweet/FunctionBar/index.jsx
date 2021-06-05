import ListButton from "./ListButton";
import ProgressRing from "./ProgressRing";
import PrimaryButton from "./PrimaryButton";

import styles from "./FunctionBar.module.scss";

const FunctionBar = ({ length }) => (
  <div className={styles.wrapper}>
    <ListButton />
    <ProgressRing length={length} />
    <PrimaryButton />
  </div>
);

export default FunctionBar;
