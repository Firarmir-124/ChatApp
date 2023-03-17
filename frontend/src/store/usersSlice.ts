import {GlobalError, User, ValidationError} from "../types";
import {createSlice} from "@reduxjs/toolkit";

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
  reducers: {},
  extraReducers: () => {

  }
});

export const usersReducer = userSlice.reducer;