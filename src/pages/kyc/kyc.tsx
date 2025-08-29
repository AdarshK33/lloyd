// import { useNavigate } from "react-router-dom";
import  { useEffect, useState } from "react";
// import { useAppDispatch } from "../../store/hooks";

// imageOnaCircle
import styles from "./kyc.module.scss";
// import { toast } from "react-toastify";
import CommonBase from "../../components/Popups/common/CommonBase";
import rewardBundle from "../../assets/images/rewardBundle.png";
import Claro from "../../assets/images/Claro 3 JAR 1.svg";
import sucessTickMark from "../../assets/images/sucessTickMark.svg";
// import close from "../../assets/images/close.svg";
import Dropzone from "react-dropzone";
import uploadIcon from "../../assets/images/UploadSimple.svg";
import API from "../../api";

function KYC() {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    add1: "",
    add2: "",
    pinCode: "",
    state: "",
    city: "",
    file1: "",
    panCard: "",
    file2: "",
    file3: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [fileName1, setFileName1] = useState("");
  const [fileName2, setFileName2] = useState(""); // store selected file name
  const [fileName3, setFileName3] = useState(""); // store selected file name
  // store selected file name

  // const [panForm, setPanForm] = useState(true);
  const panForm=true;

  const [activeTab, setActiveTab] = useState("cashback");
  const [showTerms, setShowTerms] = useState(false);

  // const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validate = (): any => {
    const newErrors: any = {};

    const nameRegex = /^[A-Za-z][A-Za-z0-9\s]*$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = "**Please enter a valid name ";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "**Name must start with a letter";
    }

    if (!formData.email.trim()) {
      newErrors.email = "**Please enter email";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    ) {
      newErrors.email = "**Invalid email format";
    }

    if (!formData.add1.trim()) {
      newErrors.add1 = "**Address Line 1 is required";
    }

    if (!formData.add2.trim()) {
      newErrors.add2 = "**Address Line 2 is required";
    }

    if (!formData.pinCode.trim()) {
      newErrors.pinCode = "**Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = "**Pincode must be 6 digits";
    }

    if (!formData.state.trim()) {
      newErrors.state = "**State is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "**City is required";
    }
 
  
    if (panForm&&panForm===true) {

      

    if (!formData.panCard.trim()) {
      newErrors.panCard = "**Pancard is required";
    }
     else if (!panRegex.test(formData.panCard)) {
      newErrors.panCard = "**Invalid PAN format";
    }
     if (!formData.file3) {
      newErrors.file3 = "**Pan card image  is required";
    }
  } 

      if (!formData.file1) {
      newErrors.file1 = "**Selfie image  is required";
    }

   
    if (!formData.file2) {
      newErrors.file2 = "**Noc form  is required";
    }
  

    return newErrors;
  };

  const handleChange = (e: any) => {
    const { name, type, value } = e.target;

    const newValue = type === "file" ? e.target.files?.[0] : value;
    setFormData((prev: any) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };
  const handleSubmit = async(e: any) => {
    e.preventDefault();
  
    const validationErrors = validate();
  console.log("Submitted: pan", formData);
    if (Object.keys(validationErrors).length === 0) {
    
      if (panForm) {
        // const info: any = {
        //   name: formData.name,
        //   email: formData.email,
        //   address1: formData.add1,
        //   address2: formData.add2,
        //   pincode: formData.pinCode,
        //   state: formData.state,
        //   city: formData.city,
        //     selfieImage: formData?.file1?.[0],
        // nocForm: formData?.file2?.[0],
        //   panNumber: formData.panCard,
        //   pan: formData.file3,
        // };

   
const res: any = await API.addKYC({
  name: formData.name,
  email: formData.email,
  address1: formData.add1,
  address2: formData.add2,
  pincode: formData.pinCode,
  state: formData.state,
  city: formData.city,
  selfieImage: formData?.file1?.[0],
  nocForm: formData?.file2?.[0],
  panNumber: formData.panCard,
  pan: formData?.file3?.[0], 
});

if(res){
    setShowTerms(true)
}

     
      }
    else {
         
        // const info: any = {
        //   name: formData?.name,
        //   email: formData?.email,
        //   address1: formData?.add1,
        //   address2: formData?.add2,
        //   pincode: formData?.pinCode,
        //   state: formData?.state,
        //   city: formData?.city,
        //   selfieImage: formData?.file1,
        //   nocForm: formData?.file2,
        // };
       

      }
    } else {
      setErrors(validationErrors);
    }
  };

  const onDrop =
    (field: string, setFileName: (name: string) => void) =>
    (acceptedFiles: any) => {
      if (acceptedFiles.length > 0) {
        setFileName(acceptedFiles[0].name); // set correct file name
      }

      setFormData((prev: any) => ({
        ...prev,
        [field]: acceptedFiles, // store file(s) in formData
      }));

      setErrors((prev: any) => ({
        ...prev,
        [field]: "",
      }));
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // pin code api call
        const info: any = {
          pincode: formData.pinCode,
        };

        const res: any = await API.allTokenApi("redeem/pincode/",info);
        // dispatch(setMobile(formData.phoneNumber))
         if (res?.statusCode === 200) {
        setFormData((prev: any) => ({
          ...prev,
          state: res.state ??"",
          city: res.city ?? "",
        }));
         setErrors((prev: any) => ({
        ...prev,
          state:"",
          city: "",
      }));
      }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (formData?.pinCode?.length===6) {
      fetchData();
    }
    else{
      setFormData((prev: any) => ({
      ...prev,
      state: "",
      city: "",
    }));
    }
  }, [formData?.pinCode]);

  return (
    <>
    <TermsModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
      />
      <CommonBase>
        <div className={styles.selected_section}>
          <div className="offer-toggle-wrapper">
            <div className="offer-toggle">
              {/* Cashback tab */}
              <div
                className={`offer-tab ${
                  activeTab === "cashback" ? "active cashback" : ""
                }`}
                onClick={() => setActiveTab("cashback")}
              >
                <div className={`offer-title ${styles.offer_title}`}>
                  You’ve won a Havells Product{" "}
                </div>
                <div className={styles.imageAssured}>
                  <img src={Claro} alt="claro"></img>
                </div>

                <div className={styles.amount}>Claro JMG 3 Jar 600W REF</div>
              </div>

              {/* Reward bundle tab */}
              <div
                className={`offer-tab ${
                  activeTab === "reward" ? "active reward" : ""
                }`}
                // onClick={() => setActiveTab('reward')}
              >
                <div className={styles.imageReward}>
                  <img src={rewardBundle} alt="money"></img>
                </div>
                <div className="offer-title">Reward Bundle of</div>
                <div className={styles.amount}>₹25,000</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className="form">
            <div className={styles.formHeadline}>
              <h2 className={styles.kyc_details}>KYC Details</h2>
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                onKeyDown={(e) => {
  if (!/^[a-zA-Z\s]$/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
    e.preventDefault();
  }
}}
                autoComplete="off"
              />
              {errors.name && (
                <p className={styles.validation}>{errors.name}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="email"
                placeholder="Enter Mail Id"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.email && (
                <p className={styles.validation}>{errors.email}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="add1"
                placeholder="Enter Address Line 1"
                value={formData.add1}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.add1 && (
                <p className={styles.validation}>{errors.add1}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="add2"
                placeholder="Enter Address Line 2"
                value={formData.add2}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.add2 && (
                <p className={styles.validation}>{errors.add2}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="pinCode"
                placeholder="Enter Pincode"
                value={formData.pinCode}
                onChange={handleChange}
                inputMode="numeric"
                pattern="\d*"
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
                maxLength={6}
                autoComplete="off"
              />

              {errors.pinCode && (
                <p className={styles.validation}>{errors.pinCode}</p>
              )}
            </div>

            <div className={styles.twoInputGroup}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="state"
                  placeholder="Enter State"
                  value={formData.state}
                  onChange={handleChange}
                  autoComplete="off"
                  disabled
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter City"
                  value={formData.city}
                  onChange={handleChange}
                  autoComplete="off"
                   disabled
                />
              </div>
            </div>

            {/* <div className={styles.twoInputGroup}>
              <div className={styles.inputGroup}>
                {errors.state && (
                  <span className={styles.validation}>{errors.state}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                {errors.city && (
                  <span className={styles.validation}>{errors.city}</span>
                )}
              </div>
            </div> */}

            {panForm ? (
              <>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="panCard"
              
                    value={formData.panCard}
                    // onChange={handleChange}
                     onChange={(e) => {
    const upper = e.target.value.toUpperCase();
    setFormData({ ...formData, panCard: upper });
  }}
                  
                    maxLength={10}
                    placeholder="Enter pan card number"
                    autoComplete="off"
                  />
                  {errors.panCard && (
                    <p className={styles.validation}>{errors.panCard}</p>
                  )}
                </div>
                <div className={styles.inputGroup}>
                  <Dropzone
                    // onDrop={onDrop}
                    onDrop={onDrop("file3", setFileName3)}
                    accept={{ "image/*": [] }}
                    maxFiles={1}
                    maxSize={2 * 1024 * 1024}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        className={`${styles.inputLike} ${styles.upload_placeholder}`}
                      >
                        <input {...getInputProps()} />
                        <div className={styles.dropzoneContent}>
                          <>
                            <div
                              style={{
                                color: "#797979",
                                fontSize: "10px",
                                fontWeight: 200,
                              }}
                            >
                              {fileName3 || "Upload PANCARD image"}
                            </div>
                          </>
                          <>
                            <img
                              src={uploadIcon}
                              alt="upld"
                              className={styles.uploadIcon}
                            />
                          </>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  {errors.file3 && (
                    <p className="validation">{errors.file3}</p>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
            <div className={styles.inputGroup}>
              <Dropzone
                onDrop={onDrop("file1", setFileName1)}
                accept={{ "image/*": [] }}
                maxFiles={1}
                maxSize={2 * 1024 * 1024}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className={`${styles.inputLike} ${styles.upload_placeholder}`}
                  >
                    <input {...getInputProps()} />
                    <div className={styles.dropzoneContent}>
                      <>
                        <div
                          style={{
                            color: "#797979",
                            fontSize: "10px",
                            fontWeight: 200,
                          }}
                        >
                          {fileName1 || "Upload selfie image"}
                        </div>
                      </>
                      <>
                        <img
                          src={uploadIcon}
                          alt="upld"
                          className={styles.uploadIcon}
                        />
                      </>
                    </div>
                  </div>
                )}
              </Dropzone>
              {errors.file1 && (
                <p className="validation">{errors.file1}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <Dropzone
                // onDrop={onDrop}
                onDrop={onDrop("file2", setFileName2)}
                accept={{ "image/*": [] }}
                maxFiles={1}
                maxSize={2 * 1024 * 1024}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className={`${styles.inputLike} ${styles.upload_placeholder}`}
                  >
                    <input {...getInputProps()} />
                    <div className={styles.dropzoneContent}>
                      <>
                        <div className={styles.text_bulk_upload}>
                          {fileName2 || " Upload Noc form"}
                        </div>
                      </>
                      <>
                        <img
                          src={uploadIcon}
                          alt="upld"
                          className={styles.uploadIcon}
                        />
                      </>
                    </div>
                  </div>
                )}
              </Dropzone>
              {errors.file2 && (
                <p className="validation">{errors.file2}</p>
              )}
            </div>

            <div className={styles.buttonSection}>
            
                <button type="submit">Submit</button>
            
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

const TermsModal = ({ isOpen  }: TermsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={isOpen ? styles.show : styles.model}>
      <div className={styles.notice}>
        {/* <span id="close" className={styles.close} onClick={onClose}>
          <img src={close} alt="Close" />
        </span> */}
        <div>
          <img src={sucessTickMark} alt="sucessTickMark" />
        </div>
        <h3>Thank you for your </h3>
        <h3>  Submission! </h3>

      
       
          <p>
           You will receive your Reward shortly
          </p>
        
        
      </div>
    </div>
  );
};
export default KYC;
