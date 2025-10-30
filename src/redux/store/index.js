// src/redux/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import cartReducer from "./cartSlice";
import authReducer from "./authSlice"; // si tu gères l'utilisateur

const persistConfig = {
  key: "root",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    auth: authReducer, // facultatif
  },
});

export const persistor = persistStore(store);
