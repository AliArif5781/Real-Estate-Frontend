import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchApiPost } from "../../api/api";
import type { Property } from "../../components/PropertyCard";

interface soldProperty {
  // soldProperties: Property[];
  data: {
    properties: Property[];
    count: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: soldProperty = {
  data: {
    properties: [],
    count: 0,
  },
  loading: false,
  error: null,
};

export const soldPropertiesData = createAsyncThunk(
  "sold/properties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await searchApiPost.get(
        "/api/properties/getAllSoldProperties"
      );
      console.log("API Response:", response.data);
      return {
        properties: response.data.properties,
        count: response.data.count,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const soldPropertyDataSlice = createSlice({
  name: "soldproperites",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(soldPropertiesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(soldPropertiesData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = {
          properties: action.payload.properties,
          count: action.payload.count,
        };
      })
      .addCase(soldPropertiesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default soldPropertyDataSlice.reducer;
