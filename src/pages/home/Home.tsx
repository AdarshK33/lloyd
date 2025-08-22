

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

function Home() {
  const navigate = useNavigate();
const dispatch=  useAppDispatch();
  const [isNavOpen, setIsNavOpen] = useState(false);

   const [response, setResponse] = useState(null)
  const handleAuthorisedApiCall = async () => {
    try {
      const res: any = await API.createUser();
      console.log("hello API Response:", res);

      
      dispatch(setUserKey(res))
      setResponse(res); // You can display it or handle it however you need
    } catch (error) {
      console.error("Error calling authorised API:", error);
    }
  };

  const handleClick = () => {
   handleAuthorisedApiCall ();

    navigate("/registrationStep1");
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = (e: any) => {
     e.preventDefault();
    setIsNavOpen(false);
  };

  return (
    <>
      {/* Sidenav */}
      <div className={`sidenav ${isNavOpen ? "open" : ""}`}>
        <a href="/" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <a href="/">About</a>
        <a href="/">Services</a>
        <a href="/">Clients</a>
        <a href="/">Contact</a>
      </div>

      {/* Main content */}
      <div className={styles.container}>
        <div className={styles.bg}>
          <div className={styles.header}>
            <div className={styles.imagelist} onClick={toggleNav}>
              <img src={listIcon} alt="option" />
            </div>
          </div>

          <div className={styles.logo}>
            <div className={styles.imagelogo}>
              <img src={logo} alt="logo" />
            </div>
          </div>

          <div className={styles.onaCircle}>
            <div className={styles.imageOnaCircle}>
              <img src={imageOnaCircle} alt="imageOnaCircle" />
            </div>
          </div>

          <div className={styles.ticketSection}>
            <div className={styles.ticketBanner}>
              <img src={buyUnlock} alt="buyUnlock" />
            </div>
          </div>

          <div className={styles.itemSection}>
            <div className={styles.itemBanner}>
              <img src={PersonWithItem} alt="PersonWithItem" />
            </div>
          </div>

          <div className={styles.buttonSection}>
            <div className={styles.buttonBottom}>
              <button onClick={handleClick}>Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
