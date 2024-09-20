// promoCodeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const promoCodeSlice = createSlice({
  name: 'promoCode',
  initialState: {
    appliedPromo: null, // We'll store the full API response here
  },
  reducers: {
    setPromoCode: (state, action) => {
      state.appliedPromo = action.payload; // Store entire response in appliedPromo
    },
    clearPromoCode: (state) => {
      state.appliedPromo = null; // Clear the stored promo
    },
  },
});

export const { setPromoCode, clearPromoCode } = promoCodeSlice.actions;
export default promoCodeSlice.reducer;
