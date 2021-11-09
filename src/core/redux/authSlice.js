import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AUTH from "constant/auth";
import authApi from "core/API/authApi";

export const registerSlice = createAsyncThunk(
  "auth/register",
  async (payload) => {
    const data = await authApi.register(payload);
    localStorage.setItem(AUTH.TOKEN_KEY, data.user.token);
    const timeExpired = new Date(`${data.user.timeExpired} UTC+07:00`)
    localStorage.setItem(AUTH.EXPIRED_TOKEN, timeExpired.toString());
    localStorage.setItem(AUTH.STORAGE_KEY, data.user._id);
    return data.user;
  }
);
export const loginGetTokenSlice = createAsyncThunk(
  "auth/loginToken",
  async (payload) => {
    const data = await authApi.loginGetToken(payload);
    if (!!data) {
      localStorage.setItem(AUTH.TOKEN_KEY, data.token);
      const timeExpired = new Date(`${data.timeExpired} +07:00 UTC`);
    localStorage.setItem(AUTH.EXPIRED_TOKEN, timeExpired.toString());
    }

    //save expired at
  }
);
export const loginGetUserInforSlice = createAsyncThunk(
  "auth/loginUser",
  async () => {
    const data = await authApi.loginGetUserInfo();
    localStorage.setItem(AUTH.STORAGE_KEY, data.user._id);
    if (data !== null) return data.user;
    //save expired at
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    current: localStorage.getItem(AUTH.STORAGE_KEY) || {},
  },
  reducers: {},
  extraReducers: {
    [registerSlice.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [loginGetUserInforSlice.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
