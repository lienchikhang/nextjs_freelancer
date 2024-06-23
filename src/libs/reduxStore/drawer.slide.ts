import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {
        isDrawerOpen: false,
    },
    reducers: {
        toggle(state, action) {
            state.isDrawerOpen = action.payload
        }
    }
});

export const { toggle } = drawerSlice.actions;
export default drawerSlice.reducer;