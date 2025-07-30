import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";

// imageOnaCircle
import styles from "./cashBack.module.scss";
import { toast } from "react-toastify";
import CommonBase from "../../components/Popups/common/CommonBase";

function CashBack() {
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

  const [activeTab, setActiveTab] = useState('cashback');

    const nameValidations = () => {

    if (name !== "" && name !== null && name !== undefined) {
      return true;
    } else {
      return false;
    }
  };

     const phoneValidations = () => {
  const phonePattern = /^[0-9]{10}$/;
    if (phoneNumber !== "" && phoneNumber !== null && phoneNumber !== undefined &&    phonePattern.test(phoneNumber)) {
      return true;
    } else {
      return false;
    }
  };

const checkValidations = () => {
  let isValid = true;

  if (!nameValidations()) {
    toast.error("Please enter a valid mobile number.");
    isValid = false;
  }

  if (!phoneValidations()) {
    toast.error("Please Enter a valid code");
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

  const handleSelectState = (event:any) => {
    setSelectedState(event.target.value);
    console.log("Selected:", event.target.value);
  };

    const handleSelectSD = (event:any) => {
    setSelectedSD(event.target.value);
  
  };
  
    const handleClickVerificatonOtp = () => {
    navigate("/verificationOtp"); // replace with your actual path
  };
  return (
    <>
       <CommonBase>
          <div className={styles.formSection}>

                       <div className="offer-toggle-wrapper">
      <div className="offer-toggle">
        {/* Cashback tab */}
        <div
          className={`offer-tab ${activeTab === 'cashback' ? 'active cashback' : ''}`}
          onClick={() => setActiveTab('cashback')}
        >
          <div className="offer-title">Assured Cashback of</div>
          <div className="offer-amount">₹300</div>
        </div>

        {/* Reward bundle tab */}
        <div
          className={`offer-tab ${activeTab === 'reward' ? 'active reward' : ''}`}
          onClick={() => setActiveTab('reward')}
        >
          <div className="offer-title">Reward Bundle of</div>
          <div className="offer-amount reward-text">₹25,000</div>
        </div>
      </div>

    </div>
            <form onSubmit={handleSubmit} className={styles.redemptionForm}>
    
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter UPI ID"
                  value={name}
                   onChange={(e) =>  setName(e.target.value)}
                />
              </div>

            

              <div className={styles.buttonSection}>
                <div className={styles.buttonBottom}>
                  <button type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
          </CommonBase>
       
    </>
  );
}

export default CashBack;
