// import React from "react";
import "./RewardScreen.module.scss";
import CommonBase from "../../components/Popups/common/CommonBase";
// import EnvelopeAnimation from "../EnvelopeAnimation/EnvelopeAnimation";

const RewardScreen = () => {
  return (
      <CommonBase>
        <div className="show">
    <div className="reward-container show">
      {/* Logo */}
     

      {/* Heading */}
      <h2 className="title">Congratulations!</h2>
      <p className="subtitle">
        You have won Havells Juicer Mixer Grinder and a Reward Bundle of ₹25,000
      </p>

      {/* Prize Images */}
      {/* <div className="prizes">
        <img src="/juicer.png" alt="Juicer Mixer Grinder" className="juicer" />
        <img src="/reward.png" alt="Reward Bundle" className="reward" />
      </div> */}

  {/* <EnvelopeAnimation /> */}
      {/* Reward Card */}
      <div className="reward-card">
        <div className="left">
          Havells Juicer <br /> Mixer Grinder
        </div>
        <div className="right">
          ₹25,000/- <br /> Reward Bundle
        </div>
      </div>
    </div>
    </div>
    </CommonBase>
  );
};

export default RewardScreen;
