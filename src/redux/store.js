import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slice/projectData";
import userReducer from "./slice/userData";
export const store = configureStore({
    reducer:{
        projectData:projectReducer,
        userData:userReducer
    }
})