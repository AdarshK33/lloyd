import React, { useEffect, useState } from "react";
import styles from "./reSend.module.scss";
// import { Player } from "@lottiefiles/react-lottie-player";

const ResendOtp: React.FC = () => {
  const DURATION = 10; // 10 seconds

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
    console.log("Resendig OTP...");
    setCounter(DURATION);
    setCanResend(false);
  };

  const radius = 12;
  const circumference = 2 * Math.PI * radius;
  const progress = ((DURATION - counter) / DURATION) * circumference;

  const formatTime = (time: number) => {
    return time.toString().padStart(2, "0"); // show 00 when counter is 0
  };

  return (
    <div className={styles.resendOtp}>
      {counter > 0 ? (
        // Circle timer view
        <div className={styles.circleTimer}>
          <svg className={styles.progressRing} width="50" height="50">
            <circle
              className={styles.backgroundCircle}
              stroke="#eee"
              strokeWidth="4"
              fill="transparent"
              r={radius}
              cx="25"
              cy="25"
            />
            <circle
              className={styles.progressCircle}
              stroke="#DA251D"
              strokeWidth="4"
              fill="transparent"
              r={radius}
              cx="25"
              cy="25"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
            />
          </svg>
          <span className={styles.timeText}>{formatTime(counter)}</span>
        </div>
      ) : (
        // Centered message when timer ends
        // <p className={styles.centerMessage}>Didn’t receive OTP yet?</p>
        <></>
      )}

      <p className={styles.conditionsNormal}>Didn’t receive OTP yet?</p>
      <p
        className={styles.conditionsBold}
        onClick={handleResend}
        style={{
          cursor: canResend ? "pointer" : "not-allowed",
          opacity: canResend ? 1 : 0.5,
        }}
      >
        Resend OTP{" "}
      </p>
    </div>
  );
};

export default ResendOtp;
