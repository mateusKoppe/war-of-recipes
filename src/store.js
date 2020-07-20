import { configureStore } from '@reduxjs/toolkit';
import battleReducer from 'features/battle/battleSlice';

export default configureStore({
  reducer: {
    battle: battleReducer
  },
});
