import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = [];

export const cartSlice = createSlice({
    name: "cart",
    initialState: { value: initialStateValue },
    reducers: {
        setCartItems: (state, action) => {
            state.value = action.payload;
        },
        clearCart: (state) => {
            state.value = initialStateValue;
        }
    },
});

export const { setCartItems, clearCart } = cartSlice.actions;

export default cartSlice.reducer;