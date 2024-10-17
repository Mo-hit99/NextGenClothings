// wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState:{
    wishListItems : [],
  },
  reducers: {
    addToWishList(state,action){
        const { wishlistId,wishlistItem } = action.payload;
        const indexProductId = state.wishListItems.findIndex(
          (item) => item.productId === wishlistId
        );
        if (indexProductId <=0) {
          state.wishListItems.push({ wishlistId,wishlistItem });
        }   
      },
      removeToWishList(state,action){
        const  wishlistId  = action.payload;
        const nextcartItems = state.wishListItems.filter(
          (item) => item.productId !== wishlistId
        );
        state.wishListItems = nextcartItems;
      },
  }
});

export const { addToWishList,removeToWishList } = wishlistSlice.actions;

export default wishlistSlice.reducer;
