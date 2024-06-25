import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        full_name: '',
        avatar: '',
        email: '',
    },
    reducers: {
        setUser(state, action) {
            state.full_name = action.payload.full_name;
            state.avatar = action.payload.avatar;
            state.email = decodeURIComponent(action.payload.email);
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

