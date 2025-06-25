import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export interface LoginState {
  email: string;
  password: string;
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/", {}, { withCredentials: true });
      if (!response.data.success) {
        throw new Error(response.data.message || "Login Failed");
      }
      console.log(response.data, "login response");
      return response.data;
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
        state.error = null;
      })
      .addCase(loginUserData.rejected, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});
