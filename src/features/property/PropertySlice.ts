import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchApiPost } from "../../api/api";

interface Property {
  _id: string;
  title: string;
  price: number;
  address: string;
  description: string;
  city: string;
  bedroomNumber: number;
  bathroomNumber: number;
  latitude: number;
  longitude: number;
  type: string;
  property: string;
  utilitiesPolicy: string;
  petPolicy: string;
  Kitchen: number;
  totalSize: number;
  school: number; // Changed from string to number to match your postSlice
  images: string[];
  previewImages: string[];
  BusStop: number;
  Resturant: number;
  LoadShedding: string;
  Water: string;
  Gas: string;
  user?: string;
}

interface PropertyState {
  properties: Property[];
  searchResults: Property[]; // Added this to match your component usage
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  searchResults: [], // Initialize searchResults
  loading: false,
  error: null,
};

export const searchProperties = createAsyncThunk(
  "property/search",
  async (
    {
      city,
      minPrice,
      maxPrice,
    }: { city?: string; minPrice?: number; maxPrice?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await searchApiPost.get("/api/searchPost", {
        params: { city, minPrice, maxPrice },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Search failed");
    }
  }
);

const PropertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.data; // Store results in searchResults
      })
      .addCase(searchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default PropertySlice.reducer;
