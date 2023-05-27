import { createSlice } from "@reduxjs/toolkit";
import { getAllProductQuestion2 } from "./thunkAction";

const initialState = {
  listProduct: [],
  detailProduct: undefined,
  listProductQuestion2: [],
  loading: false,
};

export const { reducer: manageProductReducer, actions: manageProductActions } =
  createSlice({
    name: "manageProduct",
    initialState,
    reducers: {
      getDetailProduct: (state, action) => {
        state.detailProduct = action.payload;
      },
      getDetailId: (state, action) => {
        const res = state.listProduct.findIndex(
          (product) => product.id === action.payload
        );
        state.detailProduct = state.listProduct[res];
      },
      getAllProductLocal: (state) => {
        state.listProduct = JSON.parse(localStorage.getItem("data"));
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllProductQuestion2.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(getAllProductQuestion2.fulfilled, (state, action) => {
          state.listProductQuestion2 = action.payload;
          state.loading = false;
        });
    },
  });
