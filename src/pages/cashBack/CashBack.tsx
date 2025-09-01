import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useAppDispatch } from "../../store/hooks";
// import listIcon from "../../assets/images/List.png";
// import logo from "../../assets/images/logo.svg";
import rewardBundle from "../../assets/images/rewardBundle.png";
import UPI from "../../assets/images/UPI.svg";
import ZV from "../../assets/images/zomatoVoucher.svg";
import AV from "../../assets/images/amazonVoucher.svg";
import AZV from "../../assets/images/AZV.svg";
import AAV from "../../assets/images/AAV.svg";
import close from "../../assets/images/close.svg";
import sucessTickMark from "../../assets/images/sucessTickMark.svg";
import Amazon_logo from "../../assets/images/Amazon_logo 3.svg";
import Zomato_logo from "../../assets/images/AZV.svg";

import gift from "../../assets/images/gift.svg";

import flipcart from "../../assets/images/flipcart.svg";

// imageOnaCircle
import styles from "./cashBack.module.scss";
// import { toast } from "react-toastify";
import CommonBase from "../../components/Popups/common/CommonBase";
import API from "../../api";
import { store } from "../../store/store";

//    const reward=
//     {
//   "statusCode": 200,
//   "message": "Success",
//   "rewardDetails": {
//     "normalRewards": {
//       "rewardName": "CASHBACK",
//       "isClaimed": 0
//     },
//     "bundleRewards": [
//       {
//         "rewardName": "AMAZON",
//         "isClaimed": 0
//       },
//       {
//         "rewardName": "BIGBASKET",
//         "isClaimed": 0
//       },
//       {
//         "rewardName": "RELIANCE",
//         "isClaimed": 0
//       },
//       {
//         "rewardName": "ZOMATO",
//         "isClaimed": 0
//       },
//       {
//         "rewardName": "FLIPKART",
//         "isClaimed": 0
//       },
//       {
//         "rewardName": "SWIGGY",
//         "isClaimed": 0
//       }
//     ]
//   }
// }

