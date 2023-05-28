import { configureStore } from "@reduxjs/toolkit";
import {
  manageProductActions,
  manageProductReducer,
} from "./manageProduct/slice";

export const store = configureStore({
  reducer: {
    manageProduct: manageProductReducer,
  },
});

store.dispatch(manageProductActions.getAllProductLocal());