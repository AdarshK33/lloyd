import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import listIcon from "../../../assets/images/List.png";
import logo from "../../../assets/images/logo.svg";
import imageOnaCircle from "../../../assets/images/CircleOna.png";
import buyUnlock from "../../../assets/images/buyUnlock.png";
import PersonWithItem from "../../../assets/images/PersonWithItem.png";

import styles from "./commonBase.module.scss";


type Props = {
  children: React.ReactNode;
};
function CommonBase({ children }: Props) {
//   const dispatch = useAppDispatch();
  //const navigate = useNavigate();





  

 
  return (
    <>
      <div className={styles.container}>
        <div className={styles.bg}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <img src={logo} alt="logo"></img>
            </div>
            <div className={styles.leftImage}>
              <img src={listIcon} alt="listIcon"></img>
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
       {children}

        </div>
      </div>
    </>
  );
}

export default CommonBase;