function CashBack() {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const state = store.getState();
  const { reward } = state?.auth;

  const [formData, setFormData] = useState({
    usernameID: "",
  });
  const [error, setError] = useState<any>({});

  const [activeTab, setActiveTab] = useState("cashback");
  const [activeVoucherTab, setActiveVoucherTab] = useState("upi");
  const [showTerms, setShowTerms] = useState(false);
  const [modalType, setModalType] = useState<"cashback" | "reward">("cashback");

  const handleChange = (e: any) => {
    const { name, type, value } = e.target;
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
    const upiRegex = /^[\w.-]{2,}@[a-zA-Z]{3,}$/;

    if (!formData.usernameID.trim()) {
      errors.usernameID = "**UPI ID is required";
    } else if (!upiRegex.test(formData.usernameID)) {
      errors.usernameID = "**Enter a valid UPI ID (e.g. username@bank)";
    }

    return errors;
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      console.log("Form submitted ✅", formData);

      // Example API call

      const info: any = {
        upiId: formData?.usernameID,
      };
      const res: any = await API.allTokenApi("redeem/submitUpiDetails/", info);
      //  save accesstoken authorisedApi
      if (res?.statusCode == 200) {
        setModalType("cashback");
        setShowTerms(true);
      }
    }
  };
  return (
    <>
      <div>
        <TermsModal
          isOpen={showTerms}
          onClose={() => setShowTerms(false)}
          type={modalType}
        />
      </div>
      <CommonBase>
        <div className={styles.tabSection}>
          <div className="offer-toggle-wrapper">
            <div className="offer-toggle">
              {/* Cashback tab */}
              <div
                className={`offer-tab ${
                  activeTab === "cashback" ? "active cashback" : ""
                }`}
                onClick={() => setActiveTab("cashback")}
              >
                <div className={styles.imageAssured}>
                  <img src={gift} alt="money"
                   decoding="async"
               {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
                  ></img>
                </div>
                <div className="offer-title">Assured Cashback of</div>
                <div className={styles.amount}>
                  ₹ ₹{reward?.normalRewards?.isClaimed}
                </div>
              </div>

              {/* Reward bundle tab */}
              <div
                className={`offer-tab ${
                  activeTab === "reward" ? "active reward" : ""
                }`}
                onClick={() => setActiveTab("reward")}
              >
                <div className={styles.imageReward}>
                  <img src={rewardBundle} alt="money"
                   decoding="async"
               {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
                  ></img>
                </div>
                <div className="offer-title">Reward Bundle of</div>
                <div className={styles.amount}>₹25,000</div>
              </div>
            </div>
          </div>

          {activeTab == "cashback" ? (
            <>
              <div className="voucher-tab-wrapper">
                <div className="voucher-tab-container">
                  {/* UPI Voucher Tab */}
                  <div
                    className={`voucher-tab ${
                      activeVoucherTab === "upi" ? "active upi" : ""
                    }`}
                    onClick={() => setActiveVoucherTab("upi")}
                  >
                    <div className={styles.imageIcon}>
                      <img src={UPI} alt="UPI"
                       decoding="async"
               {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
                      />
                    </div>
                    <div className="voucher-title">UPI</div>
                  </div>

                  {/* Zomato Voucher Tab */}
                  <div
                    className={`voucher-tab ${
                      activeVoucherTab === "zomato" ? "active zomato" : ""
                    }`}
                    onClick={() => setActiveVoucherTab("zomato")}
                  >
                    <div className={styles.imageIcon}>
                      {activeVoucherTab === "zomato" ? (
                        <img src={AZV} alt="Zomato Voucher active" 
                         decoding="async"
               {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
                        />
                      ) : (
                        <img src={ZV} alt="Zomato Voucher not active"
                         decoding="async"
               {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
                        />
                      )}
                    </div>
                    <div className="voucher-title">Zomato Voucher</div>
                  </div>
                  {/* Amazon Voucher Tab */}
                  <div
                    className={`voucher-tab ${
                      activeVoucherTab === "amazon" ? "active amazon" : ""
                    }`}
                    onClick={() => setActiveVoucherTab("amazon")}
                  >
                    <div className={styles.imageIcon}>
                      {activeVoucherTab === "amazon" ? (
                        <img src={AAV} alt="Amazon Voucher active" 
                           decoding="async"
               {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
                        />
                      ) : (
                        <img src={AV} alt="Amazon Voucher not active" 
                           decoding="async"
               {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
                        />
                      )}
                    </div>
                    <div className="voucher-title">Amazon Voucher</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <VoucherMenuList />
            </>
          )}

          {activeVoucherTab === "upi" && activeTab === "cashback" ? (
            <>
              <div className={styles.upiFormSection}>
                <form onSubmit={handleSubmit} className={styles.upiForm}>
                  <div className={styles.inputGroup}>
                    <input
                      type="text"
                      name="usernameID"
                      placeholder="Enter UPI ID"
                      value={formData.usernameID}
                      onChange={handleChange}
                      className={error.usernameID ? "inputError" : ""}
                    />
                    {error.usernameID && (
                      <p className="validation">{error.usernameID}</p>
                    )}
                  </div>

                  <div className={styles.buttonSection}>
                    <div className={styles.buttonBottom}>
                      <button type="submit">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          ) : activeVoucherTab === "zomato" && activeTab === "cashback" ? (
            <>
              <div className={styles.buttonSection}>
                <div className={styles.buttonBottom}>
                  <button
                    type="submit"
                    onClick={() => {
                      setModalType("reward");
                      setShowTerms(true);
                    }}
                  >
                    Claim now
                  </button>
                </div>
              </div>
            </>
          ) : activeVoucherTab === "amazon" && activeTab === "cashback" ? (
            <>
              <div className={styles.buttonSection}>
                <div className={styles.buttonBottom}>
                  <button
                    type="submit"
                    onClick={() => {
                      setModalType("reward");
                      setShowTerms(true);
                    }}
                  >
                    Claim now
                  </button>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </CommonBase>
    </>
  );
}

type TermsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "cashback" | "reward";
};

const TermsModal = ({ isOpen, onClose, type }: TermsModalProps) => {
  if (!isOpen) return null;
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isOpen) return;

    // Step 1: After 10 seconds → show cashback
    const kycTimer = setTimeout(() => {
      if (type == "cashback") {
        navigate("/kyc"); //
      }
    }, 10000);

    return () => clearTimeout(kycTimer);
  }, [isOpen, navigate]);

  return (
    <div className={isOpen ? styles.show : styles.model}>
      <div className={styles.notice}>
        {type == "cashback" ? (
          <></>
        ) : (
          <>
            <span id="close" className={styles.close} onClick={onClose}>
              <img src={close} alt="Close" 
                 decoding="async"
               {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
              />
            </span>
          </>
        )}

        <div>
          <img src={sucessTickMark} alt="sucessTickMark"
             decoding="async"
               {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
          />
        </div>
        <h2>Congratulations!</h2>
        {type === "cashback" ? (
          <p>
            Your cashback will be credited to the selected payout mode within
            24-48 business hours.
          </p>
        ) : (
          <p>You will receive your Reward shortly</p>
        )}
      </div>
    </div>
  );
};

export default CashBack;

const VoucherMenuList = () => {
  const state = store.getState();
  const { reward } = state.auth;
  type RewardName =
    | "AMAZON"
    | "FLIPKART"
    | "ZOMATO"
    | "BIGBASKET"
    | "RELIANCE"
    | "SWIGGY";

  const logos: Record<string, string> = {
    AMAZON: Amazon_logo,
    FLIPKART: flipcart,
    ZOMATO: Zomato_logo,
  };
  const voucherMenus: any =
    reward &&
    reward !== null &&
    reward?.bundleRewards.map((item: any, index: number) => {
      const key = item.rewardName as RewardName;
      return {
        id: index + 1,
        name: item.rewardName,
        value: `₹${item.isClaimed}`, // or some other value if API has "amount"
        logo: logos[key], // ✅ type safe
      };
    });
       const [redeemed, setRedeemed] = useState<number[]>([]);
     const handleRedeem = (id: number) => {
    setRedeemed((prev: any) => [...prev, id]); // add to redeemed list
  };
  return (
    <>
      <div className={styles.voucherMenuContainer}>
        {voucherMenus &&
          voucherMenus !== null &&
          voucherMenus !== undefined &&
          voucherMenus.map((item: any) => 
            
            {
                const isRedeemed = redeemed.includes(item.id);
              
              return(
            
            <div className={styles.voucherMenuCard} key={item.id} 
             style={{
                opacity: isRedeemed ? 0.5 : 1, // 🔹 reduce opacity if redeemed
                pointerEvents: isRedeemed ? "none" : "auto", // prevent clicks
                background: isRedeemed ? "#b289f4ff" :"white"
              }}
            >
              <div className={styles.voucherMenuInfo}>
                <img
                  src={item.logo}
                   decoding="async"
               {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
                  alt={item.name}
                  className={styles.voucherMenuLogo}
                />
                <div className={styles.voucherMenuDetails}>
                  <div className={styles.voucherMenuName}>
                    {" "}
                    {item?.name.charAt(0).toUpperCase() +
                      item?.name.slice(1).toLowerCase()}{" "}
                    Voucher
                  </div>
                  <div className={styles.voucherMenuValue}>{item.value}</div>
                </div>
              </div>
            <button
                className={styles.redeemButton}
                onClick={() => handleRedeem(item.id)}
                disabled={isRedeemed} // disable button after redeem
              >
                {isRedeemed ? "Redeemed" : "Redeem Now"}
              </button>
            </div>
          )
        
})}
      </div>
    </>
  );
};
