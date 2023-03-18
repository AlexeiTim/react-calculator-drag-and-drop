import { configureStore } from '@reduxjs/toolkit';
import modeReducer from './slices/modeSlice';
import calculatorReducer from './slices/calculatorSlice';
import calculatorDataReducer from './slices/calculatorDataSlice';

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    calculator: calculatorReducer,
    calculatorData: calculatorDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
