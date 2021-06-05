import styles from "./ProgressRing.module.scss";

import { MAX_LENGTH } from "common/constants/Twitter";

const ProgressRing = ({ size = 30, length = 0 }) => {
  const STROKE_WIDTH = 3;

  const radius = size / 2 - STROKE_WIDTH;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (length / MAX_LENGTH) * circumference;

  const isWarning = MAX_LENGTH - length <= 10 && MAX_LENGTH - length >= 0;
  const isError = MAX_LENGTH - length < 0;
  const color = (isError && "red") || (isWarning && "orange") || "blue";

  return (
    <div className={styles.wrapper}>
      <svg width={size} height={size}>
        <circle
          className={styles.circle}
          stroke="#ebeef0"
          fill="transparent"
          strokeWidth={STROKE_WIDTH}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={styles.circle}
          stroke={color}
          fill="transparent"
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={isError ? 0 : offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {(isWarning || isError) && (
        <div className={styles.number}>{MAX_LENGTH - length}</div>
      )}
    </div>
  );
};

export default ProgressRing;
