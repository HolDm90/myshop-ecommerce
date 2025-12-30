// src/store/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// Liste de produits (déjà fait)
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async ({ page = 1, limit = 9, query = "" }) => {
    let url = query
      ? `/products/search?q=${query}&limit=${limit}&skip=${(page - 1) * limit}`
      : `/products?limit=${limit}&skip=${(page - 1) * limit}`;

    const response = await axiosInstance.get(url);
    return {
      products: response.data.products,
      total: response.data.total,
      page,
    };
  }
);

// ✅ Nouveau : un seul produit
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    total: 0,
    page: 1,
    status: "idle",
    error: null,
    selectedProduct: null, // 👈 ajout
  },
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // liste
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // détail
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
