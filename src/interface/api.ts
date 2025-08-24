import { IpLookupData } from ".";

export interface BaseResponse {
  statusCode: number;
  message: string;
}

export interface CreateUserPayload {
  masterKey?: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  ipInfo?: IpLookupData;
}

export interface CreateUserResponse extends BaseResponse {
  dataKey: string;
  userKey: string;
  isLoggedIn: number;
  brand: string;
  language: string;
}

export interface RegisterPayload {
  name: string;
  mobile: any;
  email: string;
  code:any;
  state:  string;
  district: string;
}
export interface UpiPayload {
  upiId: string;

}


export interface Register2Payload {
    outlet:any;
    invoiceNumber:any;
    file: any;

}


export interface kycPayload {
  name: string;
  email: string;
  address1:any;
   address2:any;
   panNumber: any;
   pincode: any
  state:  string;
  city: string;
  nocForm: any;
  image: any
}

export interface PinCodePayload {
   pinCode: any

}
export interface VerifyOtpResponse extends BaseResponse {
  accessToken: string;
}

export interface RegisterResponse extends BaseResponse {
  accessToken: string;
}


export interface UpiResponse extends BaseResponse {
  accessToken: string;


}

export interface kycResponse extends BaseResponse {
  accessToken: string;
}


export interface PinCodeResponse extends BaseResponse {
  accessToken: string;
}

