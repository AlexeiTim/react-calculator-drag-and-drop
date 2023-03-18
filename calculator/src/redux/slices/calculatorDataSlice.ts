import { createSlice } from '@reduxjs/toolkit';

export type Items = {
  id: number;
  name: string;
  category: number;
  active: boolean;
};
type FlashElement = {
  id: number | null;
};
interface CalculatorDataState {
  leftItems: Items[];
  rightItems: Items[];
  isActive: boolean;
  windowFlash: boolean;
  hasElement: boolean;
  flashElement: FlashElement;
  flashCalcElement: FlashElement;
}

const initialState: CalculatorDataState = {
  leftItems: [
    {
      id: 0,
      name: 'window',
      category: 0,
      active: true,
    },
    {
      id: 1,
      name: 'math',
      category: 0,
      active: true,
    },
    {
      id: 2,
      name: 'digits',
      category: 0,
      active: true,
    },
    {
      id: 3,
      name: 'equal',
      category: 0,
      active: true,
    },
  ],
  rightItems: [],
  isActive: false,
  windowFlash: false,
  hasElement: false,
  flashElement: { id: null },
  flashCalcElement: { id: null },
};

export const calculatorDataSlice = createSlice({
  name: 'calculatorData',
  initialState,
  reducers: {
    changeLeftItems(state, action) {
      state.leftItems = action.payload;
    },
    changeRightItems(state, action) {
      state.rightItems = action.payload;
    },
    changeActive(state, action) {
      state.isActive = action.payload;
    },
    changeWindowFlash(state, action) {
      state.windowFlash = action.payload;
    },
    changeHasElement(state, action) {
      state.hasElement = action.payload;
    },
    changeFlashElement(state, action) {
      state.flashElement = action.payload;
    },
    changeFlashCalcElement(state, action) {
      state.flashCalcElement = action.payload;
    },
  },
});

export const {
  changeLeftItems,
  changeRightItems,
  changeFlashCalcElement,
  changeActive,
  changeWindowFlash,
  changeHasElement,
  changeFlashElement,
} = calculatorDataSlice.actions;
export default calculatorDataSlice.reducer;
