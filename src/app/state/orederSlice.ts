import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dishes, Order} from "../types";

interface OrderState {
    cartDishes: Dishes[];
    order: Order;
    modal: boolean;
}

const initialState: OrderState = {
    cartDishes: [],
    order: {},
    modal: false,
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addToCart: (state, {payload}: PayloadAction<Dishes>) => {
            state.cartDishes.push(payload);

            if (state.order[payload.id]) {
                state.order[payload.id] += 1;
            } else {
                state.order[payload.id] = 1;
            }
        },
        openModal: (state, {payload}) => {
            state.modal = payload;
            console.log(payload);
        }
    },
});

export const {addToCart, openModal} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
