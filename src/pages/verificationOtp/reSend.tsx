import React, { useEffect, useState } from "react";
import styles from "./reSend.module.scss";

const ResendOtp: React.FC = () => {
  const DURATION = 10; // ⏱️ set timer to 10 seconds

  const [counter, setCounter] = useState(DURATION);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (counter > 0) {
      timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
    }

    return () => clearTimeout(timer);
  }, [counter]);

  const handleResend = () => {
    if (!canResend) return;
    console.log("Resending OTP..."); // 👉 API call here
    setCounter(DURATION);
    setCanResend(false);
  };

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const progress = ((DURATION - counter) / DURATION) * circumference;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className={styles.resendOtp}>
      <span className={styles.conditionsNormal}>
        Didn’t receive OTP yet?
      </span>

      {canResend ? (
        <span className={styles.conditionsBold} onClick={handleResend}>
          Resend OTP
        </span>
      ) : (
        <div className={styles.circleTimer}>
          <svg className={styles.progressRing} width="60" height="60">
            <circle
              className={styles.backgroundCircle}
              stroke="#eee"
              strokeWidth="4"
              fill="transparent"
              r={radius}
              cx="30"
              cy="30"
            />
            <circle
              className={styles.progressCircle}
              stroke="#DA251D" // 🔴 your theme color
              strokeWidth="4"
              fill="transparent"
              r={radius}
              cx="30"
              cy="30"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
            />
          </svg>
          <span className={styles.timeText}>{formatTime(counter)}</span>
        </div>
      )}
    </div>
  );
};

export default ResendOtp;
