// import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import listIcon from "../../../assets/images/List.png";
import logo from "../../../assets/images/logo.svg";
import imageOnaCircle from "../../../assets/images/CircleOna.png";
// import buyUnlock from "../../../assets/images/buyUnlock.png";
import PersonWithItem from "../../../assets/images/PersonWithItem.png";

import styles from "./commonBase.module.scss";
import { useLocation } from 'react-router-dom';
import { MODAL_TYPES, useGlobalModalContext } from "../../../helpers/GlobalModal";

type Props = {
  children: React.ReactNode;
};
function CommonBase({ children }: Props) {
    const { showModal } = useGlobalModalContext();


  //  const navigate = useNavigate();
   const location = useLocation();

    const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = (e:any) => {
    e.preventDefault();
    setIsNavOpen(false);
  };
  
  const openModal = (type: string, props: any = {}) => {
  showModal(type, props, () => {
    console.log(`${type} modal closed ✅`);
  });
};

  return (
    <>
  
      <div className={styles.container}>
       {/* <div className={location.pathname === "/verificationOtp" ||"/redemption"  ? styles.bg_custom : styles.bg}> */}
       <div
  className={
    location.pathname === "/verificationOtp" || location.pathname === "/redemption"||location.pathname === "/registrationStep2"
      ? styles.bg_custom
      : location.pathname === "/kyc" ||location.pathname === "/registrationStep1" ||location.pathname === "/cashBack"
      ? styles.bg
      : styles.bg_custom
  }
>
          <div className={styles.header}>
             <div
        className={` ${isNavOpen ? "overlay active" : ""}`}
        onClick={closeNav}
      ></div>
            <div className={`sidenav ${isNavOpen ? "open" : ""}`}>
              <a href={`${import.meta.env.BASE_URL}`} className="closebtn" onClick={closeNav}>
                &times;
              </a>
               <a  onClick={(e) => {
                 openModal(MODAL_TYPES.TERMS_CONDITIONS);
                  closeNav(e);
                 }}>Terms & conditions</a>

        <a  onClick={(e) => {
  openModal(MODAL_TYPES.CONTACT_US);
   closeNav(e);
  }}>Contact Us</a>

            </div>
            <div className={styles.logo}>
              <img src={logo} alt="logo"
               decoding="async"
               {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
              ></img>
            </div>
            {/* {isNavOpen && <div className={styles.overlay} onClick={closeNav}></div>} */}
            <div className={styles.leftImage}  onClick={toggleNav}>
              <img src={listIcon} alt="listIcon"  onClick={toggleNav}
               decoding="async"
               {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
              />
            </div>
          </div>
          <div className={styles.onaCircle}>
           
              <img src={imageOnaCircle} alt="imageOnaCircle"
               decoding="async"
               {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
              ></img>
          
          </div>
          <div className={styles.itemSection}>
        
              <img src={PersonWithItem} alt="PersonWithItem" 
               decoding="async"
               {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
              ></img>
         
          </div>
       {/* {children} */}
 <>{children}</>
        </div>
      </div>
    </>
  );
}

export default CommonBase;
