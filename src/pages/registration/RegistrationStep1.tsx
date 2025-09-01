import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useAppDispatch } from "../../store/hooks";
// import Select, { components, PlaceholderProps } from "react-select";

// imageOnaCircle
import styles from "./registrationStep1.module.scss";
import { DISTRICT, STATES } from "../../lib/consts";
// import { toast } from "react-toastify";
import close from "../../assets/images/close.svg";
import down from "../../assets/images/chevron-down.svg";

import CommonBase from "../../components/Popups/common/CommonBase";
// import { getCookie } from "../../lib/utils";
// import { store } from "../../store/store";
import { useAppDispatch } from "../../store/hooks";
import API from "../../api";
import { setMobile } from "../../store/slices/authSlice";
import { MODAL_TYPES, useGlobalModalContext } from "../../helpers/GlobalModal";
// import DynamicForm from "../../helpers/form";

function RegistrationStep1() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<any>({
    name: "",
    phoneNumber: "",
    voucher: "",
    state: "",
    district: "",
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState<any>({});
  const [showTerms, setShowTerms] = useState(false);
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  const { showModal } = useGlobalModalContext();

  const openModal = (type: string, props: any = {}) => {
    showModal(type, props, () => {
      console.log(`${type} modal closed ✅`);
    });
  };

  const validators: Record<string, (val: any) => string | null> = {
    name: (val) => {
      if (!val || val.trim().length < 3) return "**Please enter a valid name";
      if (!/^[A-Za-z][A-Za-z0-9\s]*$/.test(val))
        return "**Name must start with a letter";
      return null;
    },
    phoneNumber: (val) => {
      if (!val) return "**Mobile number is required";
      if (!/^[6-9]\d{9}$/.test(val))
        return "**Please enter a valid 10-digit mobile number";
      return null;
    },
    voucher: (val) => {
      if (!val) return "**Please enter a voucher code";
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{12}$/.test(val))
        return "**Please enter a valid voucher code";
      return null;
    },
    state: (val) => (!val ? "**Please select a state" : null),
    district: (val) => (!val ? "**Please select a district" : null),
    agreedToTerms: (val) =>
      !val ? "**You must agree to the terms and conditions" : null,
  };

  // Find first invalid field
  const findFirstError = (data: typeof formData) => {
    for (const key of Object.keys(validators)) {
      const error = validators[key](data[key as keyof typeof formData]);
      if (error) return { field: key, message: error };
    }
    return null;
  };

  const validateField = (name: string, val: any, updatedData: any) => {
    const error = validators[name](val);
    if (!error) {
      // ✅ clear this error
      setErrors((prev: any) => ({ ...prev, [name]: "" }));

      // ✅ move to next invalid field
      const nextError = findFirstError(updatedData);
      if (nextError) {
        setCurrentStep(nextError.field);
        setErrors({ [nextError.field]: nextError.message });
      } else {
        setCurrentStep(null);
        setErrors({});
      }
    } else {
      setErrors({ [name]: error });
      setCurrentStep(name);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    let val: any = type === "checkbox" ? checked : value;

    // phone only digits
    if (name === "phoneNumber") {
      val = val.replace(/\D/g, "").slice(0, 10);
    }
    let updatedData: any;
    setFormData((prev: any) => {
      if (name === "state") {
        updatedData = { ...prev, state: val, district: "" };
        return updatedData;
      }
      updatedData = { ...prev, [name]: val };
      return updatedData;
    });
    // Validate only current step field live
    if (currentStep === name) {
      validateField(name, val, updatedData);
    }
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name } = e.currentTarget;
    if (currentStep === name) {
      validateField(name, formData[name as keyof typeof formData], formData);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const firstError = findFirstError(formData);
    if (firstError) {
      setCurrentStep(firstError.field);
      setErrors({ [firstError.field]: firstError.message });
      return;
    }

    // ✅ all valid → submit form
    console.log("Form submitted:", formData);

    const info: any = {
      name: formData.name,
      mobile: formData.phoneNumber,
      code: formData.voucher,
      state: formData.state,
      district: formData.district,
    };
    // console.log("hello API payload", info);

    // api calling.......

    dispatch(setMobile(formData.phoneNumber));
    const res: any = await API.register(info);
    console.log("hello API Response: r1", res);
    if (res) {
      navigate("/registrationStep2");
    }
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
                onKeyDown={(e) => {
                  if (
                    !/^[a-zA-Z\s]$/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Tab"
                  ) {
                    e.preventDefault();
                  }
                }}
                onInput={(e: any) => {
                  // Remove special symbols but allow letters, numbers, and spaces
                  e.target.value = e.target.value.replace(
                    /[^a-zA-Z0-9\s]/g,
                    "",
                  );
                }}
                autoComplete="off"
                onKeyUp={handleKeyUp}
              />
              {errors.name && (
                <p className={styles.validation}>{errors.name}</p>
              )}
            </div>

            {/* 
            <div className={styles.inputGroup}>
              <input
              inputMode="numeric"
                type="text"
                name="phoneNumber"
                placeholder="Enter Mobile Number"
                 value={formData.phoneNumber}
                   onChange={handleChange}
                  maxLength={10} 
              autoComplete="off"
              />
            
                {errors.phoneNumber && <span className={styles.validation}>{errors.phoneNumber}</span>}
            </div> */}

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="phoneNumber"
                inputMode="numeric"
                pattern="\d*"
                value={formData.phoneNumber}
                onChange={handleChange}
                onKeyDown={(e) => {
                  // block non-numeric keys (allow Backspace, Delete, Arrow keys, Tab)
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Delete" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight" &&
                    e.key !== "Tab"
                  ) {
                    e.preventDefault();
                  }
                }}
                onPaste={(e) => {
                  const paste = e.clipboardData.getData("text");
                  if (!/^\d+$/.test(paste)) {
                    e.preventDefault(); // block if pasted content is not digits
                  }
                }}
                maxLength={10}
                placeholder="Enter mobile number"
                autoComplete="off"
                onKeyUp={handleKeyUp}
              />
              {errors.phoneNumber && (
                <p className={styles.validation}>{errors.phoneNumber}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="voucher"
                placeholder="Voucher Code"
                value={formData.voucher}
                // onChange={handleChange}
                onChange={(e) => {
                  const upper = e.target.value.toUpperCase();
                  setFormData({ ...formData, voucher: upper });
                }}
                maxLength={12}
                onKeyUp={handleKeyUp}
                autoComplete="off"
              />
              {errors.voucher && (
                <p className={styles.validation}>{errors.voucher}</p>
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
                onKeyUp={handleKeyUp}
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
                <p className={styles.validation}>{errors.state}</p>
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
                name="district"
                value={formData.district}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                id="SD"
                className={styles.customSelect}
                disabled={!formData.state}
              >
                <option value="" disabled selected hidden>
                  Select District
                </option>

                {DISTRICT.map((name, i) => (
                  <option key={i} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className={styles.validation}>{errors.district}</p>
              )}
            </div>

            <div className={styles.checkboxInputGroup}>
              <div className={styles.checkboxWrapper}>
                {/* Checkbox + label */}
                <div className={styles.checkboxLabel}>
                  <label className={styles.checkboxOnly}>
                    <input
                      type="checkbox"
                      name="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={handleChange}
                      onKeyUp={handleKeyUp}
                    />
                    <span className={styles.customCheckbox}></span>
                  </label>

                  <span className={styles.TermsConditionsNormal}>
                    I agree to the
                  </span>
                </div>

                {/* Terms & Conditions button */}
                <button
                  type="button"
                  onClick={() => {
                    openModal(MODAL_TYPES.TERMS_CONDITIONS);
                  }}
                  className={styles.TermsConditionsBold}
                >
                  Terms & Conditions
                </button>
              </div>
            </div>

            {errors.agreedToTerms && (
              <p
                className={styles.validation}
                style={{
                  color: "#ea0c0cff",
                  fontSize: "10px",
                  fontWeight: 200,
                }}
              >
                {errors.agreedToTerms}
              </p>
            )}
            <div className={styles.buttonSection}>
              <button type="submit">Next</button>
            </div>
          </form>
        </div>
        {/* <DynamicForm
      type="registrationStep1"
      formData={formData}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      extraOptions={{
        state: STATES,
        district:DISTRICT,
      }}
    /> */}
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
        <div>{/* <Image src={sucessTickMark} alt="sucessTickMark" /> */}</div>
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
