import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice"
import userReducer from './userSlice'

const rootReducer = combineReducers({
  alert: alertReducer, 
  user: userReducer, 
});

export const store = configureStore({
  reducer: rootReducer,
});
