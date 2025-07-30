import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
// import { useAppDispatch } from "../../store/hooks";
import listIcon from "../../assets/images/List.png";
import logo from "../../assets/images/logo.svg";
import imageOnaCircle from "../../assets/images/CircleOna.png";
import buyUnlock from "../../assets/images/buyUnlock.png";
import PersonWithItem from "../../assets/images/PersonWithItem.png";
import Select from "react-select";

// imageOnaCircle
import styles from "./registrationStep1.module.scss";
import { STATES } from "../../lib/consts";
import { toast } from "react-toastify";

function RegistrationStep1() {
  // const dispatch = useAppDispatch();
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
    if (phoneNumber !== "" && phoneNumber !== null && phoneNumber !== undefined &&    phonePattern.test(phoneNumber)) {
      return true;
    } else {
      return false;
    }
  };

const checkValidations = () => {
  let isValid = true;

  if (!nameValidations()) {
    toast.error("Please enter a valid name");
    isValid = false;
  }

  if (!phoneValidations()) {
    toast.error("Please Enter a valid phone number.");
    isValid = false;
  }

  return isValid;
};


  const handleSubmit = (e: any) => {
    e.preventDefault();
     handleClickStep2 ();
  
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


    const handleClickStep2 = () => {

    navigate('/registrationStep2'); // replace with your actual path
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.bg}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <img src={logo} alt="logo"></img>
            </div>
            <div className={styles.leftImage}>
              <img src={listIcon} alt="listIcon"></img>
            </div>
          </div>
          <div className={styles.onaCircle}>
            <div className={styles.imageOnaCircle}>
              <img src={imageOnaCircle} alt="imageOnaCircle"></img>
            </div>
          </div>

          <div className={styles.itemSection}>
            <div className={styles.itemBanner}>
              <img src={PersonWithItem} alt="PersonWithItem"></img>
            </div>
          </div>
          <div className={styles.formSection}>
            <form onSubmit={handleSubmit} className="form">
              <div className={styles.formHeadline}>
                <h2 className={styles.registration}>Registration</h2>
                <span className={styles.step}>STEP 1 / 2</span>
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Name"
                  value={name}
                  // onChange={handleChange}
                   onChange={(e) =>  setName(e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="number"
                  name="number"
                  placeholder="Enter Mobile Number"
                  // value={number}
                  onChange={(e)=> setPhoneNumber(e.target.value)}
                  
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="Voucher"
                  placeholder="Voucher Code"
                  // value={number}
                  // onChange={handleChange}
                />
              </div>

              <div className={`${styles.inputGroup}`}>
                <select name="SD" id="SD" className={styles.customSelect}  onChange={handleSelectSD}>
                  <option value="" disabled selected>
                    Select District
                  </option>

                  {STATES.map((name,i)=>{
                  return   <option key={i} value={name}>{name}</option>
                  })}
                
                </select>
              </div>

              <div className={`${styles.inputGroup}`}>
                <select name="select state" id="cars"  className={styles.customSelect}  onChange={handleSelectState}>
                  <option value="" disabled selected>
                    Select State
                  </option>
                   {STATES.map((name,i)=>{
                  return   <option key={i} value={name}>{name}</option>
                  })}
                </select>
              </div>

              <div className={styles.checkboxInputGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  <span className={styles.customCheckbox}></span>
                  <span className={styles.TermsConditionsNormal}>
                    I agree to the
                  </span>
                  <span className={styles.TermsConditionsBold}>
                    {" "}
                    Terms & Conditions
                  </span>
                </label>
              </div>
{/* 
              {errorMessages.length > 0 && (
  <div style={{ color: "red", marginBottom: "10px" }}>
    {errorMessages.map((msg, index) => (
      <p key={index} style={{ margin: "4px 0" }}>** {msg}</p>
    ))}
  </div>
)} */}
              <div className={styles.buttonSection}>
                <div className={styles.buttonBottom}>
                  <button type="submit">Next</button>
                </div>
              </div>
            </form>
          </div>

          {/* <div className="button-section">
            <div className="button-bottom">
              <button>Next</button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default RegistrationStep1;
