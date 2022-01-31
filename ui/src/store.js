import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    },
});

export default store;