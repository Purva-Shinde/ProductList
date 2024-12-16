import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: []
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    saveProduct: (state, action) => {
      state.products.push(action.payload); 
    }
  }
});

export const { addProduct, updateProduct,saveProduct  } = productSlice.actions;
export default productSlice.reducer;
