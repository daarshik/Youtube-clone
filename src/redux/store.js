import { configureStore } from '@reduxjs/toolkit';
import userslices from './slices/userslices';
import videoslices from './slices/videoslices';

const store = configureStore({
  reducer: {
    userinfo: userslices,
    video: videoslices
  },
});

export default store;
