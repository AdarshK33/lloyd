import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";

// imageOnaCircle
import styles from "./registrationStep1.module.scss";
import { toast } from "react-toastify";
import CommonBase from "../../components/Popups/common/CommonBase";

function RegistrationStep2() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const [formData, setFormData] = useState({
  //   username: "",
  //   number: "",
  //   checkbox: false,
  // });

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // const [nameError, setNameError] = useState(false);
  // const [phoneError, setPhoneError] = useState(false);

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const nameValidations = () => {
    if (name !== "" && name !== null && name !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const phoneValidations = () => {
    const phonePattern = /^[0-9]{10}$/;
    if (
      phoneNumber !== "" &&
      phoneNumber !== null &&
      phoneNumber !== undefined &&
      phonePattern.test(phoneNumber)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkValidations = () => {
    let isValid = true;

    if (!nameValidations()) {
      toast.error("Please enter a valid outlet name.");
      isValid = false;
    }

    if (!phoneValidations()) {
      toast.error("Please Enter a valid invoice number.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleClickVerificatonOtp();
    const value = checkValidations();
  };
  // const stateOptions = STATES.map((state) => ({
  //   label: state,
  //   value: state,
  // }));

  const handleSelect = (selectedOption: any) => {
    console.log("Selected state:", selectedOption?.value);
  };

  const [selectedState, setSelectedState] = useState("");

  const [selectedSD, setSelectedSD] = useState("");

  const handleSelectState = (event: any) => {
    setSelectedState(event.target.value);
    console.log("Selected:", event.target.value);
  };

  const handleSelectSD = (event: any) => {
    setSelectedSD(event.target.value);
  };

  const handleClickVerificatonOtp = () => {
    navigate("/verificationOtp"); // replace with your actual path
  };
  return (
    <>
      <CommonBase>
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className="form">
            <div className={styles.formHeadline}>
              <h2 className={styles.registration}>Registration</h2>
              <span className={styles.step}>STEP 2 / 2</span>
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="username"
                placeholder="Outlet Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="number"
                name="number"
                placeholder="Invoice number"
                // value={number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="number"
                name="number"
                placeholder="Upload Invoice 1"
                // value={number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="number"
                name="number"
                placeholder="Upload Invoice 2 (optional)"
                // value={number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className={styles.buttonSection}>
              <div className={styles.buttonBottom}>
                <button type="submit">Get Otp</button>
              </div>
            </div>
          </form>
        </div>
      </CommonBase>
    </>
  );
}

export default RegistrationStep2;
