import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  },
  reducers: {
    addToWishList(state,action){
      const { productId, quantity, product } = action.payload;
      const indexProductId = state.items.findIndex(
        (item) => item.productId === productId
      );
      if (indexProductId >= 0) {
        state.items[indexProductId].quantity += quantity;
      } else {
        state.items.push({ productId, quantity, product });
      }   
    },
    removeToWishList(state,action){
      const  productId  = action.payload;
      const nextcartItems = state.items.filter(
        (item) => item.productId !== productId
      );
      state.items = nextcartItems;
    },
    addToCard(state, action) {
      const { productId, quantity, product , selectedColor,
        selectedSize } = action.payload;
      const indexProductId = state.items.findIndex(
        (item) => item.productId === productId
      );
      if (indexProductId >= 0) {
        state.items[indexProductId].quantity += quantity;
      } else {
        state.items.push({ productId, quantity, product,selectedColor,
          selectedSize });
      }
      state.cartTotalQuantity = state.items.reduce(
        (prev, curr) => prev + curr.quantity,
        0
      );
      state.cartTotalAmount = state.items.reduce(
        (prev, curr) => prev + curr.product.price * curr.quantity,
        0
      );
    },
    removeToCart(state, action) {
      const  productId  = action.payload;
      const nextcartItems = state.items.filter(
        (item) => item.productId !== productId
      );
      state.items = nextcartItems;
      state.cartTotalQuantity = state.items.reduce(
        (prev, curr) => prev + curr.quantity,
        0
      );
      state.cartTotalAmount = state.items.reduce(
        (prev, curr) => prev + curr.product.price * curr.quantity,
        0
      );
    },
    updateQuantityItems(state, action) {
      const productId = action.payload;
      const itemIndex = state.items.findIndex(
        (cartItem) => cartItem.productId === productId
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity++;
      }
      state.cartTotalQuantity = state.items.reduce(
        (prev, curr) => prev + curr.quantity,
        0
      );
      state.cartTotalAmount = state.items.reduce(
        (prev, curr) => prev + curr.product.price * curr.quantity,
        0
      );
    },
    subtractQuantityItems(state, action) {
      const productId = action.payload;
      const itemIndex = state.items.findIndex(
        (cartItem) => cartItem.productId === productId
      );
      if (itemIndex >= 0 && state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity--;
      }

      // if(state.items[itemIndex].quantity <=1){
      //   const nextcartItems = state.items.filter(
      //     (item) => item.productId !== productId
      //   );
      //   state.items = nextcartItems;
      // }
      state.cartTotalQuantity = state.items.reduce(
        (prev, curr) => prev + curr.quantity,
        0
      );
      state.cartTotalAmount = state.items.reduce(
        (prev, curr) => prev + curr.product.price * curr.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
    },
  },
});
export const {
  addToCard,
  removeToWishList,
  addToWishList,
  removeToCart,
  updateQuantityItems,
  subtractQuantityItems,
  clearCart
} = cartSlice.actions;
export default cartSlice.reducer;
