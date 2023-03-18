import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { showAnswer } from '../../../redux/slices/calculatorSlice';
import { RootState } from '../../../redux/store';
import styles from './EqualBlock.module.scss';

const EqualBlock = () => {
  const { mode } = useSelector((state: RootState) => state.mode);
  const dispatch = useDispatch();

  const constructorClasses = mode
    ? [styles.button].join(' ')
    : [styles.button, styles.active].join(' ');

  const handleShowAnswer = () => {
    dispatch(showAnswer('='));
  };
  return (
    <div  className={styles.root}>
      <div className={styles.content}>
        <div onClick={() => handleShowAnswer()} className={constructorClasses}>
          <div>=</div>
        </div>
      </div>
    </div>
  );
};

export default EqualBlock;
