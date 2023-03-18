import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addDigitValue } from '../../../redux/slices/calculatorSlice';
import { RootState } from '../../../redux/store';
import styles from './DigitBlock.module.scss';

const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];

const DigitBlock = () => {
  const { mode } = useSelector((state: RootState) => state.mode);
  const dispatch = useDispatch();

  const handleAddValue = (value: string) => {
    dispatch(addDigitValue(value));
  };
  const constructorZeroButtonClasses = mode
    ? [styles.buttonEqual, styles.button].join(' ')
    : [styles.buttonEqual, styles.button, styles.active].join(' ');

  const constructorDigitsButtonClasses = mode
    ? [styles.button].join(' ')
    : [styles.button, styles.active].join(' ');
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        {digits.map((item) => (
          <div
            onClick={() => handleAddValue(item)}
            key={item}
            className={constructorDigitsButtonClasses}
          >
            <div>{item}</div>
          </div>
        ))}
        <div onClick={() => handleAddValue('0')} className={constructorZeroButtonClasses}>
          <div>{'0'}</div>
        </div>
        <div onClick={() => handleAddValue(',')} className={constructorDigitsButtonClasses}>
          <div>{','}</div>
        </div>
      </div>
    </div>
  );
};

export default DigitBlock;
