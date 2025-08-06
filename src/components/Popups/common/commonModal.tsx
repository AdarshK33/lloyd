import React, { useState } from "react";
import styles from "../../../pages/cashBack/cashBack.module.scss";
import sucessTickMark from "../../../assets/images/sucessTickMark.svg";
import close from "../../../assets/images/close.svg";

type TermsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: 'cashback' | 'reward';
};

const TermsModal = ({ isOpen, onClose, type }: TermsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={isOpen ? styles.show : styles.model}>
      <div className={styles.notice}>
        <span id="close"  className={styles.close} onClick={onClose}>
          <img src={close} alt="Close" />
        </span>
        <div>
            <img src={sucessTickMark} alt="sucessTickMark" />
        </div>
        <h2>
          Congratulations!
        </h2>
        {type === 'cashback' ? (
          <p>Your cashback will be credited to the selected payout mode within 24-48 business hours.</p>
        ) : (
          <p>You will receive your Reward shortly</p>
        )}
      </div>
    </div>
  );
};

// export default  TermsModal;