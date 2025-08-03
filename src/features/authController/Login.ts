import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export interface LoginState {
  email: string;
  password: string;
  userId?: string;
  role?: string;
}

interface userloginState {
  userData: LoginState | null;
  loading: boolean;
  error: string | null;
}

const initialState: userloginState = {
  userData: null,
  loading: false,
  error: null,
};

export const loginUserData = createAsyncThunk(
  "data/login",
  async (loginData: LoginState, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/login",
        {
          email: loginData.email,
          password: loginData.password,
          userId: loginData.userId,
        },
        { withCredentials: true }
      );
      if (!response.data.success) {
        throw new Error(response.data.message || "Login Failed");
      }

      // console.log(response.data.userData, "login response");
      return response.data.userData;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || "Login Failed");
    }
  }
);

export const userData = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
