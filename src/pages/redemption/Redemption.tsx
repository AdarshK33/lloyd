import { useNavigate } from "react-router-dom";
import  { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";

// imageOnaCircle
import styles from "./resemption.module.scss";
// import { toast } from "react-toastify";
import CommonBase from "../../components/Popups/common/CommonBase";
import API from "../../api";
import { setUserKey } from "../../store/slices/authSlice";
import { store } from "../../store/store";

function Redemption() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

   const state = store.getState();
    const {mobile} = state.auth;

    console.log(mobile,"mmmmmmmmmmm")
const [formData, setFormData] = useState({
    mobile: mobile,
    code: "",
  });


const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors:any = {};

    if (!formData.mobile.trim()) {
      newErrors.mobile = "**Mobile number is required";
    } 

     else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile= "**Please enter a valid 10-digit mobile number";
    }

    if (!formData.code.trim()) {
      newErrors.code = "**Code is required";
    }
    //  else if (!/^\d{4,}$/.test(formData.code)) {
    //   newErrors.code = "**Code must be at least 4 digits";
    // }

    return newErrors;
  };
   const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };


  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   handleClickVerificatonOtp();
  //   const value = checkValidations();
  // };

   const handleSubmit = async(e: any) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      console.log("Redemption submitted:", formData);

      //    const info: any= {
      //     mobile: formData.mobile,
      //     code: formData.code,
      // };
      // console.log("hello API payload", info);
 const res: any = await API.sendRedeemOTP({mobile: formData.mobile,
          code: formData.code});
      console.log("hello API Response:", res);
      if(res.statusCode===200){
       navigate("/verificationRedeemOtp");
      }
      // Proceed with API or next step
    } else {
      setErrors(validationErrors);
    }
  };

  // 


useEffect(() => {
  const fetchData = async () => {
    try {
      const res: any = await API.createUserRedeem();
      console.log("hello API Response:", res);
        
            dispatch(setUserKey(res)) //update userkey


      //       if(res){
      //       // const res: any = await API.getAllReward();
      // // console.log("hello API Response:", res);
      //       }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);

  return (
    <>
       <CommonBase>
          <div className={styles.formSection}>
        <form onSubmit={handleSubmit} className={styles.redemptionForm}>
      <div className={styles.formHeadline}>
        <h2 className={styles.redemptionHeadline}>Redemption</h2>
      </div>



          <div className={styles.inputGroup}>
                <input
                  inputMode="numeric"
                  pattern="\d*"
                 
                  type="text"
          name="mobile"
          placeholder="Enter Mobile Number"
          value={formData.mobile}
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
                
                  autoComplete="off"
                />
                 {errors.mobile && (
          <span className={styles.validation}>{errors.mobile}</span>
        )}
              </div>

      {/* <div className={styles.inputGroup}>
        <input
          type="text"
          name="mobile"
          placeholder="Enter Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
        />
        {errors.mobile && (
          <span className={styles.validation}>{errors.mobile}</span>
        )}
      </div> */}

      <div className={styles.inputGroup}>
        <input
          type="text"
          name="code"
          placeholder="Enter Code"
          value={formData.code}
          onChange={handleChange}
        />
        {errors.code && (
          <span className={styles.validation}>{errors.code}</span>
        )}
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

export default Redemption;
