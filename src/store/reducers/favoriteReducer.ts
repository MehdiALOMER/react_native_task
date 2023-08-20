import { StorageService } from '@/utils/storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import store from '..';
import { Alert } from 'react-native';
import { IGenericProduct } from '@/types/dataTypes';
import { changeFavorite } from './productReducer';


const addAndRemoveFavoriteThunk = createAsyncThunk("addAndRemoveFavoriteThunk", async (id: number, { dispatch }) => {

    let product = store.getState().productReducer.genericProductList.find((p) => p.id === id);

    if (product) {
        dispatch(changeFavorite(product.id));
        product.isFavorite = !product.isFavorite;
        let favoriteData = await StorageService.getItem("favoriteData");
        let data: IGenericProduct[] = [];
        if (favoriteData) {
            data = JSON.parse(favoriteData);
            let index = data.findIndex((p) => p.id === id);
            if (index !== -1) {
                data.splice(index, 1);
            }
            else {
                data.push({ ...product });
            }
            await StorageService.setItem("favoriteData", JSON.stringify(data));
        }
        else {
            data = [{ ...product }];
            await StorageService.setItem("favoriteData", JSON.stringify(data));
        }
        return data;
    }
    else {
        Alert.alert("Ürün bulunamadı!");
        return [];
    }

});


const favoriteSlice = createSlice({
    name: 'cart',
    initialState: {
        favoriteList: [] as IGenericProduct[],              // favori ürün listesi
    },
    reducers: {
        setFavoriteData: (state, action) => {
            state.favoriteList = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addAndRemoveFavoriteThunk.fulfilled, (state, action) => {
            state.favoriteList = action.payload;
        });
    }
});



export { addAndRemoveFavoriteThunk };

export const { setFavoriteData } = favoriteSlice.actions;

export default favoriteSlice.reducer;