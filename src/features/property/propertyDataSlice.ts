import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchApiPost } from "../../api/api";
import type { Property } from "./PropertySlice";

interface PropertySlice {
  propertiesData: Property[]; // Replace 'any' with your Property type
  loading: boolean;
  error: string | null;
}

const initialState: PropertySlice = {
  propertiesData: [],
  loading: false,
  error: null,
};

export const getAllPropertiesData = createAsyncThunk(
  "property/data",
  async (_, { rejectWithValue }) => {
    try {
      const response = await searchApiPost.get("/api/getPost");
      //   console.log(response.data, "propertyDataSlice.ts");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const propertyDataSlice = createSlice({
  name: "propertyData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPropertiesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPropertiesData.fulfilled, (state, action) => {
        state.loading = false;
        state.propertiesData = action.payload.data;
      })
      .addCase(getAllPropertiesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default propertyDataSlice.reducer;
