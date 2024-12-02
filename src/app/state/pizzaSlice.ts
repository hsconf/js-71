import {Dish, Dishes, IDish} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosApi} from "../axiosApi";

export interface PizzaState {
    dishes: Dishes[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
}

const initialState: PizzaState = {
    dishes: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
}

export const newDish = createAsyncThunk<void, Dish>('pizza/creating', async (dish) => {
    try {
        await axiosApi.post("pizza/dishes.json", dish);
    } catch (e) {
        console.error(e);
    }
});

export const fetchDishes = createAsyncThunk<Dishes[], void>('pizza/fetching', async () => {
    try {
        const {data: response} = await axiosApi.get<IDish | null>('pizza/dishes.json')
        if (response === null) {
            return []
        } else {
            return Object.keys(response).map((dish) => ({
                ...response[dish],
                id: dish
            }))
        }
    } catch (e) {
        console.log(e);
        return []
    }
});

export const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(newDish.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false
        }).addCase(newDish.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
        }).addCase(newDish.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        }).addCase(fetchDishes.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        }).addCase(fetchDishes.fulfilled, (state, action) => {
            state.dishes = action.payload;
            console.log(action.payload);
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        }).addCase(fetchDishes.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        })
    }
})

export const pizzaReducer = pizzaSlice.reducer;
// export const {} = pizzaSlice.actions;