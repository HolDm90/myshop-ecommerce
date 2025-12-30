import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Utilise le localStorage
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";

// 1. Combiner tous les reducers
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});

// 2. Configuration de la persistance
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "wishlist"], // ⚠️ On ne persiste QUE le panier et les favoris (pas les produits qui viennent de l'API)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Création du store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorer les actions de redux-persist pour éviter les erreurs de console
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
