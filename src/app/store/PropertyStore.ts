import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "../../features/property/PropertySlice";
import postReducer from "../../features/property/postSlice";
import UserDataReducer from "../../features/property/UserData";
import LogoutReducer from "../../features/property/LogoutUser/logoutUser";
import fetchPropertyReducer from "../../features/property/SearchPropertySlice";
// import protectedReducer from "../../features/protectedRoute/ProtectedSlice";
export const store = configureStore({
  reducer: {
    property: propertyReducer,
    post: postReducer,
    userData: UserDataReducer,
    logout: LogoutReducer,
    clickProperties: fetchPropertyReducer,
    // protected: protectedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
