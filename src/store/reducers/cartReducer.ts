import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartCount: 5,
        cartData: [],
    },
    reducers: {
        setCartCount: (state, action) => {
            state.cartCount = action.payload;
        },
        setCartData: (state, action) => {
            state.cartData = action.payload;
        }
    },
});

export const { setCartCount, setCartData } = cartSlice.actions;

export default cartSlice.reducer;