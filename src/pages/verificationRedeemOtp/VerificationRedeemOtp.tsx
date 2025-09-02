import React, { useRef, useState } from "react";
import styles from "./verificationOtp.module.scss"; // optional styling
import CommonBase from "../../components/Popups/common/CommonBase";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../store/hooks";
import API from "../../api";
import { setAccessToken, setReward } from "../../store/slices/authSlice";
import ResendOtp from "../verificationOtp/reSend";
function OtpRedeemVerification() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [error, setError] = useState("");

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");
    // Move to next input if current has a value
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        setError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    console.log("OTP entered:", finalOtp);

    if (finalOtp.length === 6) {
      setError("");
      // Perform verification
      const res: any = await API.verifyRedeemOTP(finalOtp);
      //  save accesstoken authorisedApi
      // dispatch(setAccessToken(res?.accessToken));
      dispatch(setAccessToken(res?.accessToken));

      if (res) {
        let resGetAll: any = await API.getAllReward(); //get all rewars api for redeem
        if (resGetAll?.statusCode == 200) {
          dispatch(setReward(resGetAll?.rewardDetails));
          navigate("/cashBack");
        }
      }

      //  save accesstoken authorisedApi
    } else {
      //   alert("Please enter all 6 digits.");
      setError("Please enter all 6 digits");
    }
  };

  return (
    <>
      <CommonBase>
        <form onSubmit={handleSubmit} className={styles.otpForm}>
          <h2 className={styles.verificationHeadline}>Verification</h2>
          <div className={styles.otpInputs}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputsRef.current[index] = el!)}
                className={styles.otpInput}
              />
            ))}
          </div>
          {/* Error Message */}
          {error && (
            <span
              className={styles.validation}
              style={{
                color: "#ea0c0cff",
                fontSize: "10px",
                fontWeight: 200,
              }}
            >
              {error}
            </span>
          )}

          <div className={styles.resendOtp}>
            {/* <span className={styles.conditionsNormal}>
                        Didn’t receive OTP Yet?
                      </span>
                      <span className={styles.conditionsBold}> Resend OTP</span> */}
            <ResendOtp />
          </div>
          <div className={styles.buttonSection}>
          
              <button type="submit">Verify Otp</button>
          
          </div>
        </form>
      </CommonBase>
    </>
  );
}

export default OtpRedeemVerification;
