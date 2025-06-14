import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../api/api";
import type { userState } from "../UserData";

interface AuthState {
  user: null | userState; // Replace UserType with your user type
  loading: boolean;
  error: null | string; // Or a more specific error type
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/logout");
      console.log(response, "logout user");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

const LogoutSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // your other reducers...
  },
  extraReducers: (builder) => {
    builder
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null; // Clear user data
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Provide fallback message
      });
  },
});

export default LogoutSlice.reducer;
