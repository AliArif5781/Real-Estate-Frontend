import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchApiPost } from "../../api/api";
import toast from "react-hot-toast";
import type { userData } from "../../pages/AdminDashboard/Dashboard";

interface UserState {
  users: userData[];
  count: number;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  count: 0,
  loading: false,
  error: null,
};

export const getAllUserDetail = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await searchApiPost.get("/api/user/getAllUserDetail");
      console.log(response.data, "response === users ===== count");
      return {
        users: response.data.getAllUser,
        count: response.data.count,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

const allUserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.count = action.payload.count;
      })
      .addCase(getAllUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default allUserSlice.reducer;
