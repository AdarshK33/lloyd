import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import listIcon from "../../assets/images/List.png";
import logo from "../../assets/images/logo.svg";
import rewardBundle from "../../assets/images/rewardBundle.png";
import UPI from "../../assets/images/UPI.svg";
import ZV from "../../assets/images/zomatoVoucher.svg";
import AV from "../../assets/images/amazonVoucher.svg";
import AZV from "../../assets/images/AZV.svg";
import AAV from "../../assets/images/AAV.svg";
import close from "../../assets/images/close.svg";
import sucessTickMark from "../../assets/images/sucessTickMark.svg";
import Amazon_logo from "../../assets/images/Amazon_logo 3.svg";
import gift from "../../assets/images/gift.svg";

import flipcart from "../../assets/images/flipcart.svg";

// imageOnaCircle
import styles from "./cashBack.module.scss";
import { toast } from "react-toastify";
import CommonBase from "../../components/Popups/common/CommonBase";
import API from "../../api";

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
  const [active, setActive] = useState("upi");

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [activeTab, setActiveTab] = useState("cashback");
  const [activeVoucherTab, setActiveVoucherTab] = useState("upi");
  const [showTerms, setShowTerms] = useState(false);
  const [modalType, setModalType] = useState<"cashback" | "reward">("cashback");
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
      toast.error("Please enter a valid UPI ID");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const value = checkValidations();
    if(value==true){

       const info: any= {
          upiId:name
      };
const res: any = await API.upiIdApi(info);
      //  save accesstoken authorisedApi
      if(res){
         setModalType("cashback");
    setShowTerms(true);
      }
    }
  };

  const options = [
    { id: "upi", label: "UPI", icon: logo },
    { id: "zomato", label: "Zomato Voucher", icon: logo },
    { id: "amazon", label: "Amazon Voucher", icon: logo },
  ];

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
                  <img src={gift} alt="money"></img>
                </div>
                <div className="offer-title">Assured Cashback of</div>
                <div className={styles.amount}>₹300</div>
              </div>

              {/* Reward bundle tab */}
              <div
                className={`offer-tab ${
                  activeTab === "reward" ? "active reward" : ""
                }`}
                onClick={() => setActiveTab("reward")}
              >
                <div className={styles.imageReward}>
                  <img src={rewardBundle} alt="money"></img>
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
                      <img src={UPI} alt="UPI" />
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
                        <img src={AZV} alt="Zomato Voucher active" />
                      ) : (
                        <img src={ZV} alt="Zomato Voucher not active" />
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
                        <img src={AAV} alt="Amazon Voucher active" />
                      ) : (
                        <img src={AV} alt="Amazon Voucher not active" />
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
                      name="username"
                      placeholder="Enter UPI ID"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
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

  return (
    <div className={isOpen ? styles.show : styles.model}>
      <div className={styles.notice}>
        <span id="close" className={styles.close} onClick={onClose}>
          <img src={close} alt="Close" />
        </span>
        <div>
          <img src={sucessTickMark} alt="sucessTickMark" />
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
  const voucherMenus = [
    {
      id: 1,
      name: "Amazon",
      value: "1000",
      logo: Amazon_logo,
    },
    {
      id: 2,
      name: "Flipkart",
      value: "$250",
      logo: flipcart,
    },
  ];
  return (
    <>
      <div className={styles.voucherMenuContainer}>
        {voucherMenus.map((item) => (
          <div className={styles.voucherMenuCard} key={item.id}>
            <div className={styles.voucherMenuInfo}>
              <img
                src={item.logo}
                alt={item.name}
                className={styles.voucherMenuLogo}
              />
              <div className={styles.voucherMenuDetails}>
                <div className={styles.voucherMenuName}>{item.name} Menu</div>
                <div className={styles.voucherMenuValue}>{item.value}</div>
              </div>
            </div>
            <button className={styles.redeemButton}>Redeem Now</button>
          </div>
        ))}
      </div>
    </>
  );
};
