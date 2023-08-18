import { IProduct } from "@/types/dataTypes";
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
        productList: [] as IProduct[],
        filteredProductList: [] as IProduct[],
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
            state.filteredProductList = action.payload;
            state.productList = action.payload;
        });
    },

});



/* export const { searchEmployee } = employeeSlice.actions; */

export { getProductsThunk };

export default productSlice.reducer;
