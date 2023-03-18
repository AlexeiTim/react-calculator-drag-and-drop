import { createSlice } from '@reduxjs/toolkit';

type ModeState = {
  mode: boolean;
};

const initialState: ModeState = {
  mode: true,
};

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    changeMode(state, action) {
      if (state.mode === action.payload) return;
      state.mode = !state.mode;
    },
  },
});

export const { changeMode } = modeSlice.actions;

export default modeSlice.reducer;
