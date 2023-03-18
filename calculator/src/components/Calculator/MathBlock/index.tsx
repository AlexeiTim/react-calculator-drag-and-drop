import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addMathValue } from '../../../redux/slices/calculatorSlice';
import { RootState } from '../../../redux/store';
import styles from './MathBlock.module.scss';

const MathBlock = () => {
  const { mode } = useSelector((state: RootState) => state.mode);
  const { mathButtons } = useSelector((state: RootState) => state.calculator);
  const dispatch = useDispatch();

  const handleClick = (value: string) => {
    if (mode) return;
    dispatch(addMathValue(value));
  };

  const constructorClasses = mode
    ? [styles.button].join(' ')
    : [styles.button, styles.active].join(' ');

  return (
    <div draggable="false" className={styles.root}>
      <div className={styles.content}>
        {mathButtons.map((item) => (
          <div onClick={() => handleClick(item)} key={item} className={constructorClasses}>
            <div>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MathBlock;
