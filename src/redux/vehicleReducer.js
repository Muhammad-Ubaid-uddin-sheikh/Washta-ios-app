import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vehicles: [],
};

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    addVehicle: (state, action) => {
      state.vehicles.push(action.payload);
    },
    // Other reducers...
  },
});

export const { addVehicle } = vehicleSlice.actions;

export default vehicleSlice.reducer;
