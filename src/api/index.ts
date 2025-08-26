import {
  BaseResponse,
  CreateUserPayload,
  CreateUserResponse,
  // kycPayload,
  // kycResponse,
  // PinCodePayload,
  // PinCodeResponse,
  Register2Payload,
  RegisterPayload,
  RegisterResponse,
  UpiPayload,
  UpiResponse,
  VerifyOtpResponse,
} from "../interface/api";
import {
  authorisedEncrytedApiCall,
  decryptData,
  sendEncrytedData,
  // sendGETEncrytedData,
} from "./encrypt";
import {
  defaultCatch,
  fetchHandler,
  fetchHandlerText,
  responseHelper,
} from "./utils";
import { getCookie } from "../lib/utils";
import { store } from "../store/store";
import { setIpDetails } from "../store/slices/ipInfoSlice";
import { IpLookupData } from "../interface";
import { sendMultipartEncryptedData } from "./formEncrypt";
import { sendKycEncryptedData } from "./kycEncrypt";

const jsonHeaders: { [key: string]: string } = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

class APIS {
  private showLoader: (loaderTitle?: string | undefined) => void = () => {};
  private hideLoader: (loaderTitle?: string | undefined) => void = () => {};
  private static instance: APIS | null = null;
  public instanceId = "TEST";
  // private static activityTimer: NodeJS.Timeout;
  private isOnline = true;

  constructor(instanceId: string) {
    this.instanceId = instanceId;
    // document.addEventListener("click", this.logActivity);
  }

  static getInstance() {
    return APIS.instance || (APIS.instance = new APIS("TEST NEW 1"));
  }

  setIsOnline(val: boolean) {
    this.isOnline = val;
  }
  getIsOnline() {
    return this.isOnline;
  }

  initialize(
    showLoader: (loaderTitle?: string | undefined) => void,
    hideLoader: () => void
  ) {
    this.showLoader = showLoader;
    this.hideLoader = hideLoader;
  }

  async createUser(): Promise<CreateUserResponse> {
    const payload: CreateUserPayload = {};
    const state = store.getState();
    const { accessToken } = state.auth;
    const masterKey = getCookie("thumsup_and_sprite-id");
    if (masterKey) {
      payload.masterKey = masterKey;
    }
    const headers = jsonHeaders;
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("utm_source")) {
      payload.utm_source = urlParams.get("utm_source");
    }
    if (urlParams.get("utm_medium")) {
      payload.utm_medium = urlParams.get("utm_medium");
    }
    if (urlParams.get("utm_campaign")) {
      payload.utm_campaign = urlParams.get("utm_campaign");
    }
    if (urlParams.get("utm_content")) {
      payload.utm_content = urlParams.get("utm_content");
    }
    if (urlParams.get("utm_term")) {
      payload.utm_term = urlParams.get("utm_term");
    }

