import React from "react";
import "./contactUs.scss";

interface ContactUsPopupProps {
  hideModal: () => void;
}

const ContactUs: React.FC<ContactUsPopupProps> = ({ hideModal }) => {
   
  return (
    <div className="contact-container">
      {/* Back Arrow */}
      <div className="back-arrow" onClick={() => hideModal()}>←</div>

      {/* Title */}
      <h1 className="title">Contact Us</h1>

      {/* Contact Info */}
      <div className="contact-info">
        <div className="phone">
          <p>
            <strong>Phone:</strong>{" "}
            <span className="highlight">080-64534477</span>
          </p>
        </div>

        <div className="email">
          <p>
            <strong>Support Email:</strong>
          </p>
          <p className="highlight">
            lloydfortunefestivesupport@pinelabs.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
