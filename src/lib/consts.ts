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
  RegistrationStep1:"/registrationStep1",
  RegistrationStep2:"/registrationStep2",
  VerificationOtp:"/verificationOtp",
Redemption:"/redemption",
CashBack:"/cashBack",
KYC:"/kyc",
REWARDSCREEN :"/rewardScreen",
VERIFICATIONREDEEMOTP:"/verificationRedeemOtp",

};

export const STATES = [
  "Kerala",
];

export const DISTRICT = [
  "Kollam",
];

// formConfig for all form 
export const formConfig: any = {
  registrationStep1: [
    { name: "name", label: "Enter Name", type: "text", required: true },
    { name: "phoneNumber", label: "Enter Mobile Number", type: "number", required: true },
    { name: "voucher", label: "Voucher Code", type: "text" },
    { name: "state", label: "Select State", type: "select" },
    { name: "district", label: "Select District", type: "select" },
    { name: "agreedToTerms", label: "I agree to the Terms & Conditions",  type: "checkbox"},
  ],

  registrationStep2: [
    { name: "outletName", label: "Outlet Name", type: "text", required: true },
    { name: "invoiceNumber", label: "Invoice Number", type: "number", required: true },
    { name: "file1", label: "Upload Invoice 1", type: "file", required: true },
    { name: "file2", label: "Upload Invoice 2 (optional)", type: "file" },
  ],

  redemption: [
    { name: "mobile", label: "Enter Mobile Number", type: "text", required: true },
    { name: "code", label: "Enter Code", type: "number", required: true },
  ],

  kyc: [
    { name: "name", label: "Enter Name", type: "text", required: true },
    { name: "email", label: "Enter Mail Id", type: "email", required: true },
    { name: "add1", label: "Enter Address Line 1", type: "text", required: true },
    { name: "add2", label: "Enter Address Line 2", type: "text" },
    { name: "pinCode", label: "Enter Pincode", type: "text", required: true },
    { name: "state", label: "Enter State", type: "text", required: true },
    { name: "city", label: "Enter City", type: "text", required: true },
  ],
};


