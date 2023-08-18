import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './reducers/loadingReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';


const store = configureStore({
  reducer: {
    loadingReducer,
    productReducer,
    cartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;