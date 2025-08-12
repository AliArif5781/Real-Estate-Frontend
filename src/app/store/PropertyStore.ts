import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "../../features/property/PropertySlice";
import postReducer from "../../features/property/postSlice";
import UserDataReducer from "../../features/property/UserData";
import LogoutReducer from "../../features/property/LogoutUser/logoutUser";
import fetchPropertyReducer from "../../features/property/SearchPropertySlice";
import propertyDataReducer from "../../features/property/propertyDataSlice";
import soldPropertyDataReducer from "../../features/property/soldPropertySlice";
import sendPropertyResponseReducer from "../../features/property/soldPropertyResponse";
import deleteUserReducer from "../../features/user/deleteUserSlice";
import allUserReducer from "../../features/user/allUserDataSlice";
import deletePropertyReducer from "../../features/property/deletePropertySlice";
export const store = configureStore({
  reducer: {
    property: propertyReducer,
    post: postReducer,
    userData: UserDataReducer,
    logout: LogoutReducer,
    clickProperties: fetchPropertyReducer,
    getAllPost: propertyDataReducer,
    soldProperty: soldPropertyDataReducer,
    sendPropertyResponse: sendPropertyResponseReducer,
    deleteUser: deleteUserReducer,
    getAllUserDetails: allUserReducer,
    deleteProperty: deletePropertyReducer,
    // admin: adminReducer,
    // protected: protectedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
