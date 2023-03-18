import { createSlice } from '@reduxjs/toolkit';

interface CalculatorState {
  value: string;
  result: string;
  mathButtons: string[];
  operationButtons: string[];
  firstValue: string,
  secondValue: string,
  sign: string,
  showValue: string;
}

const initialState: CalculatorState = {
  firstValue: '',
  secondValue: '',
  sign: '',
  value: '',
  showValue: '',
  result: '',
  mathButtons: ['/', 'x', '-', '+'],
  operationButtons: ['/', 'x', '-', '+', '.'],
}



const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    addMathValue(state, action) {
      state.result = state.result.toString();
      if (state.firstValue === '') {
        state.firstValue = '0';
      }
      if (state.operationButtons.includes(action.payload) && state.firstValue !== '') {
        state.sign = action.payload;
      }
      if (state.firstValue !== '' && state.secondValue !== '' && state.sign !== '') {
        try {
          state.result = state.result.replace(/x/g, '*');
          state.result = state.result.replace(/,/g, '.');
          state.result = eval(state.result);
          state.result = state.result.toString();
          if (state.result.length > 17) {
            state.result = (Number(state.result).toFixed(15))
          }
          state.result = state.result.replace('.', ',');
          if (state.result == 'Infinity' || state.result == 'NaN' || state.result === "-Infinity") {
            state.result = 'Не определенно';
          }
          state.firstValue = state.result.toString();
          state.sign = action.payload;
          state.secondValue = '';
        } catch (error) {
          state.result = 'Не определенно';
          state.firstValue = state.result;
          state.sign = action.payload === '=' ? '' : action.payload;
          state.secondValue = '';
        }
      }
      if (state.result === 'Не определенно') {
        state.result = 'Не определенно';
        state.firstValue = 'Не определенно';
        state.sign = '';
        state.secondValue = '';
      }
      state.result = state.firstValue + state.sign + state.secondValue;
      if (state.secondValue === '') {
        state.showValue = state.firstValue
      } else {
        state.showValue = state.secondValue;
      }

    },
    addDigitValue(state, action) {

      if (state.result === 'Не определенно' || state.result === 'NaN') {
        state.result = '';
        state.firstValue = '';
        state.sign = '';
        state.secondValue = '';
      }
      if (state.sign === '' && state.secondValue === '') {
        if (action.payload === ',' && state.firstValue === '0') {
          state.firstValue += action.payload;
        }
        else if (action.payload === ',' && !state.firstValue) {
          state.firstValue = '0,'
        } else if (state.firstValue === '0' && action.payload !== '0') {
          state.firstValue = action.payload;
        } else if (state.firstValue.includes(',') && action.payload === ',') {
          return
        } else {
          state.firstValue += action.payload;
        }
      }
      if (state.firstValue !== '' && state.sign !== '') {
        if (action.payload === ',' && !state.secondValue) {
          state.secondValue = '0,'
        } else if (state.sign !== '' && state.secondValue === '0') {
          state.secondValue = action.payload;
        } else if (state.secondValue === '0' && action.payload !== '0') {
          state.secondValue = action.payload;
        } else if (state.secondValue.includes(',') && action.payload === ',') {
          return
        } else {
          state.secondValue += action.payload;
        }
      }
      state.result = state.firstValue + state.sign + state.secondValue;
      if (state.secondValue === '') {
        state.showValue = state.firstValue
      } else {
        state.showValue = state.secondValue;
      }
    },

    showAnswer(state, action) {
      if (!state.result.length) {
        state.firstValue = '0';
        state.sign = '=';
        return;
      }
      const lastSymbol = state.result.at(-1);
      if (state.result === state.firstValue + '=') {
        state.secondValue = state.firstValue;
      }
      if (lastSymbol) {
        if (state.operationButtons.includes(lastSymbol)) {
          state.result = state.firstValue + state.sign + state.firstValue;
          state.sign = lastSymbol;
        }
      }

      try {
        state.result = state.result.replace(/x/g, '*');
        state.result = state.result.replace(/,/g, '.');
        state.result = eval(state.result);
        state.result = state.result.toString();
        if (state.result.length > 17) {
          state.result = (Number(state.result).toFixed(15))
        }
        state.result = state.result.replace('.', ',');
        if (state.result == 'Infinity' || state.result == '-Infinity' || state.result == 'NaN') {
          state.result = 'Не определенно';
        }
        state.firstValue = state.result.toString();
        if (lastSymbol && state.operationButtons.includes(lastSymbol)) {
          state.sign = lastSymbol;
        } else if (action.payload !== '=') {
          state.sign = action.payload;
        } 
        state.secondValue = '';
      } catch (error) {
        state.result = 'Не определенно';
        state.firstValue = state.result;
        state.sign = action.payload === '=' ? '' : action.payload;
        state.secondValue = '';
      }

      if (state.result === 'Не определенно' || state.result === 'NaN') {
        state.result = 'Не определенно';
        state.firstValue = 'Не определенно';
        state.sign = '';
        state.secondValue = '';
      }
      state.result = state.firstValue + state.sign + state.secondValue;
      if (state.secondValue === '') {
        state.showValue = state.firstValue
      } else {
        state.showValue = state.secondValue;
      }
    },
    resetData(state) {
      state.result = '';
      state.firstValue = '';
      state.secondValue = '';
      state.sign = '';
      state.showValue = '';
    }
  }
})

export const { resetData, addMathValue, addDigitValue, showAnswer } = calculatorSlice.actions;
export default calculatorSlice.reducer;