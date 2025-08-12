import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchApiPost } from "../../api/api";
import toast from "react-hot-toast";
import type { Property } from "../../components/PropertyCard";

interface UserState {
  property: Property[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  property: [],
  loading: false,
  error: null,
};

export const deletePropertyData = createAsyncThunk(
  "users/deleteUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await searchApiPost.delete(`/api/property/${userId}`);
      if (response.data.success) {
        toast.success(response.data.message || "Property deleted successfully");
        return userId;
      }
      console.log(response.data, "deletePropety");
      return rejectWithValue(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete Property");
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete Property"
      );
    }
  }
);

const deletePropertySlice = createSlice({
  name: "deletePropertySlice",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.property = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deletePropertyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePropertyData.fulfilled, (state, action) => {
        state.loading = false;
        state.property = state.property.filter(
          (property: Property) => property._id !== action.payload
        );
      })
      .addCase(deletePropertyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default deletePropertySlice.reducer;
