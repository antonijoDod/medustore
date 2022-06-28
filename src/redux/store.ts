import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "./services/pokemon";
import { cartApi } from "./services/cart";
import { regionApi } from "./services/region";
import { shippingApi } from "./services/shipping";
import { useDispatch } from "react-redux";

import rootReducer from "./reducers";

export const store = configureStore({
    reducer: {
        rootReducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [regionApi.reducerPath]: regionApi.reducer,
        [shippingApi.reducerPath]: shippingApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            cartApi.middleware,
            regionApi.middleware,
            shippingApi.middleware,
        ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
