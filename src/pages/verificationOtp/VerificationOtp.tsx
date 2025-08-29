import React, {  useEffect, useRef, useState } from "react";
import styles from "./verificationOtp.module.scss"; // optional styling
import CommonBase from "../../components/Popups/common/CommonBase";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import close from "../../assets/images/close.svg";
import sucessTickMark from "../../assets/images/sucessTickMark.svg";
// import claro from "../../assets/images/Claro 3 JAR 1.png";
// import v1 from "../../assets/images/Voucher 1.png";
// import envp from "../../assets/images/envelop.png";
// import animation from "../../assets/animation/Cashback_and_Reward_Bundle.json";


import API from "../../api";
import {  setAccessToken, setReward } from "../../store/slices/authSlice";
import { useAppDispatch } from "../../store/hooks";
// import EnvelopeAnimation from "../EnvelopeAnimation/EnvelopeAnimation";
import ResendOtp from "./reSend";
import { Player } from "@lottiefiles/react-lottie-player";
import { store } from "../../store/store";
import { ANIMATIONS, ProductType } from "../../lib/consts";

function OtpVerification() {
  // const navigate = useNavigate();
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
      console.log("hello API Response: r1", res);

          dispatch(setReward(resGet?.rewardType));
          setShowTerms(true);
        }
      }
     
    } else {
       // setShowTerms(true);
   
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
                fontSize: "12px",
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

type TermsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "cashback" | "reward";
};

const TermsModal = ({ isOpen, onClose, type }: TermsModalProps) => {
    if (!isOpen) return null;
  const [currentType, setCurrentType] = useState<"cashback" | "reward">(type);
  const navigate = useNavigate();
    const [ animation, setAnimation] = useState<any>();

  // const dispatch = useAppDispatch();
  
     const state = store.getState();
      const {reward} = state?.auth;

        const handleBtnClick = () => {
           setCurrentType("cashback");
    const rewardTimer = setTimeout(() => {
        navigate("/redemption"); // 👈 replace with your route
      }, 5000);
      
      return () => clearTimeout(rewardTimer);
  
}
    
  useEffect(() => {
    if (!isOpen) return;
    setCurrentType("reward");
  }, [isOpen, navigate]);


 const handleImageCase = (rewardType: string) => {
    switch (rewardType) {
      case ProductType.CASHBACK_300:
        return setAnimation(ANIMATIONS.Anim_Cashback_300);
 
      default:
        return null;
    }
  };


    useEffect(() => {
    if (reward) {
      handleImageCase(reward);
    }
  }, [reward])

  return (
    <>
    <div className={isOpen ? styles.show : styles.model}>
      {currentType === "reward" ? (
        <>
          <div className={styles.rewardContainer}>
            {/* Heading */}
     <Player
        src={animation}
        style={{ height: "97%", width: "85%" }}
        keepLastFrame={true}
        autoplay={true}
      />
             <div className={styles.buttonAcknowledgedSection}>
       
              <button  
               onClick={() => handleBtnClick()}
              >Acknowledged</button>
           
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
    </>
  );
};

export default OtpVerification;
