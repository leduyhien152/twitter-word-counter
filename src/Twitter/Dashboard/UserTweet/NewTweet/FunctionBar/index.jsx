import ProgressRing from "common/components/ProgressRing";
import PrimaryButton from "common/components/PrimaryButton";
import ListButton from "./ListButton";

import styles from "./FunctionBar.module.scss";

const FunctionBar = ({ length }) => (
  <div className={styles.wrapper}>
    <ListButton />
    <ProgressRing length={length} />
    <PrimaryButton content="Tweet" />
  </div>
);

export default FunctionBar;
