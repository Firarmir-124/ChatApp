import {GlobalError, User, ValidationError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {login, register, logout} from "./usersThunk";
import {RootState} from "../../app/store";

interface usersType {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  logoutLoading: boolean;
}

const initialState: usersType = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  logoutLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, {payload: user}) => {
      state.registerLoading = false;
      state.user = user;
    });
    builder.addCase(register.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, {payload: user}) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(login.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(logout.pending, (state) => {
      state.logoutLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.logoutLoading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.logoutLoading = false;
    });
  }
});

export const usersReducer = userSlice.reducer;
export const {unsetUser} = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectRegisterLoading = (state: RootState) => state.user.registerLoading;
export const selectRegisterError = (state: RootState) => state.user.registerError;
export const selectLoginLoading = (state: RootState) => state.user.loginLoading;
export const selectLoginError = (state: RootState) => state.user.loginError;
export const selectLogoutLoading = (state: RootState) => state.user.logoutLoading;