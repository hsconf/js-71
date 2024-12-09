import {configureStore} from "@reduxjs/toolkit";
import {pizzaReducer} from "./state/pizzaSlice";
import {orderReducer} from "./state/orederSlice";

export const store = configureStore({
    reducer: {
        pizza: pizzaReducer,
        order: orderReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;