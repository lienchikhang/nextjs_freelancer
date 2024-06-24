import { createSlice } from "@reduxjs/toolkit";

const authModal = createSlice({
    name: 'auth',
    initialState: {
        isOpen: true,
    },
    reducers: {
        toggleModal(state, action) {
            state.isOpen = action.payload
        }
    }
});

export const { toggleModal } = authModal.actions;
export default authModal.reducer;