/* eslint-disable @typescript-eslint/no-explicit-any */
import * as CryptoJS from "crypto-js";
import jsSHA from "jssha";
import { store } from "../store/store";

const defaultHeaders: { [key: string]: string } = {
  Accept: "*/*",
};
export async function getAuthHeaders() {
  const accessDetails: any = await store.getState().auth;

  // if (!accessDetails?.accessToken) {
  //   throw new Error("No access token found!");
  // }

  return {
    ...defaultHeaders,
    Authorization: `Bearer ${accessDetails.accessToken}`,
  };
}

export async function sendKycEncryptedData(
  url: string,
  formData: {
    name: string;
    email: string;
    address1: string;
    address2: string;
    pincode: string;
    state: string;
    city: string;
    panNumber: string;
    pan: File;
    selfieImage: File;
    nocForm: File;
  },

  method = "POST",
  //   headers = defaultHeaders
) {
  const accessDetails: any = await store.getState().auth;
  if (!accessDetails?.userKey || !accessDetails?.dataKey) {
    return Promise.reject({
      code: 401,
      message: "Session not found! Please refresh",
    });
  }

  const userKey = accessDetails.userKey;
  const dataKey = accessDetails.dataKey;

  // 1. Encrypted payload (only text fields)
  const payload: any = {
    name: formData.name,
    email: formData.email,
    address1: formData.address1,
    address2: formData.address2,
    pincode: formData.pincode,
    state: formData.state,
    city: formData.city,
    panNumber: formData.panNumber,
    userKey,
    t: Date.now(),
  };

  // console.log(payload, "payload");

  const dAr = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
  const dr = CryptoJS.enc.Base64.stringify(dAr);
  const hd = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(payload.t.toString()),
  );

  const shaObj = new jsSHA("SHA-256", "TEXT");
  shaObj.setHMACKey(dataKey.substr(4, 14), "TEXT");
  shaObj.update(hd + "." + dr);
  const hmac = shaObj.getHMAC("HEX");
  const k1 = CryptoJS.enc.Utf8.parse(hmac);
  const k2 = CryptoJS.enc.Base64.stringify(k1);

  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const r1 = Math.floor(Math.random() * 6) + 1;
  const r2 = Math.floor(Math.random() * 7) + 2;
  for (let i = 0; i < r2; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  const f_str = String(r2) + String(r1) + k2.slice(0, r1) + text + k2.slice(r1);

  const out = hd + "." + dr + "." + f_str;

  // 2. Build FormData
  const fd = new FormData();
  fd.append("userKey", userKey);
  fd.append("data", out); // ✅ encrypted user details

  // 3. Append PAN file (raw)
  if (formData.pan) {
    fd.append("pan", formData.pan, formData.pan.name);
  }
  fd.append("selfieImage", formData.selfieImage, formData.selfieImage.name);
  fd.append("nocForm", formData.nocForm, formData.nocForm.name);

  let headers = await getAuthHeaders();

  // 4. Send request
  let fullUrl = `${import.meta.env.VITE_API_BASE_URL}${url}${userKey}?t=${Date.now()}`;

  return fetch(fullUrl, {
    method,
    headers: headers,
    body: fd,
  });
}
