import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchApiPost } from "../../api/api";
import type { Property } from "../../components/PropertyCard";

interface soldProperty {
  soldProperties: Property[];
  loading: boolean;
  error: string | null;
}

const initialState: soldProperty = {
  soldProperties: [],
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
      // console.log(response, "soldPropertiesData");
      return response.data.properties;
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
        state.soldProperties = action.payload;
      })
      .addCase(soldPropertiesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default soldPropertyDataSlice.reducer;
