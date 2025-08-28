import React from "react";
import "./T&C.scss";
import { useNavigate } from "react-router-dom";

const ContactUs: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="contact-container">
      {/* Back Arrow */}
      <div className="back-arrow"onClick={() => navigate(-1)}>←</div>

      {/* Title */}
      <h1 className="title">Terms & conditions</h1>

      {/* Contact Info */}
      <div className="contact-info">
    

  {/* <h1>Terms &amp; Conditions — Lloyd Onam &amp; Diwali Consumer Campaign</h1> */}

  <ol >
    <li>
      <strong>Offer / Program Details, Concept and Participation</strong>
      <ol className="roman">
        <li>These terms apply to the Lloyd Onam and Diwali Consumer Campaign ("Offer").</li>
        <li>Sponsored by HAVELLS INDIA LIMITED and conducted by Pine Labs Limited ("Agency").</li>
        <li>Participation: scan QR on scratch card → visit microsite → fill details &amp; upload alphanumeric Unique Code from scratch panel.</li>
        <li>
          Offer validity:
          <ol  className="roman">
            <li>Onam: invoice dated 1 Aug 2025 – 10 Sep 2025.</li>
            <li>Diwali: invoice dated 21 Sep 2025 – 04 Nov 2025 (campaign period note: elsewhere mentions 09 Nov—refer to final copy for consistency).</li>
          </ol>
        </li>
        <li>Offer valid only in India; open to Indian citizens (not foreign nationals).</li>
        <li>Applicable on selected Lloyd product models, subject to stock and campaign end date.</li>
        <li>Participation outside the Offer Period is ineligible.</li>
      </ol>
    </li>

    <li>
      <strong>Agreement to Terms and Conditions</strong>
      <ol  className="roman">
        <li>By participating, participants accept these T&amp;Cs and the decisions of HAVELLS INDIA LIMITED.</li>
        <li>HAVELLS may exclude persons for misconduct/criminal record and may modify/terminate the Offer at its discretion.</li>
        <li>If the Offer is interfered with (fraud, technical problems, force majeure), HAVELLS may invalidate entries or suspend/modify/cancel the Offer.</li>
      </ol>
    </li>

    <li>
      <strong>Rights to use data — By participating</strong>
      <ol  className="roman">
        <li>Participants confirm they have read the Program T&amp;Cs and privacy policy regarding data collection, retention and sharing.</li>
        <li>Personal data may be used by HAVELLS and its partners/affiliates for marketing, analysis, and internal study.</li>
        <li>Participants can opt out of third-party communications directly with that third party.</li>
        <li>HAVELLS / Agency is not responsible for SMS delivery failures, spam generation, handset/operator issues, or DND registrations affecting message delivery.</li>
      </ol>
    </li>

    <li>
      <strong>Eligibility</strong>
      <ol  className="roman">
        <li>Open to India residents only; excludes employees, family members, agents, distributors, retailers and other channel partners of HAVELLS/Agency.</li>
        <li>Offer applicable only on selected Lloyd products.</li>
        <li>Participation implies consent to be contacted even if registered on NDNC/DND due to voluntary participation.</li>
      </ol>
    </li>

    <li>
      <strong>Program Timings</strong>
      <ol  className="roman">
        <li>Participation window: 00:00:01 – 23:59:59 during the Offer Period.</li>
        <li>Entries outside the Program Period are not eligible for winner selection.</li>
      </ol>
    </li>

    <li>
      <strong>Prize</strong>
      <ol className="roman">
        <li>
          <em>Onam Program — possible rewards (any one):</em>
          <ol  className="roman">
            <li>Cashback ₹300 + assured bundle cashback ₹25,000 (redeemable via Amazon/Zomato/UPI/NEFT).</li>
            <li>Havells product + assured bundle cashback ₹25,000.</li>
            <li>Lloyd product + assured bundle cashback ₹25,000.</li>
          </ol>
        </li>
        <li>
          <em>Diwali Program — possible rewards (any one):</em>
          <ol>
            <li>Cashback ₹300 + assured bundle cashback ₹25,000.</li>
            <li>Havells product + assured bundle cashback ₹25,000.</li>
            <li>Lloyd product + assured bundle cashback ₹25,000.</li>
            <li>Royal Enfield Bike + assured bundle cashback ₹25,000.</li>
            <li>Mahindra XUV Car + assured bundle cashback ₹25,000.</li>
          </ol>
        </li>
      </ol>
    </li>

    <li>
      <strong>How to Participate</strong>
      <ol  className="roman">
        <li>Purchase Lloyd product at a participating store (in-store collaterals/POSM will communicate the Offer).</li>
        <li>Collect scratch card from retailer after purchase.</li>
        <li>Scan QR on scratch card to land on microsite: <code>lloydfestivaloffortune.woohoo.in</code>.</li>
        <li>Register on microsite with:
          <ol>
            <li>Name &amp; Mobile no.</li>
            <li>OTP verification</li>
            <li>Voucher / Unique Code</li>
            <li>State (dropdown) &amp; District (dropdown)</li>
            <li>Outlet name</li>
            <li>Invoice date &amp; upload invoice</li>
            <li>Accept T&amp;C checkbox &amp; Submit</li>
          </ol>
        </li>
        <li>After registering, an animation opens showing the allocated reward.</li>
        <li>
          After invoice validation:
          <ol>
            <li>Winners of cashback + reward bundle: receive a link &amp; campaign code → two tabs (claim cashback choice &amp; claim ₹25,000 reward bundle).</li>
            <li>Winners of LLOYD/Car/Bike + reward bundle: receive link &amp; campaign code → two tabs (KYC capture (PAN &amp; address proof) &amp; claim ₹25,000 bundle).</li>
            <li>Winners of Havells product + bundle: receive link &amp; campaign code → two tabs (KYC capture (address proof) &amp; claim ₹25,000 bundle).</li>
          </ol>
        </li>
        <li>If participant details are incorrect, HAVELLS / Agency may withhold the prize and may not declare a replacement winner.</li>
      </ol>
    </li>

    <li>
      <strong>Winner Selection</strong>
      <ol  className="roman">
        <li>Each mobile number can win only once.</li>
        <li>Prize award is subject to verification by HAVELLS / Partner Agency.</li>
        <li>HAVELLS may request original packs or documents; damaged/blurred/photocopied invoices will not be accepted.</li>
        <li>HAVELLS &amp; Agency not liable for delays in redemption reflecting in customer accounts.</li>
        <li>e-wallet cashback codes are non-transferable and non-refundable; physical cash not provided.</li>
      </ol>
    </li>

    <li>
      <strong>Contacting Winners</strong>
      <ol  className="roman">
        <li>Winners will be contacted via SMS.</li>
        <li>HAVELLS / Agency may request ID documents (invoice, voter ID, passport, driving license) and proof of mobile ownership.</li>
        <li>Participants must retain scratch card with winning code.</li>
        <li>Decisions on missing documents are final and binding.</li>
      </ol>
    </li>

    <li>
      <strong>Publicity</strong>
      <ol  className="roman">
        <li>Participants permit HAVELLS to cover the Program across media and consent to use of their name/image without objection.</li>
        <li>Winners must participate in publicity activities if requested, free of charge.</li>
      </ol>
    </li>

    <li>
      <strong>Intellectual Property</strong>
      <ol  className="roman">
        <li>All IP rights in Program materials and submitted responses vest exclusively with HAVELLS.</li>
        <li>Any material submitted becomes sole property of HAVELLS and may be used in any medium.</li>
      </ol>
    </li>

    <li>
      <strong>General Conditions</strong>
      <ol  className="roman">
        <li>Participants warrant they are legally competent and information provided is true and complete.</li>
        <li>No claims will be entertained after 10 days from Program closure.</li>
        <li>Prizes are non-exchangeable, non-transferable, and cannot be converted to cash.</li>
        <li>HAVELLS may change, defer or cancel the Program at any time; decisions are final.</li>
        <li>Participation does not create any partnership or agency relationship.</li>
      </ol>
    </li>

    <li>
      <strong>Release and Limitations of Liability</strong>
      <ol  className="roman">
        <li>HAVELLS and Agency are not liable for any loss, damage, injury or consequential loss arising from the Program or prize acceptance.</li>
        <li>Participants indemnify HAVELLS and Agency against any loss, claims, or legal costs arising from participation.</li>
      </ol>
    </li>

    <li>
      <strong>Dispute</strong>
      <ol  className="roman">
        <li>All disputes are subject to the courts at Delhi, India, and governed by Indian law.</li>
      </ol>
    </li>

    <li>
      <strong>Support &amp; Contact</strong>
      <ol  className="roman">
        <li>For queries: <a href="mailto:lloydfortunefestivesupport@pinelabs.com">lloydfortunefestivesupport@pinelabs.com</a> or call 080-64534477 (Mon–Sat, 9:00 AM to 6:00 PM; closed on public/bank holidays).</li>
      </ol>
    </li>
  </ol>


      </div>
    </div>
  );
};

export default ContactUs;
