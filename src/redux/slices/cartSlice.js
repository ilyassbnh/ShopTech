import { createSlice } from '@reduxjs/toolkit';

// On garde juste ça pour charger les données au démarrage (refresh)
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem('shoptech_cart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    return [];
  }
};

const initialState = {
  cartItems: loadCartFromStorage(), 
  isOpen: false, 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.isOpen = true;
      // PAS DE LOCALSTORAGE ICI
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      // PAS DE LOCALSTORAGE ICI
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    }
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;