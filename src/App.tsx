import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { useGlobalLoaderContext } from "./helpers/GlobalLoader";
import API from "./api";
import { ROUTES } from "./lib/consts";
import { preloadAnimations } from "./lib/utils";

// Lazy load pages
const Home = lazy(() => import("./pages/home/Home"));
const RegistrationStep1 = lazy(
  () => import("./pages/registration/RegistrationStep1"),
);
const RegistrationStep2 = lazy(
  () => import("./pages/registration/RegistrationStep2"),
);
const VerificationOtp = lazy(
  () => import("./pages/verificationOtp/VerificationOtp"),
);
const Redemption = lazy(() => import("./pages/redemption/Redemption"));
const CashBack = lazy(() => import("./pages/cashBack/CashBack"));
const KYC = lazy(() => import("./pages/kyc/kyc"));
const RewardScreen = lazy(() => import("./pages/congrats/RewardScreen"));
const OtpRedeemVerification = lazy(
  () => import("./pages/verificationRedeemOtp/VerificationRedeemOtp"),
);

function App() {
  const { showLoader, hideLoader } = useGlobalLoaderContext();

  useEffect(() => {
    API.initialize(showLoader, hideLoader);

    window.addEventListener("online", () => {
      API.setIsOnline(true);
    });
    window.addEventListener("offline", () => {
      API.setIsOnline(false);
    });
  }, [showLoader, hideLoader]);

  useEffect(() => {
    preloadAnimations();
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<div className="loader">Loading...</div>}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route
            path={ROUTES.RegistrationStep1}
            element={<RegistrationStep1 />}
          />
          <Route
            path={ROUTES.RegistrationStep2}
            element={<RegistrationStep2 />}
          />
          <Route path={ROUTES.VerificationOtp} element={<VerificationOtp />} />
          <Route path={ROUTES.Redemption} element={<Redemption />} />
          <Route path={ROUTES.CashBack} element={<CashBack />} />
          <Route path={ROUTES.KYC} element={<KYC />} />
          <Route path={ROUTES.REWARDSCREEN} element={<RewardScreen />} />
          <Route
            path={ROUTES.VERIFICATIONREDEEMOTP}
            element={<OtpRedeemVerification />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
