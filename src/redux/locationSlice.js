import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  location: ''
};

// Create a slice
const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    addLocation: (state, action) => {
      state.location = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    }
  }
});

// Export actions
export const { addLocation, setLocation } = locationSlice.actions;

// Export reducer
export default locationSlice.reducer;
