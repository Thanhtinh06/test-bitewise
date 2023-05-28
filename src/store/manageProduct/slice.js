import { createSlice } from "@reduxjs/toolkit";
import { getAllProductQuestion2 } from "./thunkAction";

const initialState = {
  listProduct: [],
  detailProduct: undefined,
  listProductQuestion2: [],
  loading: false,
  dataBidding : [],
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
      getDataBidding :(state,action) => {
        state.dataBidding = action.payload
      }
    },
  });
