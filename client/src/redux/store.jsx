import {configureStore} from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import wishlistslice from './wishlistslice'

export const store = configureStore({
        reducer:{
            cart : cartSlice,
            wishlist: wishlistslice,
            
        }
})