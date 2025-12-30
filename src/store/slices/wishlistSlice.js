// src/store/slices/wishlistSlice.js
/* import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [], // {id, title, price, thumbnail}
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((item) => item.id === product.id);

      if (exists) {
        // si déjà en favoris => retirer
        state.items = state.items.filter((item) => item.id !== product.id);
      } else {
        // sinon ajouter
        state.items.push(product);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
 */

// src/store/slices/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [], // {id, title, price, thumbnail}
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((item) => item.id === product.id);

      if (exists) {
        // supprimer en créant un nouveau tableau
        state.items = state.items.filter((item) => item.id !== product.id);
      } else {
        // ajouter en créant un nouveau tableau
        state.items = [...state.items, product];
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
