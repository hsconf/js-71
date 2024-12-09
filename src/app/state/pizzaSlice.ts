import {Dish, Dishes, IDish} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosApi} from "../axiosApi";

export interface PizzaState {
    dishes: Dishes[];
    dish: Dishes;
    isLoading: boolean;
    isError: boolean;
    isEditing: boolean;
    isDeleting: boolean;
}

const initialState: PizzaState = {
    dishes: [],
    dish: {title: '', price: '', image: '', id: ''},
    isLoading: false,
    isError: false,
    isEditing: false,
    isDeleting: false,
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

export const editDish = createAsyncThunk<void, Dishes>('pizza/editing', async (id) => {
    try {
        await axiosApi.put(`pizza/dishes/${id.id}.json`, {title: id.title, price: id.price, image: id.image});
    } catch (e) {
        console.error(e);
    }
});

export const deleteDish = createAsyncThunk<void, string>('pizza/deleting', async (id) => {
    await axiosApi.delete(`pizza/dishes/${id}.json`);
});

export const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        getDish: (state, action) => {
            state.dish = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(newDish.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(newDish.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false;
        }).addCase(newDish.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        }).addCase(fetchDishes.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(fetchDishes.fulfilled, (state, action) => {
            state.dishes = action.payload;
            state.isLoading = false;
            state.isError = false;
        }).addCase(fetchDishes.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        }).addCase(editDish.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isEditing = true;
        }).addCase(editDish.fulfilled, (state) => {
            state.isLoading = false;
            state.isEditing = false;
            state.isError = false;
        }).addCase(editDish.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isEditing = false;
        }).addCase(deleteDish.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isDeleting = true;
        }).addCase(deleteDish.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isDeleting = false;
        }).addCase(deleteDish.rejected, (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isDeleting = false;
        })
    }
})

export const pizzaReducer = pizzaSlice.reducer;
export const {getDish} = pizzaSlice.actions;