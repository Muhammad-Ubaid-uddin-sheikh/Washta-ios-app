import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './index'; // Assuming you have a root reducer

const store = configureStore({
  reducer: rootReducer,
});

export default store;
