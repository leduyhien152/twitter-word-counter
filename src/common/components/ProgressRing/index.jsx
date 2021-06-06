import styles from "./ProgressRing.module.scss";

const ProgressRing = ({ currentValue, maxValue }) => {
  const STROKE_WIDTH = 3;
  const NORMAL_SIZE = 30;
  const ABNORMAL_SIZE = 35;

  const isWarning =
    maxValue - currentValue <= 10 && maxValue - currentValue >= 0;
  const isError = maxValue - currentValue < 0;
  const color = (isError && "red") || (isWarning && "orange") || "blue";
  const size = isError || isWarning ? ABNORMAL_SIZE : NORMAL_SIZE;

  const radius = size / 2 - STROKE_WIDTH;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (currentValue / maxValue) * circumference;

  return (
    <div className={styles.wrapper}>
      <svg width={size} height={size} key={size}>
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
        <div className={styles.number} id="new-tweet-text-count">
          {maxValue - currentValue}
        </div>
      )}
    </div>
  );
};

export default ProgressRing;
