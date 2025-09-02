export enum LANGUAGE {
  DEFAULT = "default",
  ENGLISH = "en",
  KANNADA = "ka",
  HINDI = "hi",
  MARATHI = "ma",
  BENGALI = "be",
  // HINDI = "hi",
  // MARATHI = "mr",
  // TAMIL = "ta",
  TELUGU = "ta",
  // BENGALI = "bn",
  // KANNADA = "kn",
  // MALAYALAM = "ml",
}

// List used for drop down
export const LANGUAGES: Record<LANGUAGE, string> = {
  [LANGUAGE.DEFAULT]: "Select language",
  [LANGUAGE.ENGLISH]: "EN",
  [LANGUAGE.KANNADA]: "ಕನ್ನಡ",
  [LANGUAGE.HINDI]: "हिंदी",
  [LANGUAGE.MARATHI]: "मराठी",
  [LANGUAGE.BENGALI]: "বাঙ্গালি",
  // [LANGUAGE.HINDI]: "हिन्दी",
  // [LANGUAGE.MARATHI]: "मराठी",
  // [LANGUAGE.KANNADA]: "ಕನ್ನಡ",
  [LANGUAGE.TELUGU]: "తెలుగు",
  // [LANGUAGE.TELUGU]: "TE",
  // [LANGUAGE.TAMIL]: "தமிழ்",
  // [LANGUAGE.BENGALI]: "বাংলা",
};

export const ROUTES = {
  HOME: "/",
  COUNTER: "/counter",
  RegistrationStep1: "/registrationStep1",
  RegistrationStep2: "/registrationStep2",
  VerificationOtp: "/verificationOtp",
  Redemption: "/redemption",
  CashBack: "/cashBack",
  KYC: "/kyc",
  REWARDSCREEN: "/rewardScreen",
  VERIFICATIONREDEEMOTP: "/verificationRedeemOtp",
};

export const STATES = ["Kerala"];

export const DISTRICT = ["Kollam"];

// formConfig for all form
export const formConfig: any = {
  registrationStep1: [
    { name: "name", label: "Enter Name", type: "text", required: true },
    {
      name: "phoneNumber",
      label: "Enter Mobile Number",
      type: "number",
      required: true,
    },
    { name: "voucher", label: "Voucher Code", type: "text" },
    { name: "state", label: "Select State", type: "select" },
    { name: "district", label: "Select District", type: "select" },
    {
      name: "agreedToTerms",
      label: "I agree to the Terms & Conditions",
      type: "checkbox",
    },
  ],

  registrationStep2: [
    { name: "outletName", label: "Outlet Name", type: "text", required: true },
    {
      name: "invoiceNumber",
      label: "Invoice Number",
      type: "number",
      required: true,
    },
    { name: "file1", label: "Upload Invoice 1", type: "file", required: true },
    { name: "file2", label: "Upload Invoice 2 (optional)", type: "file" },
  ],

  redemption: [
    {
      name: "mobile",
      label: "Enter Mobile Number",
      type: "text",
      required: true,
    },
    { name: "code", label: "Enter Code", type: "number", required: true },
  ],

  kyc: [
    { name: "name", label: "Enter Name", type: "text", required: true },
    { name: "email", label: "Enter Mail Id", type: "email", required: true },
    {
      name: "add1",
      label: "Enter Address Line 1",
      type: "text",
      required: true,
    },
    { name: "add2", label: "Enter Address Line 2", type: "text" },
    { name: "pinCode", label: "Enter Pincode", type: "text", required: true },
    { name: "state", label: "Enter State", type: "text", required: true },
    { name: "city", label: "Enter City", type: "text", required: true },
  ],
};

export enum ProductType {
  LLOYD_LED_43IN_GL43F4K2LR = "lloyd_led_43in_GL43F4K2LR",
  LLOYD_LED_43IN_GL43F4K2DR = "lloyd_led_43in_GL43F4K2DR",
  LLOYD_AC_1_5TON_3STAR_GLS18V3KOGSY = "lloyd_ac_1_5ton_3star_GLS18V3KOGSY",
  LLOYD_AC_1_5TON_3STAR_GLS18V3KONMY = "lloyd_ac_1_5ton_3star_GLS18V3KONMY",
  LLOYD_STUNNAIR_AC = "lloyd_stunnair_ac",
  LLOYD_WM_8KG_SEMI_AUTO = "lloyd_wm_8kg_semi_auto",
  LLOYD_WM_8_5KG_IOT_AUTO = "lloyd_wm_8_5kg_iot_auto",
  LLOYD_RETRO_DC_FRIDGE_GLDF215SPYT4LC = "lloyd_retro_dc_fridge_GLDF215SPYT4LC",
  LLOYD_RETRO_DC_FRIDGE_GLDF215SPGT4LC = "lloyd_retro_dc_fridge_GLDF215SPGT4LC",
  LLOYD_FROSTFREE_FRIDGE = "lloyd_frostfree_fridge",
  HAVELLS_CLARO_JMG_600W = "havells_claro_jmg_600w",
  CASHBACK_300 = "cashback_300",
}

// import Anim_Cashback_300 from "../assets/lottie/Cashback_and_Reward_Bundle.json";
// import  Anim_Cashback_300 from "../assets/lottie/Lloyd_Refrigerator_GLDF215SPGT4LC.json";
 import  Anim_Cashback_300 from "../assets/lottie/HavellsJuicer_MixerGrinder_and_Reward_Bundle.json";



export const ANIMATIONS = {
  Anim_Cashback_300,
};
