import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageProductServices } from "../../services/manageProduct.services";


export const getAllProductQuestion2 = createAsyncThunk("manageProduct/getAllProductQuestion2",
  async (_ , {rejectWithValue}) => {
    try {
      const res = await manageProductServices.getDataQuestion2()
      return res.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)
