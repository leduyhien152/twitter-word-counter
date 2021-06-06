import ProgressRing from "common/components/ProgressRing";
import PrimaryButton from "common/components/PrimaryButton";
import ListButton from "./ListButton";

import { MAX_LENGTH } from "common/constants/Twitter";

import styles from "./FunctionBar.module.scss";

const FunctionBar = ({ newTweet }) => (
  <div className={styles.wrapper}>
    <ListButton />
    <ProgressRing currentValue={newTweet.length} maxValue={MAX_LENGTH} />
    <PrimaryButton content="Tweet" />
  </div>
);

export default FunctionBar;
