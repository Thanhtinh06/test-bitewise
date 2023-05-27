import { configureStore } from "@reduxjs/toolkit";
import { manageProductReducer } from "./manageProduct/slice";

export const store = configureStore({
  reducer : {
    manageProduct : manageProductReducer,
  }
})