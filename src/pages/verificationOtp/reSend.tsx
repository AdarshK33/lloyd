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

  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = ((DURATION - counter) / DURATION) * circumference;

  const formatTime = (time: number) => {
    // const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${seconds}`;
  };

  return (
<>
  <div className={styles.resendOtp}>
      {counter ?(<>

        <div  className={`${styles.circleTimer} ${
      counter ==-1 ? styles.hidden : ""
    }`}>
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
              stroke="#DA251D" // 🔴 your theme color
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
      </>):(<>
      </>)}
      
        
      <span className={styles.conditionsNormal}>
        Didn’t receive OTP yet?
      </span>

     
        <span className={styles.conditionsBold} onClick={handleResend}>
          Resend OTP
        </span>
     
    </div>
    </>
  );
};

export default ResendOtp;
