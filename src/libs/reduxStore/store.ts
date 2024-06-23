import { combineReducers, configureStore } from '@reduxjs/toolkit'
import orderSlice from './order.slice';
import drawerSlide from './drawer.slide';
const store = configureStore({
    reducer: combineReducers({
        order: orderSlice,
        drawer: drawerSlide,
    }),
});

export default store;