import { createSlice } from '@reduxjs/toolkit';

// 1. Fonction Helper pour charger la wishlist
const loadWishlistFromStorage = () => {
  try {
    const storedWishlist = localStorage.getItem('shoptech_wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  } catch (error) {
    return [];
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: loadWishlistFromStorage() },
  reducers: {
    toggleWishlist: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        // Si existe déjà, on supprime
        state.items.splice(index, 1);
      } else {
        // Sinon, on ajoute
        state.items.push(action.payload);
      }
      // SAUVEGARDE
      localStorage.setItem('shoptech_wishlist', JSON.stringify(state.items));
    }
  }
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;