import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../../lib/utils";

export interface AuthSliceState {
  userKey: string;
  dataKey: string;
  accessToken: string;
  mobile: any;
  reward: any;
}

const initialState: AuthSliceState = {
  userKey: "",
  dataKey: "",
  accessToken: "",
  mobile: "",
  reward: "",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    setUserKey: create.reducer(
      (state, action: PayloadAction<Omit<AuthSliceState, "accessToken">>) => {
        const masterKey = getCookie("thumsup_and_sprite-id");
        if (!masterKey) {
          setCookie("thumsup_and_sprite-id", action.payload.userKey);
        }
        return { ...state, ...action.payload };
      },
    ),
    setAccessToken: create.reducer((state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      return state;
    }),
    setMobile: create.reducer((state, action: PayloadAction<string>) => {
      state.mobile = action.payload;
      return state;
    }),
    setReward: create.reducer((state, action: PayloadAction<string>) => {
      state.reward = action.payload;
      return state;
    }),
    clearAccessDetails: create.reducer(() => {
      return { ...initialState };
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    getAccessToken: (state) => state.accessToken,
    getMobile: (state) => state.mobile,
    getReward: (state) => state.reward,
    getAccessDetails: (state) => state,
  },
});

// Action creators are generated for each case reducer function.
export const {
  setAccessToken,
  clearAccessDetails,
  setUserKey,
  setMobile,
  setReward,
} = authSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { getAccessDetails, getAccessToken, getMobile, getReward } =
  authSlice.selectors;
