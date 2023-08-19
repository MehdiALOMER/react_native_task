import { IGenericProduct, IProduct } from "@/types/dataTypes";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from "./loadingReducer";
import { ProductService } from "@/services/productsService";


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




const productSlice = createSlice({
    name: "employee",
    initialState: {
        /* productList: [] as IProduct[],
        filteredProductList: [] as IProduct[], */
        genericProductList: [] as IGenericProduct[],
        filteredGenericProductList: [] as IGenericProduct[],
        status: "idle",
    },
    reducers: {
        /* searchEmployee: (state, action) => {
            state.filteredEmployeeList = state.employeeList.filter((employee) => {
                return employee.name.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase());
            });
        } */
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
        });
    },

});



/* export const { searchEmployee } = employeeSlice.actions; */

export { getProductsThunk };

export default productSlice.reducer;
