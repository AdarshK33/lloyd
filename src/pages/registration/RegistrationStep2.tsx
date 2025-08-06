import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";

// imageOnaCircle
import styles from "./registrationStep1.module.scss";
import { toast } from "react-toastify";
import CommonBase from "../../components/Popups/common/CommonBase";
import Dropzone from "react-dropzone";
import uploadIcon from "../../assets/images/UploadSimple.svg";

function RegistrationStep2() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    outletName: "",
    invoiceNumber: "",
    // checkbox: false,
  });

  const [newErrors, setError] = useState<any>({});
  // const [phoneError, setPhoneError] = useState(false);

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e: any) => {
    const { name, type, value } = e.target;

    console.log(e, "eeeeeeeeee");
    const newValue = type === "file" ? e.target.files?.[0] : value;

    setFormData((prev: any) => ({
      ...prev,
      [name]: newValue,
    }));

    setError((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };
  const validateForm = () => {
    const errors: any = {};

    if (!formData.outletName.trim()) {
      errors.outletName = "**Outlet name is required";
    }
    if (!formData.invoiceNumber.trim()) {
      errors.invoiceNumber = "**Invoice number is required";
    } else if (!/^\d+$/.test(formData.invoiceNumber)) {
      errors.invoiceNumber = "**Invoice number must be numeric";
    }
    if (!formData.file1) {
      errors.file1 = "**Invoice 1 is required";
    }
    // file2 is optional
    return errors;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //
    // const value = checkValidations();
    // if(value==true){

    // }
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      console.log("Form submitted", formData);
      navigate("/verificationOtp");
    }
  };

  const onDrop = async (acceptedFiles: any) => {
    const formData = new FormData();
    acceptedFiles.forEach((file: any) => {
      formData.append("file", file);
    });
    setFormData((prev: any) => ({
      ...prev,
      ["file1"]: acceptedFiles,
    }));
    setError((prev: any) => ({
      ...prev,
      ["file1"]: "",
    }));
    // dispatch(mediaUploadApi(formData));
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
                name="outletName"
                placeholder="Outlet Name"
                value={formData.outletName}
                onChange={handleChange}
              />
              {newErrors.outletName && (
                <span className="validation">{newErrors.outletName}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="number"
                name="invoiceNumber"
                placeholder="Invoice number"
                value={formData.invoiceNumber}
                onChange={handleChange}
              />
              {newErrors.invoiceNumber && (
                <span className="validation">{newErrors.invoiceNumber}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <Dropzone
                onDrop={onDrop}
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
                          Upload Invoice 1
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
              {newErrors.file1 && (
                <span className="validation">{newErrors.file1}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <Dropzone
                onDrop={onDrop}
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
                          Upload Invoice 2 (optional)
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
              {/* {newErrors.file2 && (
              <span className="validation">{newErrors.file2}</span>
            )} */}
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
