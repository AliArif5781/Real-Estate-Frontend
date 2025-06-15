import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FormData {
  _id: string;
  title: string;
  price: number;
  address: string;
  description: string;
  city: string;
  bedroomNumber: number; //
  bathroomNumber: number;
  latitude: number;
  longitude: number;
  type: string;
  property: string;
  utilitiesPolicy: string;
  petPolicy: string;
  Kitchen: number;
  totalSize: number;
  school: number;
  images: string[];
  previewImages: string[];
  BusStop: number;
  Resturant: number;
  LoadShedding: string;
  Water: string;
  Gas: string;
  Best?: string;
}

const initialState: FormData = {
  _id: "",
  title: "",
  price: 0,
  address: "",
  description: "",
  city: "",
  bedroomNumber: 0,
  bathroomNumber: 0,
  latitude: 0,
  longitude: 0,
  type: "Rent",
  property: "Apartment",
  utilitiesPolicy: "Owner is responsible",
  petPolicy: "Allowed",
  Kitchen: 0, //
  totalSize: 0,
  school: 0,
  images: [],
  previewImages: [],
  BusStop: 0,
  Resturant: 0,
  LoadShedding: "",
  Water: "",
  Gas: "",
  Best: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof FormData; value: any }>
    ) => {
      const { field, value } = action.payload;
      (state as any)[field] = value;
    },
    setImages: (
      state,
      action: PayloadAction<{ urls: string[]; previews: string[] }> // Updated to expect URLs
    ) => {
      state.images = [...state.images, ...action.payload.urls];
      state.previewImages = [
        ...state.previewImages,
        ...action.payload.previews,
      ];
    },
    removeImage: (state, action: PayloadAction<number>) => {
      state.images.splice(action.payload, 1);
      state.previewImages.splice(action.payload, 1);
    },
    resetForm: () => initialState,
  },
});

export const { updateField, setImages, removeImage, resetForm } =
  postSlice.actions;
export default postSlice.reducer;
