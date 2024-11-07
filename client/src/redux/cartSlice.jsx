import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    redirectToLogin:false,
  },
  reducers: {
    addToCard(state, action) {
      const { productId, quantity, product , selectedColor,
        selectedSize } = action.payload;

        const token = localStorage.getItem("token");
        const userData = localStorage.getItem('user-info')
       const user_info = JSON.parse(userData);
    if (!token && !user_info?.token) {
        // Redirect to login page
        state.redirectToLogin = true;
      } else {
        // Proceed with adding to cart
        state.redirectToLogin = false;
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
    }
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
      state.redirectToLogin =false;
      state.items = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
    },
  },
});
export const {
  addToCard,
  removeToCart,
  updateQuantityItems,
  subtractQuantityItems,
  clearCart
} = cartSlice.actions;
export default cartSlice.reducer;