    try {
      const ipInfo = await this.ipLookup();
      if (ipInfo) {
        payload.ipInfo = ipInfo;
        store.dispatch(setIpDetails(ipInfo));
      }
    } catch (error) {
      console.log(error);
    }
    this.showLoader("Starting session...");
    return fetch(`${import.meta.env.VITE_API_BASE_URL}collect`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    })
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }
  private ipLookup(): Promise<IpLookupData> {
    this.showLoader("Setting up...");
    return fetch("https://pro.ip-api.com/json?key=W3uwTeHN4EN2hAd")
      .then(fetchHandler)
      .then((response) => response.data)
      .finally(this.hideLoader);
  }

  sendOTP(mobile: string): Promise<BaseResponse> {
    this.showLoader("Seding OTP...");
    return sendEncrytedData("users/getOTP/", { mobile })
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }
  // verifyOTP(otp: string, token: string): Promise<VerifyOtpResponse> {
  //   this.showLoader("Verifying OTP...");
  //   return sendEncrytedData("users/verifyOTP/", { otp, token })
  //     .then(fetchHandlerText)
  //     .then(decryptData)
  //     .then(responseHelper)
  //     .catch(defaultCatch)
  //     .finally(this.hideLoader);
  // }

  verifyOTP(otp: string): Promise<VerifyOtpResponse> {
    this.showLoader("Verifying OTP...");
    return sendEncrytedData("users/verifyOTP/", { otp })
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }

  sendRedeemOTP(payload: any): Promise<BaseResponse> {
    this.showLoader("Seding OTP...");
    return sendEncrytedData("redeem/getOTP/", {...payload })
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }
  verifyRedeemOTP(otp: string): Promise<VerifyOtpResponse> {
    this.showLoader("Verifying OTP...");
    return sendEncrytedData("redeem/verifyOTP/", { otp })
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }

  register(payload: RegisterPayload): Promise<RegisterResponse> {
    // console.log(payload);
    this.showLoader("Saving details...");
    return sendEncrytedData("users/register/", payload)
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }

  registerStep2(payload: Register2Payload): Promise<RegisterResponse> {
    // console.log(payload);
    this.showLoader("Saving details...");
    return sendMultipartEncryptedData("users/enterDetails/", payload)
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }

  async createUserRedeem(): Promise<CreateUserResponse> {
    const payload: CreateUserPayload = {};
    const state = store.getState();
    const { accessToken } = state.auth;
    const masterKey = getCookie("thumsup_and_sprite-id");
    if (masterKey) {
      payload.masterKey = masterKey;
    }
    const headers = jsonHeaders;
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("utm_source")) {
      payload.utm_source = urlParams.get("utm_source");
    }
    if (urlParams.get("utm_medium")) {
      payload.utm_medium = urlParams.get("utm_medium");
    }
    if (urlParams.get("utm_campaign")) {
      payload.utm_campaign = urlParams.get("utm_campaign");
    }
    if (urlParams.get("utm_content")) {
      payload.utm_content = urlParams.get("utm_content");
    }
    if (urlParams.get("utm_term")) {
      payload.utm_term = urlParams.get("utm_term");
    }

    try {
      const ipInfo = await this.ipLookup();
      if (ipInfo) {
        payload.ipInfo = ipInfo;
        store.dispatch(setIpDetails(ipInfo));
      }
    } catch (error) {
      console.log(error);
    }
    this.showLoader("Starting session...");
    return fetch(`${import.meta.env.VITE_API_BASE_URL}redeem/collect`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    })
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }

  async getReward(): Promise<CreateUserResponse> {
    const accessDetails: any = await store.getState().auth;
    console.log(accessDetails, "hello 1 aaaaaaaaaaaaa");
    const userKey = accessDetails.userKey;
    // const dataKey = accessDetails.dataKey;
    const headers = {
      ...jsonHeaders, // contains "Content-Type": "application/json"
      Authorization: `Bearer ${accessDetails.accessToken}`,
    };
    this.showLoader("Starting session...");
    return fetch(
      `${import.meta.env.VITE_API_BASE_URL}/users/getReward/${userKey}`,
      {
        method: "GET",
        headers,
      }
    )
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }
  async getAllReward(): Promise<CreateUserResponse> {
    const accessDetails: any = await store.getState().auth;
    console.log(accessDetails, "hello 1 aaaaaaaaaaaaa");
    const userKey = accessDetails.userKey;
    // const dataKey = accessDetails.dataKey;
    // ✅ Merge json headers with Authorization
    const headers = {
      ...jsonHeaders, // contains "Content-Type": "application/json"
      Authorization: `Bearer ${accessDetails.accessToken}`,
    };

    this.showLoader("Starting session...");
    return fetch(
      `${import.meta.env.VITE_API_BASE_URL}redeem/getRewardDetails/${userKey}`,
      {
        method: "GET",
        headers,
      }
    )
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }
  upiIdApi(payload: UpiPayload): Promise<UpiResponse> {
    // console.log(payload);
    this.showLoader("Saving details...");
    return sendEncrytedData("redeem/submitUpiDetails/", payload)
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }

  //   pinCodeApi(payload: PinCodePayload): Promise<PinCodeResponse> {
  //   // console.log(payload);
  //   this.showLoader("Saving details...");
  //   return sendEncrytedData("redeem/pincode/", payload)
  //     .then(fetchHandlerText)
  //     .then(decryptData)
  //     .then(responseHelper)
  //     .catch(defaultCatch)
  //     .finally(this.hideLoader);
  // }

  addKYC(payload:any): Promise<any> {
    // console.log(payload);
    this.showLoader("Saving details...");
    return sendKycEncryptedData("redeem/kyc/", payload)
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }
  authorisedApi(): Promise<BaseResponse> {
    console.log("hello ");
    this.showLoader();
    return authorisedEncrytedApiCall("users/path/")
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }

  allTokenApi(url: any, payload: any): Promise<BaseResponse> {
    console.log("hello ");
    this.showLoader();
    return authorisedEncrytedApiCall(url, payload)
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }
}
const API = APIS.getInstance();

export default API;
