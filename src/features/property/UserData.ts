import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export interface userState {
  firstName?: string;
  lastName?: string;
  isAccountVerified?: boolean;
  email?: string;
  userId?: string;
  createdAt?: string;
  role?: string;
}

interface userStateData {
  data: userState | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}
const initialState: userStateData = {
  data: null,
  loading: false,
  error: null,
  initialized: false,
};

// userDataSlice.ts
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/data");
      if (!response.data.userData) {
        throw new Error("User data not found in response");
      }
      // console.log(response.data.userData, "response userData");
      return response.data.userData; // Make sure this matches your backend response
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch user data"
      );
    }
  }
);

export const UserDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.data = null;
    },
    setUserData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
  },
  // userDataSlice.ts
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        // console.log("User data fetch pending"); // Add logging
        state.loading = true;
        // state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        // console.log("User data fetched:", action.payload); // Add logging
        state.loading = false;
        state.data = action.payload;
        state.initialized = true;
      })
      .addCase(getUserData.rejected, (state, action) => {
        // console.error("User data fetch failed:", action.payload); // Add logging
        state.loading = false;
        state.error = action.payload as string;
        state.initialized = true;
        // state.data = null;
      });
  },
});

export default UserDataSlice.reducer;
