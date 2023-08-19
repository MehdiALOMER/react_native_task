import { IGenericProduct, IProduct, IProductBrand, IProductModel } from "@/types/dataTypes";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from "./loadingReducer";
import { ProductService } from "@/services/productsService";
import { StorageService } from "@/utils/storage";


const getProductsThunk = createAsyncThunk("product/getAll", async (payload: void, { dispatch }) => {

    dispatch(setLoading(true));

    let response = await ProductService.getProducts();

    if (response?.status === 200) {
        dispatch(setLoading(false));
        return response?.data;
    }
    else {
        dispatch(setLoading(false));
        return Promise.reject(response);
    }
});

const addAndRemoveFavoriteThunk = createAsyncThunk("addAndRemoveFavoriteThunk", async (id: number) => {

    let product = productSlice.getInitialState().genericProductList.find((item) => item.id === id);

    if (product) {
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
        return [];
    }

});





const productSlice = createSlice({
    name: "employee",
    initialState: {
        genericProductList: [] as IGenericProduct[],                    // tüm ürün listesi
        filteredGenericProductList: [] as IGenericProduct[],            // filtrelenmiş ürün listesi
        displayedProducts: [] as IGenericProduct[],                     // gösterilen ürün listesi
        currentPage: 0 as number,                                       // gösterilen sayfa numarası
        productsPerPage: 12 as number,                                  // sayfa başına gösterilen ürün sayısı


        // filtereleme seçenekleri
        sortChecked: "oldToNew" as string,                  // sıralama seçeneği
        productBrandList: [] as IProductBrand[],            // ürün markaları (sadece farklı olanlar)
        productModelList: [] as IProductModel[],            // ürün modelleri (sadece farklı olanlar)


        favoriteList: [] as IGenericProduct[],              // favori ürün listesi


        status: "idle",
    },
    reducers: {
        loadMoreProducts: (state) => {
            state.displayedProducts = state.filteredGenericProductList.slice(0, state.currentPage * state.productsPerPage + state.productsPerPage);
            state.currentPage++;
        },
        searchProducts: (state, action) => {
            state.filteredGenericProductList = state.genericProductList.filter((product) => product.name.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase()));
            state.displayedProducts = state.filteredGenericProductList.slice(0, 12);
        },
        changeCheckedSort: (state, action) => {
            state.sortChecked = action.payload;
        },
        changeCheckedBrand: (state, action) => {
            let brandList = state.productBrandList;
            let brand = brandList.find((item) => item.brand === action.payload);
            if (brand) {
                brand.checked = !brand.checked;
            }
            state.productBrandList = brandList;
        },
        changeCheckedModel: (state, action) => {
            let modelList = state.productModelList;
            let model = modelList.find((item) => item.model === action.payload);
            if (model) {
                model.checked = !model.checked;
            }
            state.productModelList = modelList;
        },
        // filtreleme işlemi eğer marka veya model seçilmişse ona göre yapılıyor yoksa tüm ürünler gösteriliyor ve sırada seçilen sıralama seçeneğine göre sıralama yapılıyor
        filterProducts: (state) => {
            let brandList = state.productBrandList.filter((item) => item.checked);
            let modelList = state.productModelList.filter((item) => item.checked);
            let sortChecked = state.sortChecked;
            let filteredList = state.genericProductList;
            if (brandList.length > 0) {
                filteredList = filteredList.filter((product) => brandList.some((item) => item.brand === product.brand));
            }
            if (modelList.length > 0) {
                filteredList = filteredList.filter((product) => modelList.some((item) => item.model === product.model));
            }
            if (sortChecked === "oldToNew") {
                filteredList = filteredList.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            }
            else if (sortChecked === "newToOld") {
                filteredList = filteredList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }
            else if (sortChecked === "lowToHigh") {
                filteredList = filteredList.sort((a, b) => a.price - b.price);
            }
            else if (sortChecked === "highToLow") {
                filteredList = filteredList.sort((a, b) => b.price - a.price);
            }
            state.filteredGenericProductList = filteredList;
            state.displayedProducts = filteredList.slice(0, 12);
            state.currentPage = 1;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProductsThunk.fulfilled, (state, action) => {
            state.status = "success";
            // listede olan her objeye quantity ve isFavorite ekleniyor
            let array = action.payload.map((product: IProduct) => {
                return { ...product, quantity: 1, isFavorite: false };
            });
            state.genericProductList = array;
            state.filteredGenericProductList = array;
            // sadece ilk 12 ürün gösteriliyor
            state.displayedProducts = array.slice(0, 12);
            state.currentPage = 1;

            // ürün markaları listesi oluşturuluyor
            let brandList: IProductBrand[] = [];
            array.forEach((product: IGenericProduct) => {
                let brand = product.brand;
                if (!brandList.some((item) => item.brand === brand)) {
                    brandList.push({ brand, checked: false });
                }
            });
            state.productBrandList = brandList;
            // ürün modelleri listesi oluşturuluyor
            let modelList: IProductModel[] = [];
            array.forEach((product: IGenericProduct) => {
                let model = product.model;
                if (!modelList.some((item) => item.model === model)) {
                    modelList.push({ model, checked: false });
                }
            });
            state.productModelList = modelList;
        });
        builder.addCase(addAndRemoveFavoriteThunk.fulfilled, (state, action) => {
            state.favoriteList = action.payload;
        });
    },

});


export const { loadMoreProducts, searchProducts, changeCheckedSort, changeCheckedBrand, changeCheckedModel, filterProducts } = productSlice.actions;

export { getProductsThunk, addAndRemoveFavoriteThunk };

export default productSlice.reducer;
