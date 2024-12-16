import { configureStore } from '@reduxjs/toolkit';
import productReducer from './Slice/ProductSlice';

const store = configureStore({
  reducer: {
    products: productReducer
  }
});

export default store;  
