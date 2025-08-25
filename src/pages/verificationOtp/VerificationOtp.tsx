import React, { useEffect, useRef, useState } from "react";
import styles from "./verificationOtp.module.scss"; // optional styling
import CommonBase from "../../components/Popups/common/CommonBase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import close from "../../assets/images/close.svg";
import sucessTickMark from "../../assets/images/sucessTickMark.svg";
import claro from "../../assets/images/Claro 3 JAR 1.png";
import v1 from "../../assets/images/Voucher 1.png";
import envp from "../../assets/images/envelop.png";

import API from "../../api";
import { clearAccessDetails, setAccessToken, setReward } from "../../store/slices/authSlice";
import { useAppDispatch } from "../../store/hooks";
import { store } from "../../store/store";
function OtpVerification() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [error, setError] = useState("");
  const [showTerms, setShowTerms] = useState(false);

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
    e: React.KeyboardEvent<HTMLInputElement>
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
        setShowTerms(true);
      // Perform verification
      // navigate("/cashBack");
 
      const res: any = await API.verifyOTP(finalOtp);
      //  save accesstoken authorisedApi
  
  dispatch(setAccessToken(res?.accessToken))
      // let login = await API.authorisedApi(); //user login api
      
      console.log("hello API Response: r1", res);
      if (res) {
        //GET API CALLLING
        let resGet: any = await API.getReward();
        if (resGet) {
            dispatch(setReward(resGet?.rewardType));
          setShowTerms(true);
        }
      }
     
    } else {
   
      //   alert("Please enter all 6 digits.");
      setError("Please enter all 6 digits");
    }
  };

  return (
    <>
      <TermsModal
        isOpen={showTerms}
        type="reward"
        onClose={() => setShowTerms(false)}
      />
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
            <span className={styles.conditionsNormal}>
              Didn’t receive OTP Yet?
            </span>
            <span className={styles.conditionsBold}> Resend OTP</span>
          </div>
          <div className={styles.buttonSection}>
            <div className={styles.buttonBottom}>
              <button type="submit">Verify Otp</button>
            </div>
          </div>
        </form>
      </CommonBase>
    </>
  );
}

type TermsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "cashback" | "reward";
};

const TermsModal = ({ isOpen, onClose, type }: TermsModalProps) => {
  const [currentType, setCurrentType] = useState<"cashback" | "reward">(type);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
     const state = store.getState();
      const {reward} = state.auth;
  
    
  useEffect(() => {
    if (!isOpen) return;

    // Always start with reward when opened
    setCurrentType("reward");

    // Step 1: After 10 seconds → show cashback
    const rewardTimer = setTimeout(() => {
      setCurrentType("cashback");

      // Step 2: After 5 seconds of cashback → navigate
      const cashbackTimer = setTimeout(() => {
     
        navigate("/redemption"); // 👈 replace with your route
      }, 5000);

      return () => clearTimeout(cashbackTimer);
    }, 10000);

    return () => clearTimeout(rewardTimer);
  }, [isOpen, navigate]);

  if (!isOpen) return null;

  return (
    <div className={isOpen ? styles.show : styles.model}>
      {currentType === "reward" ? (
        <>
          <div className={styles.rewardContainer}>
            {/* Heading */}
            <h2 className={styles.title}>Congratulations!</h2>
            <p className={styles.subtitle}>
              You have won Havells Juicer Mixer Grinder and a Reward Bundle of
              ₹25,000
            </p>

            {/* Reward Card */}

            <div className={styles.prizes}>
              <div className={styles.envelope}>
                <img
                  src={claro}
                  alt="Juicer Mixer Grinder"
                  className={styles.juicer}
                />
                <img src={v1} alt="Reward Bundle" className={styles.reward} />
              </div>
            </div>

            <div className={styles.rewardCard}>
              <div className={styles.left}>
                Havells Juicer <br /> Mixer Grinder
              </div>
              <div className={styles.right}>
                ₹25,000/- <br /> Reward Bundle
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.notice}>
            <span id="close" className={styles.close} onClick={onClose}>
              {/* <img src={close} alt="Close" /> */}
            </span>

            <div>
              <img src={sucessTickMark} alt="sucessTickMark" />
            </div>
            {/* <h2>
          Congratulations!
        </h2> */}

            <h4>Thank you for completing the registration process. </h4>

            <h5>We will validate the details within 48 working hours.</h5>
          </div>
        </>
      )}
    </div>
  );
};

export default OtpVerification;
