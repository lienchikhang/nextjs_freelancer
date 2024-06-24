import { combineReducers, configureStore } from '@reduxjs/toolkit'
import orderSlice from './order.slice';
import drawerSlide from './drawer.slide';
import userSlice from './user.slice';
import authModalSlice from './authModal.slice';
const store = configureStore({
    reducer: combineReducers({
        order: orderSlice,
        drawer: drawerSlide,
        user: userSlice,
        modal: authModalSlice,
    }),
});

export default store;