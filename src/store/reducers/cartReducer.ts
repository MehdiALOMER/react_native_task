import { StorageService } from '@/utils/storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import store from '..';
import { Alert } from 'react-native';
import { IGenericProduct } from '@/types/dataTypes';


const addToCartThunk = createAsyncThunk("addToCart", async (id: number) => {


    // id ya göre ürünü productReducer taki product listesinden bul
    let product = store.getState().productReducer.genericProductList.find((p) => p.id === id);

    if (product) {
        let cartData = await StorageService.getItem("cartData");
        if (cartData) {
            let data: IGenericProduct[] = JSON.parse(cartData);
            let index = data.findIndex((p) => p.id === id);
            if (index !== -1) {
                data[index].quantity += 1;
            }
            else {
                data.push({ ...product });
            }
            await StorageService.setItem("cartData", JSON.stringify(data));
        }
        else {
            let data = [{ ...product }];
            await StorageService.setItem("cartData", JSON.stringify(data));
        }
    }
    else {
        Alert.alert("Ürün bulunamadı!");
    }

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