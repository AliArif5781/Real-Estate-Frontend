import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchApiPost } from "../../api/api";
import type { FormData } from "../../features/property/postSlice";

interface PropertyState {
  currentProperty: FormData | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  currentProperty: null,
  loading: false,
  error: null,
};

export const fetchPropertyDetails = createAsyncThunk(
  "property/fetchDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await searchApiPost.get(`/api/${id}`);
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch property");
      }
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch property"
      );
    }
  }
);

const propertySlice = createSlice({
  name: "clickProperties", // Changed to match your useSelector
  initialState,
  reducers: {
    clearCurrentProperty: (state) => {
      state.currentProperty = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProperty = action.payload;
      })
      .addCase(fetchPropertyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentProperty } = propertySlice.actions;
export default propertySlice.reducer;
