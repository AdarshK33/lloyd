import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
// import { useAppDispatch } from "../../store/hooks";
import Select, { components, PlaceholderProps } from "react-select";

// imageOnaCircle
import styles from "./registrationStep1.module.scss";
import { STATES } from "../../lib/consts";
import { toast } from "react-toastify";
import close from "../../assets/images/close.svg";
import down from "../../assets/images/chevron-down.svg";

import CommonBase from "../../components/Popups/common/CommonBase";


function RegistrationStep1() {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    voucher: "",
    state: "",
    district: "",
    agreedToTerms: false,
  });

   const [errors, setErrors] = useState<any>({});
  const [showTerms, setShowTerms] = useState(false);

  const validate = () => {
    const newErrors: any= {};
    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = "**Please enter a valid name ";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "**Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "**Mobile number must be 10 digits";
    }


    if (!formData.district) {
      newErrors.district = "**Please select a district";
    }

    if (!formData.state) {
      newErrors.state = "**Please select a state";
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = "**You must agree to the terms and conditions";
    }

    return newErrors;
  };
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev: any) => ({
      ...prev,
      [name]: val,
    }));

   

    setErrors((prev:any) => ({
      ...prev,
      [name]: "",
    }));
  };


  const handleSubmit = (e:any) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      console.log("Submitted:", formData);
       navigate("/registrationStep2");
      // API call or navigation to next step here
    } else {
      setErrors(validationErrors);
    }
  };

  const handleClickStep2 = () => {
    navigate("/registrationStep2"); // replace with your actual path
  };

  return (
    <>
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      <CommonBase>
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className="form">
            <div className={styles.formHeadline}>
              <h2 className={styles.registration}>Registration</h2>
              <span className={styles.step}>STEP 1 / 2</span>
            </div>

            <div className={styles.inputGroup}>
              <input
   
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
              onChange={handleChange}
              
              />
                {errors.name && <span className={styles.validation}>{errors.name}</span>}
            </div>



            <div className={styles.inputGroup}>
              <input
                type="number"
                name="phoneNumber"
                placeholder="Enter Mobile Number"
                 value={formData.phoneNumber}
                   onChange={handleChange}
              />
                {errors.phoneNumber && <span className={styles.validation}>{errors.phoneNumber}</span>}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="voucher"
                placeholder="Voucher Code"
                 value={formData.voucher}
                   onChange={handleChange}
              />
                {errors.voucher && <span className={styles.validation}>{errors.voucher}</span>}
              
            </div>

            <div className={`${styles.inputGroup}`}>
              <img
                src={down}
                alt={"select"}
                style={{
                  position: "absolute",
                  right: "2rem",
                  paddingTop: ".5rem",
                }}
              />
              <select
                   name="district"
              value={formData.district}
              onChange={handleChange}
                id="SD"
                className={styles.customSelect}
             
              >
                <option value="" disabled selected hidden>
                  Select District
                </option>
                {STATES.map((name, i) => (
                  <option key={i} value={name}>
                    {name}
                  </option>
                ))}
              </select>
                {errors.district && (
            <span className={styles.validation}>{errors.district}</span>
          )}
            </div>

            <div className={`${styles.inputGroup}`}>
              <img
                src={down}
                alt={"select"}
                style={{
                  position: "absolute",
                  right: "2rem",
                  paddingTop: ".5rem",
                }}
              />
              <select
               name="state"
               value={formData.state}
               onChange={handleChange}
                className={styles.customSelect}
              >
                <option value="" selected>
                  Select State
                </option>
                {STATES.map((name, i) => {
                  return (
                    <option key={i} value={name}>
                      {name}
                    </option>
                  );
                })}
              </select>
                {errors.state && (
            <span className={styles.validation}>{errors.state}</span>
          )}
            </div>

            <div className={styles.checkboxInputGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                   name="agreedToTerms"
              checked={formData.agreedToTerms}
              onChange={handleChange}
                  onClick={() => {
                    setShowTerms(true);
                  }}
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
                {errors.agreedToTerms && (
            <span className={styles.validation}  style={{
                            color: "#ea0c0cff",
                            fontSize: "10px",
                            fontWeight: 200,
                          }}>{errors.agreedToTerms}</span>
          )}
              <div className={styles.buttonBottom}>
                <button type="submit">Next</button>
              </div>
            </div>
          </form>
        </div>
      </CommonBase>
    </>
  );
}

type TermsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const TermsModal = ({ isOpen, onClose }: TermsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={isOpen ? styles.show : styles.model}>
      <div className={styles.notice}>
        <span id="close" className={styles.close} onClick={onClose}>
          <img src={close} alt="Close" />
        </span>
        <div>{/* <img src={sucessTickMark} alt="sucessTickMark" /> */}</div>
        <h4> Terms & conditions</h4>
        {/*  style="text-align: justify" */}
        <ol>
          <li>
            This promotion is in no way sponsored, endorsed or administered by,
            or associated with, Facebook
          </li>
          <li>You are providing information on facebook.</li>
        </ol>
      </div>
    </div>
  );
};

export default RegistrationStep1;
