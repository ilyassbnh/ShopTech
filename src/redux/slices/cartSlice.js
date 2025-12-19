import { createSlice } from '@reduxjs/toolkit';

// 1. Fonction Helper pour charger le panier existant
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem('shoptech_cart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    return [];
  }
};

const initialState = {
  cartItems: loadCartFromStorage(), // On démarre avec les données sauvegardées
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
      // SAUVEGARDE
      localStorage.setItem('shoptech_cart', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      // SAUVEGARDE
      localStorage.setItem('shoptech_cart', JSON.stringify(state.cartItems));
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        // SAUVEGARDE
        localStorage.setItem('shoptech_cart', JSON.stringify(state.cartItems));
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        // SAUVEGARDE
        localStorage.setItem('shoptech_cart', JSON.stringify(state.cartItems));
      }
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    }
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;