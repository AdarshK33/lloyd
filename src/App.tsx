import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalLoaderContext } from "./helpers/GlobalLoader";
import API from "./api";
import { ROUTES } from "./lib/consts";
import Home from "./pages/home/Home";
import RegistrationStep1 from "./pages/registration/RegistrationStep1";
import RegistrationStep2 from "./pages/registration/RegistrationStep2";
import VerificationOtp from "./pages/verificationOtp/VerificationOtp";
import Redemption from "./pages/redemption/Redemption";
import CashBack from "./pages/cashBack/CashBack";
import KYC from "./pages/kyc/kyc";
import RewardScreen from "./pages/congrats/RewardScreen";

import OtpRedeemVerification from "./pages/verificationRedeemOtp/VerificationRedeemOtp";
import EnvelopeAnimation from "./pages/EnvelopeAnimation/EnvelopeAnimation";




function App() {
  const { showLoader, hideLoader } = useGlobalLoaderContext();

  useEffect(() => {
    API.initialize(showLoader, hideLoader);

    // if (!isLoggedIn) {
    //   API.createUser().then((response) => {
    //     store.dispatch(setUserKey(response));
    //     if (!response.isLoggedIn && isLoggedIn) {
    //       logoutUser();
    //       navigate(ROUTES.REGISTER);
    //       toast.info("Your session has been expired");
    //     }
    //   });
    // }

    window.addEventListener("online", () => {
      API.setIsOnline(true);
    });
    window.addEventListener("offline", () => {
      API.setIsOnline(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.RegistrationStep1} element={<RegistrationStep1 />} />
        <Route path={ROUTES.RegistrationStep2} element={<RegistrationStep2 />} />
        <Route path={ROUTES.VerificationOtp} element={<VerificationOtp />} />
        <Route path={ROUTES.Redemption} element={<Redemption />} />
        <Route path={ROUTES.CashBack} element={<CashBack />} />
        <Route path={ROUTES.KYC} element={<KYC />} />
        <Route path={ROUTES.REWARDSCREEN} element={<RewardScreen/>} />
        <Route path={ROUTES.VERIFICATIONREDEEMOTP} element={<OtpRedeemVerification/>} />
        <Route path="/EnvelopeAnimation" element={<EnvelopeAnimation/>} />

      






      </Routes>
    </>
  );
}

export default App;
