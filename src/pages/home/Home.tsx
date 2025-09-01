

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import listIcon from "../../assets/images/List.png";
import logo from "../../assets/images/logo.svg";
import imageOnaCircle from "../../assets/images/CircleOna.png";
import buyUnlock from "../../assets/images/buyUnlock.png";
import PersonWithItem from "../../assets/images/PersonWithItem.png";

import styles from "./Home.module.scss";
import API from "../../api";
import { useAppDispatch } from "../../store/hooks";
import { setUserKey } from "../../store/slices/authSlice";
import {  MODAL_TYPES, useGlobalModalContext } from "../../helpers/GlobalModal";

function Home() {
  const navigate = useNavigate();
const dispatch=  useAppDispatch();
  const [isNavOpen, setIsNavOpen] = useState(false);
  
    const { showModal } = useGlobalModalContext();

  //  const [response, setResponse] = useState(null)
  const handleAuthorisedApiCall = async () => {
    try {
      const res: any = await API.createUser();
      console.log("hello API Response:", res);


      if(res?.statusCode===200){
         navigate("/registrationStep1");
           dispatch(setUserKey(res))
      }
    } catch (error) {
      console.error("Error calling Home.tsx authorised API:", error);
    }
  };

  const handleClick = () => {
   handleAuthorisedApiCall ();

   
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = (e: any) => {
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
      {/* Sidenav */}
       <div
        className={` ${isNavOpen ? "overlay active" : ""}`}
        onClick={closeNav}
      ></div>
      <div className={`sidenav ${isNavOpen ? "open" : ""}`}>
        <a href={`${import.meta.env.BASE_URL}`} className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <a  onClick={(e) => {
  openModal(MODAL_TYPES.TERMS_CONDITIONS)
    closeNav(e);
  }}>Terms & conditions</a>
        {/* <a href={`${import.meta.env.BASE_URL}`}>Services</a>
        <a href={`${import.meta.env.BASE_URL}`}>Clients</a> */}
        <a    onClick={(e) => {
   openModal(MODAL_TYPES.CONTACT_US, { name: "Adarsh" })
    closeNav(e);
  }}>Contact Us</a>
  
     </div>

      {/* Main content */}
      <div className={styles.container}>
        <div className={styles.bg}>
          <div className={styles.header}>
            <div className={styles.imagelist} onClick={toggleNav}>
              <img src={listIcon} alt="option"  {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
  decoding="async"  />
            </div>
          </div>

          <div className={styles.logo}>
          
              <img src={logo} alt="logo"  {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
  decoding="async"  />
         
          </div>

          <div className={styles.onaCircle}>
           
              <img src={imageOnaCircle} alt="imageOnaCircle"
                decoding="async"
               {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
              />
            
          </div>

          <div className={styles.ticketSection}>
         
              <img src={buyUnlock} alt="buyUnlock"
               decoding="async"
               {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
              />
        
          </div>

          <div className={styles.itemSection}>
        
              <img src={PersonWithItem} alt="PersonWithItem" 
               decoding="async"
               {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
              />
           
          </div>

          <div className={styles.buttonSection}>
           
              <button onClick={handleClick}>Get Started</button>
          
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
