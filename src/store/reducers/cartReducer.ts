import { StorageService } from '@/utils/storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import store from '..';


const addToCartThunk = createAsyncThunk("addToCart", async (id: number) => {


    // id ya göre ürünü productReducer taki product listesinden bul
    let product = store.getState().productReducer.productList.find((p) => p.id === id);

    console.log("addToCartThunk ::::::::::: ", product?.name);
    /*  let cartData = await StorageService.getItem("cartData");
     if (cartData) {
         
     }
     else {
 let cartData = 
         await StorageService.setItem("cartData", );
     } */

});

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
        },
        /* addToCart: async (state, action) => {
            let token = await StorageService.getItem("carData");
        } */
    },
});


export { addToCartThunk };

export const { setCartCount, setCartData } = cartSlice.actions;

export default cartSlice.reducer;