import {createAsyncThunk} from "@reduxjs/toolkit";
import {RegisterMutation, RegisterResponse, User, ValidationError} from "../types";
import axiosApi from "../axiosApi";
import {isAxiosError} from "axios";

export const register = createAsyncThunk<User, RegisterMutation, {rejectValue: ValidationError}>(
  'user/register',
  async (registerMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users', registerMutation);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);