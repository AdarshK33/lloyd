import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import listIcon from "../../../assets/images/List.png";
import logo from "../../../assets/images/logo.svg";
import imageOnaCircle from "../../../assets/images/CircleOna.png";
import buyUnlock from "../../../assets/images/buyUnlock.png";
import PersonWithItem from "../../../assets/images/PersonWithItem.png";

import styles from "./commonBase.module.scss";
import { useLocation } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};
function CommonBase({ children }: Props) {

   const location = useLocation();

    const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = (e:any) => {
    e.preventDefault();
    setIsNavOpen(false);
  };

  return (
    <>
  
      <div className={styles.container}>
       <div className={location.pathname === "/verificationOtp" ? styles.bg_kyc : styles.bg}>
          <div className={styles.header}>
            <div className={`sidenav ${isNavOpen ? "open" : ""}`}>
              <a href="/" className="closebtn" onClick={closeNav}>
                &times;
              </a>
              <a href="/">About</a>
              <a href="/">Services</a>
              <a href="/">Clients</a>
              <a href="/">Contact</a>

            </div>
            <div className={styles.logo}>
              <img src={logo} alt="logo"></img>
            </div>
            {/* {isNavOpen && <div className={styles.overlay} onClick={closeNav}></div>} */}
            <div className={styles.leftImage}  onClick={toggleNav}>
              <img src={listIcon} alt="listIcon"  onClick={toggleNav}
              />

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
       {/* {children} */}
 <main className={styles.content}>{children}</main>
        </div>
      </div>
    </>
  );
}

export default CommonBase;
