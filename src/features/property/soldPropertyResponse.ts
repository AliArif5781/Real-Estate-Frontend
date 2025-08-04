import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchApiPost } from "../../api/api";
import type { Property } from "../../components/PropertyCard";

interface SoldPropertyState {
  soldProperties: Property[];
  loading: boolean;
  error: string | null;
}

const initialState: SoldPropertyState = {
  soldProperties: [],
  loading: false,
  error: null,
};

export const sendPropertyResponse = createAsyncThunk(
  "sendProperty/response",
  async (
    {
      propertyId,
      response,
    }: { propertyId: string; response: "accept" | "decline" },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await searchApiPost.patch(
        `/api/properties/${propertyId}/response`,
        { response }
      );
      return {
        propertyId,
        response,
        updatedProperty: data.property,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const sendPropertyResponseSlice = createSlice({
  name: "sendPropertyResponse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendPropertyResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendPropertyResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.soldProperties = state.soldProperties.filter(
          (property) => property._id !== action.payload.propertyId
        );
      })
      .addCase(sendPropertyResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sendPropertyResponseSlice.reducer;
