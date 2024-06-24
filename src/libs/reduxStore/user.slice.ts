import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        full_name: '',
        avatar: '',
    },
    reducers: {
        setUser(state, action) {
            state.full_name = action.payload.full_name;
            state.avatar = action.payload.avatar;
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

