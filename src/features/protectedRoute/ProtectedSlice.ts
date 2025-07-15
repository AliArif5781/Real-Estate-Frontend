// // features/protectedRoute/ProtectedSlice.ts
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { api } from "../../api/api";

// interface ProtectedState {
//   isAuthenticated: boolean;
//   loading: boolean;
//   error: string | null;
//   initialized: boolean;
// }

// const initialState: ProtectedState = {
//   isAuthenticated: false,
//   loading: false,
//   error: null,
//   initialized: false,
// };

// export const checkprotected = createAsyncThunk(
//   "protected/checkAuth",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/protected-route");
//       return {
//         isAuthenticated: true,
//         user: response.data.user,
//       };
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Not authenticated"
//       );
//     }
//   }
// );

// const protectedSlice = createSlice({
//   name: "protected",
//   initialState,
//   reducers: {
//     setAuthenticated: (state, action) => {
//       state.isAuthenticated = action.payload;
//       state.initialized = true;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(checkprotected.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(checkprotected.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = action.payload.isAuthenticated;
//         state.initialized = true;
//         state.error = null;
//       })
//       .addCase(checkprotected.rejected, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = false;
//         state.initialized = true;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { setAuthenticated } = protectedSlice.actions;
// export default protectedSlice.reducer;
