import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../reducers";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
