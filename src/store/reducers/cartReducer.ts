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
        let data: IGenericProduct[] = [];
        if (cartData) {
            data = JSON.parse(cartData);
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
            data = [{ ...product }];
            await StorageService.setItem("cartData", JSON.stringify(data));
        }
        return data;
    }
    else {
        Alert.alert("Ürün bulunamadı!");
        return [];
    }

});

const increaseAndDecreaseQuantityThunk = createAsyncThunk("increaseAndDecreaseQuantity", async (payload: { id: number, type: string }) => {
    let cartData = await StorageService.getItem("cartData");
    let data: IGenericProduct[] = [];
    if (cartData) {
        data = JSON.parse(cartData);
        let index = data.findIndex((p) => p.id === payload.id);
        if (index !== -1) {
            if (payload.type === "increase") {
                data[index].quantity += 1;
            }
            else {
                data[index].quantity -= 1;
            }
        }
        await StorageService.setItem("cartData", JSON.stringify(data));
    }
    return data;
});

const deleteFromCartThunk = createAsyncThunk("deleteFromCart", async (id: number) => {
    let cartData = await StorageService.getItem("cartData");
    let data: IGenericProduct[] = [];
    if (cartData) {
        data = JSON.parse(cartData);
        let index = data.findIndex((p) => p.id === id);
        if (index !== -1) {
            data.splice(index, 1);
        }
        await StorageService.setItem("cartData", JSON.stringify(data));
    }
    return data;
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartCount: 0,
        cartData: [] as IGenericProduct[],
        cartTotalPrice: 0 as number
    },
    reducers: {
        setCartCount: (state, action) => {
            state.cartCount = action.payload;
        },
        setCartData: (state, action) => {
            state.cartData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addToCartThunk.fulfilled, (state, action) => {
            state.cartData = action.payload;
            state.cartCount = action.payload.length;
            state.cartTotalPrice = action.payload.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        });
        builder.addCase(increaseAndDecreaseQuantityThunk.fulfilled, (state, action) => {
            state.cartData = action.payload;
            state.cartCount = action.payload.length;
            state.cartTotalPrice = action.payload.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        });
        builder.addCase(deleteFromCartThunk.fulfilled, (state, action) => {
            state.cartData = action.payload;
            state.cartCount = action.payload.length;
            state.cartTotalPrice = action.payload.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        });
    }
});



export { addToCartThunk, increaseAndDecreaseQuantityThunk, deleteFromCartThunk };

export const { setCartCount, setCartData } = cartSlice.actions;

export default cartSlice.reducer;