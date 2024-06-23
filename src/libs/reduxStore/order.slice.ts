import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    id: number,
    price: number,
    name: string,
    image: string,
    level: string,
}

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        id: 0,
        price: 0,
        name: '',
        image: '',
    } as IInitialState,
    reducers: {
        setOrder(state, action) {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.image = action.payload.image;
            state.price = action.payload.price;
            state.level = action.payload.level;
        }
    }
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;