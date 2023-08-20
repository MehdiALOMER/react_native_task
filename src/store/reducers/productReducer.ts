import { IGenericProduct, IProduct, IProductBrand, IProductModel } from "@/types/dataTypes";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from "./loadingReducer";
import { ProductService } from "@/services/productsService";
import { StorageService } from "@/utils/storage";
import { Alert } from "react-native";


const getProductsThunk = createAsyncThunk("product/getAll", async (payload: void, { dispatch }) => {

    dispatch(setLoading(true));

    let response = await ProductService.getProducts();

    if (response?.status === 200) {

        let favoriteData = await StorageService.getItem('favoriteData');
        let array: IGenericProduct[] = [];
        if (favoriteData) {
            let data = JSON.parse(favoriteData);
            array = response?.data.map((product: IProduct) => {
                let index = data.findIndex((p: IGenericProduct) => p.id === product.id);
                if (index !== -1) {
                    return { ...product, quantity: 1, isFavorite: true };
                }
                else {
                    return { ...product, quantity: 1, isFavorite: false };
                }
            });
        }
        else {
            array = response.data.map((product: IProduct) => {
                return { ...product, quantity: 1, isFavorite: false };
            });
        }

        dispatch(setLoading(false));
        return array;
    }
    else {
        dispatch(setLoading(false));
        return Promise.reject(response);
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
        filteredProductBrandList: [] as IProductBrand[],    // filtrelenmiş ürün markaları (arama için)
        productModelList: [] as IProductModel[],            // ürün modelleri (sadece farklı olanlar)
        filteredProductModelList: [] as IProductModel[],    // filtrelenmiş ürün modelleri (arama için)


        status: "idle",
    },
    reducers: {
        loadMoreProducts: (state) => {
            state.displayedProducts = state.filteredGenericProductList.slice(0, state.currentPage * state.productsPerPage + state.productsPerPage);
            state.currentPage++;
        },
        // ürün listesi içerisinde arama
        searchProducts: (state, action) => {
            state.filteredGenericProductList = state.genericProductList.filter((product) => product.name.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase()));
            state.displayedProducts = state.filteredGenericProductList.slice(0, 12);
        },
        // brand liste içerisinde arama
        searchBrand: (state, action) => {
            state.filteredProductBrandList = state.productBrandList.filter((brand) => brand.brand.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase()));
        },
        // model liste içerisinde arama
        searchModel: (state, action) => {
            state.filteredProductModelList = state.productModelList.filter((model) => model.model.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase()));
        },
        changeCheckedSort: (state, action) => {
            state.sortChecked = action.payload;
        },
        changeCheckedBrand: (state, action) => {
            let brandList = state.productBrandList;
            let filteredBrandList = state.filteredProductBrandList;
            let brand = brandList.find((item) => item.brand === action.payload);
            let filteredBrand = filteredBrandList.find((item) => item.brand === action.payload);
            if (brand && filteredBrand) {
                brand.checked = !brand.checked;
                filteredBrand.checked = !filteredBrand.checked;
            }
            state.productBrandList = brandList;
            state.filteredProductBrandList = filteredBrandList;
        },
        changeCheckedModel: (state, action) => {
            let modelList = state.productModelList;
            let filteredModelList = state.filteredProductModelList;
            let model = modelList.find((item) => item.model === action.payload);
            let filteredModel = filteredModelList.find((item) => item.model === action.payload);
            if (model && filteredModel) {
                model.checked = !model.checked;
                filteredModel.checked = !filteredModel.checked;
            }
            state.productModelList = modelList;
            state.filteredProductModelList = filteredModelList;
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
            else if (sortChecked === "priceLowToHigh") {
                filteredList = filteredList.sort((a, b) => a.price - b.price);
            }
            else if (sortChecked === "priceHighToLow") {
                filteredList = filteredList.sort((a, b) => b.price - a.price);
            }
            state.filteredGenericProductList = filteredList;
            state.displayedProducts = filteredList.slice(0, 12);
            state.currentPage = 1;
        },
        // ilgili ürünün favori durumunu değiştirme (genericProductList, filteredGenericProductList ve displayedProducts listelerinde değişiklik yapılıyor ve yeni listeler set ediliyor) 
        changeFavorite: (state, action) => {
            let id = action.payload;
            /* let product = state.genericProductList.find((product) => product.id === id);
            let filteredProduct = state.filteredGenericProductList.find((product) => product.id === id); */
            let displayedProduct = state.displayedProducts.find((product) => product.id === id);
            if (/* product && filteredProduct &&  */displayedProduct) {
                /* product.isFavorite = !product.isFavorite;
                filteredProduct.isFavorite = !filteredProduct.isFavorite; */
                displayedProduct.isFavorite = !displayedProduct.isFavorite;
                /* state.genericProductList = [...state.genericProductList];
                state.filteredGenericProductList = [...state.filteredGenericProductList]; */
                state.displayedProducts = [...state.displayedProducts];
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProductsThunk.fulfilled, (state, action) => {
            state.status = "success";
            state.genericProductList = action.payload;
            state.filteredGenericProductList = action.payload;
            // sadece ilk 12 ürün gösteriliyor
            state.displayedProducts = action.payload.slice(0, 12);
            state.currentPage = 1;

            // ürün markaları listesi oluşturuluyor
            let brandList: IProductBrand[] = [];
            action.payload.forEach((product: IGenericProduct) => {
                let brand = product.brand;
                if (!brandList.some((item) => item.brand === brand)) {
                    brandList.push({ brand, checked: false });
                }
            });
            state.productBrandList = brandList;
            state.filteredProductBrandList = brandList;
            // ürün modelleri listesi oluşturuluyor
            let modelList: IProductModel[] = [];
            action.payload.forEach((product: IGenericProduct) => {
                let model = product.model;
                if (!modelList.some((item) => item.model === model)) {
                    modelList.push({ model, checked: false });
                }
            });
            state.productModelList = modelList;
            state.filteredProductModelList = modelList;
        });
    },

});


export const { loadMoreProducts, searchProducts, searchBrand, searchModel, changeCheckedSort, changeCheckedBrand, changeCheckedModel, filterProducts, changeFavorite } = productSlice.actions;

export { getProductsThunk };

export default productSlice.reducer;
