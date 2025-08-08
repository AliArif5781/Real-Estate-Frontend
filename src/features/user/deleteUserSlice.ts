import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchApiPost } from "../../api/api";
import toast from "react-hot-toast";
import type { userData } from "../../pages/AdminDashboard/Dashboard";

interface UserState {
  users: userData[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await searchApiPost.delete(`/api/user/${userId}`);
      console.log(response.data, "rs");
      if (response.data.success) {
        toast.success(response.data.message || "User deleted successfully");
        return userId;
      }
      return rejectWithValue(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete user");
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

const deleteUserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(
          (user: userData) => user._id !== action.payload
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default deleteUserSlice.reducer;
