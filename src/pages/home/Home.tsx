import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../store/hooks";
import listIcon from "../../assets/images/List.png";
import logo from "../../assets/images/logo.svg";
import imageOnaCircle from "../../assets/images/CircleOna.png";
import buyUnlock from "../../assets/images/buyUnlock.png";
import PersonWithItem from "../../assets/images/PersonWithItem.png";


// imageOnaCircle


import styles from "./Home.module.scss";
function Home() {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = () => {

    navigate('/registrationStep1'); // replace with your actual path
  };
  return (
    <>
      <div className={styles.container}>
        <div  className={styles.bg}>
          <div className={styles.header}>
            <div className={styles.imagelist}>
              <img src={listIcon} alt="option"></img>
            </div>
          </div>

          <div   className={styles.logo}>
            <div className={styles.imagelogo}>
              <img src={logo} alt="logo"></img>
            </div>
          </div>

          <div className={styles.onaCircle}>
            <div className={styles.imageOnaCircle}>
              <img src={imageOnaCircle} alt="imageOnaCircle"></img>
            </div>
          </div>

          <div className={styles.ticketSection}>
            <div className={styles.ticketBanner}>
              <img src={buyUnlock} alt="buyUnlock"></img>
            </div>
          </div>
          <div  className={styles.itemSection}>
            <div  className={styles.itemBanner}>
              <img src={PersonWithItem} alt="PersonWithItem"></img>
            </div>
          </div>

          <div  className={styles.buttonSection}>
            <div  className={styles.buttonBottom}>
<button  onClick={handleClick}>Get Started</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
