import { createSlice } from "@reduxjs/toolkit";
import { divideData } from "../../constant/mockAPI";

const initialState = {
  listProduct: [],
  detailProduct: undefined,
  listProductQuestion2: [],
  dataBinding: [],
  pageIndex: [],
  dataHaveDivided : {}
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
      getAllProductLocalQuestion2: (state,action) => {
        state.listProductQuestion2 = action.payload
        state.dataHaveDivided = divideData(action.payload);
        localStorage.setItem("DataDivided",JSON.stringify(state.dataHaveDivided))
      },
      getdataBinding: (state, action) => {
        const prevData = state.dataBinding;
        const hasIndex = state.pageIndex.includes(action.payload.pageIndex);
        if (prevData && action.payload.page && !hasIndex) {
          state.dataBinding = [...state.dataBinding, ...action.payload.page];
          state.pageIndex.push(action.payload.pageIndex);
        } else {
          state.dataBinding = action.payload.page;
          state.pageIndex = [];
        }
      },
      resetDataBinding: (state, action) => {
        state.dataBinding = action.payload;
      },
    },
  });
