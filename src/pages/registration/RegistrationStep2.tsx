import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useAppDispatch } from "../../store/hooks";

// imageOnaCircle
import styles from "./registrationStep1.module.scss";
// import { toast } from "react-toastify";
import CommonBase from "../../components/Popups/common/CommonBase";
import Dropzone from "react-dropzone";
import uploadIcon from "../../assets/images/UploadSimple.svg";
import API from "../../api";

function RegistrationStep2() {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    outletName: "",
    invoiceNumber: "",
    // checkbox: false,
  });
  const [fileName1, setFileName1] = useState(""); // store selected file name

  const [newErrors, setError] = useState<any>({});
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  // ✅ Validators (like your registration form)
  const validators: Record<string, (val: any) => string | null> = {
    outletName: (val) => {
      if (!val || !val.trim()) return "**Outlet name is required";
      return null;
    },
    invoiceNumber: (val) => {
      const strVal = String(val ?? "").trim();
      if (!strVal) return "**Invoice number is required";
      if (!/^\d+$/.test(strVal)) return "**Invoice number must be numeric";
      return null;
    },
    file1: (val) => {
      if (!val) return "**Invoice 1 is required";
      return null;
    },
    file2: () => null, // optional
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
      // ✅ clear error
      setError((prev: any) => ({ ...prev, [name]: null }));

      // ✅ move to next invalid
      const nextError = findFirstError(updatedData);
      if (nextError) {
        setCurrentStep(nextError?.field);
        setError({ [nextError?.field]: nextError?.message });
      } else {
        setCurrentStep(null);
        setError({});
      }
    } else {
      setError({ [name]: error });
      setCurrentStep(name);
    }
  };

  const handleChange = (e: any) => {
    const { name, type, value, files } = e?.target;
    const newValue = type === "file" ? files?.[0] : value;

    // ✅ Reset invoiceNumber & file1 if outletName changes
    let updatedData: any;
    setFormData((prev: any) => {
      updatedData = { ...prev, [name]: newValue };
      return updatedData;
    });

    // live validation for currentStep
    if (currentStep === name) {
      validateField(name, newValue, { ...formData, [name]: newValue });
    }

    // clear error immediately when typing
    setError((prev: any) => ({ ...prev, [name]: null }));
  };

  const handleKeyUp = (e: any) => {
    const { name } = e?.target;
    if (currentStep === name) {
      validateField(name, formData[name], formData);
    }
  };

  const onDrop =
    (field: string, setFileName: (name: string) => void) =>
    (acceptedFiles: File[], fileRejections: any[]) => {
      if (fileRejections?.length > 0) {
        // ❌ File rejected (size/type issue)
        const errorMessage = "File is larger than 5 MB"; //fileRejections[0].errors[0].message;
        setFormData((prev: any) => ({ ...prev, file1: null }));
        setError((prev: any) => ({
          ...prev,
          [field]: errorMessage,
        }));
        setFileName("");
        return; // don’t process accepted files
      }

      if (acceptedFiles.length > 0) {
        setFileName(acceptedFiles[0]?.name); // ✅ show correct file name
      }

      setFormData((prev: any) => ({
        ...prev,
        [field]: acceptedFiles, // ✅ store files
      }));

      // ✅ Clear error for this field once user uploads a valid file
      setError((prev: any) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });

      // ✅ Progressive validation forward
      if (currentStep === field) {
        const nextError = findFirstError({
          ...formData,
          [field]: acceptedFiles,
        });

        if (nextError) {
          setError({ [nextError?.field]: nextError?.message });
          setCurrentStep(nextError?.field);
        } else {
          setError({});
          setCurrentStep(null);
        }
      }
    };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const firstError = findFirstError(formData);
    if (firstError) {
      setCurrentStep(firstError?.field);
      setError({ [firstError?.field]: firstError?.message });
      return;
    }
    // console.log("Form submitted", newErrors, formData);

    // ✅ All valid → API call

    const res: any = await API.registerStep2({
      outlet: formData?.outletName,
      invoiceNumber: formData?.invoiceNumber,
      file: formData?.file1?.[0],
    });

    if (res) {
      navigate("/verificationOtp");
    }
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
                onKeyUp={handleKeyUp}
                onKeyDown={(e) => {
                  // Allow only letters, space, Backspace, Tab, and Arrow keys
                  if (
                    !/^[a-zA-Z\s]$/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Tab" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight" &&
                    e.key !== "Delete"
                  ) {
                    e.preventDefault();
                  }
                }}
                // required
                onInput={(e: any) => {
                  // Remove special symbols but allow letters, numbers, and spaces
                  e.target.value = e.target.value.replace(
                    /[^a-zA-Z0-9\s]/g,
                    "",
                  );
                }}
                autoComplete="off"
              />
              {newErrors.outletName && (
                <p className="validation">{newErrors.outletName}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="invoiceNumber"
                placeholder="Invoice number"
                value={formData.invoiceNumber}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                onInput={(e: any) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, ""); // only numbers
                }}
                autoComplete="off"
              />
              {newErrors.invoiceNumber && (
                <p className="validation">{newErrors.invoiceNumber}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <Dropzone
                onDrop={onDrop("file1", setFileName1)}
                accept={{
                  "image/jpeg": [".jpeg", ".jpg"],
                  "image/png": [".png"],
                  "image/heic": [".heic"],
                  "image/heif": [".heif"],
                  "application/pdf": [".pdf"],
                }}
                maxFiles={1}
                maxSize={4 * 1024 * 1024}
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
                          {fileName1 || "Upload Invoice 1"}
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
                <p className="validation">{newErrors.file1}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <Dropzone
                // onDrop={onDrop}
                accept={{ "image/*": [] }}
                maxFiles={1}
                maxSize={2 * 1024 * 1024}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className={`${styles.inputLike} ${styles.upload_placeholder}`}
                    style={{ cursor: "not-allowed", opacity: "0.6" }}
                  >
                    <input {...getInputProps()} disabled={true} />
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
              <button type="submit">Get Otp</button>
            </div>
          </form>
        </div>
      </CommonBase>
    </>
  );
}

export default RegistrationStep2;
