import Popup from "../../helpers/Popup";
import "./index.scss";

const ContactUsPopup = () => {
  return (
    <Popup className="contact-us-popup" title={"Contact Us"}>
      {/*<p className="text3">Customer support:<br/><a href={"mailto:koreannoodlescontest@pinelabs.com"}>koreannoodlescontest@pinelabs.com</a></p>*/}
      {/*<p className="text3"> Support number:<br/><a href={"tel:+08069806393"}>080-69806393</a></p>*/}
      <p className="text1">FOR ANY QUERIES</p>
      <p className="text2">EMAIL US:</p>
      <p className="text3">indiahelpline@cocacola.com</p>
      <p className="text4">OR</p>
      <p className="text5">CALL US TOLL FREE AT:</p>
      <p className="text6">1800 208 2653</p>
      <p className="text7">9:00am - 9:00pm(Mon-Sat)</p>
      <p className="text8">9:00am - 6:00pm(Sun)</p>
    </Popup>
  );
};

export default ContactUsPopup;
