// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import vehicleReducer from './vehicleReducer';
import locationReducer from './locationSlice';
import promoCodeReducer from './promoCodeSlice';

// import selectedVehicleReducer from './selectedVehicleReducer';

const rootReducer = combineReducers({
  vehicles: vehicleReducer,
  locations: locationReducer,
  promoCode: promoCodeReducer,
//   selectedVehicle: selectedVehicleReducer,
});

export default rootReducer;
