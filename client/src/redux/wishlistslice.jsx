// wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState:{
    wishListItems : [],
  },
  reducers: {
    addToWishList(state,action){
        const { productId, quantity, product } = action.payload;
        const indexProductId = state.wishListItems.findIndex(
          (item) => item.productId === productId
        );
        if (indexProductId >= 0) {
          state.wishListItems[indexProductId].quantity += quantity;
        } else {
          state.wishListItems.push({ productId, quantity, product });
        }   
      },
      removeToWishList(state,action){
        const  productId  = action.payload;
        const nextcartItems = state.wishListItems.filter(
          (item) => item.productId !== productId
        );
        state.wishListItems = nextcartItems;
      },
  }
});

export const { addToWishList,removeToWishList } = wishlistSlice.actions;

export default wishlistSlice.reducer;
