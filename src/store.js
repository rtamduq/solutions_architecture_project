// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Ajusta la ruta según tu estructura de archivos

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
