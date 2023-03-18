import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import styles from './CalcWindow.module.scss';

function CalcWindow() {
  const { showValue } = useSelector((state: RootState) => state.calculator);
  const constructorClasses =
    showValue.length < 9 ? [styles.content].join(' ') : [styles.content, styles.active].join(' ');

  return (
    <div className={styles.root}>
      <div className={constructorClasses}>
        <p>{showValue || '0'}</p>
      </div>
    </div>
  );
}

export default CalcWindow;
