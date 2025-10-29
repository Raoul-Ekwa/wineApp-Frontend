// src/redux/store/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk pour ajouter un produit au panier via ton API back-end
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/cart/add", { userId, productId });
      return { productId, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // tableau d'objets { productId, quantity, totalPrice }
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    // Permet de définir directement le panier (ex: récupération initiale depuis API)
    setCart: (state, action) => {
      state.items = action.payload;
    },
    // Supprimer un produit du panier
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
    // Vider le panier
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Si le produit est déjà dans le panier, incrémente la quantité
        const existing = state.items.find(
          (item) => item.productId === action.payload.productId
        );
        if (existing) {
          existing.quantity += 1;
        } else {
          state.items.push({
            productId: action.payload.productId,
            quantity: 1,
            totalPrice: 0,
          });
        }
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
