import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slice/projectData";
import userReducer from "./slice/userData";
import userLoginReducer from "./slice/userSlice";
export const store = configureStore({
    reducer:{
        projectData:projectReducer,
        userData:userReducer,
        userLogin:userLoginReducer
    }
})