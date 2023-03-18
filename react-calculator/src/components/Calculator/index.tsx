import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  changeActive,
  changeFlashCalcElement,
  changeFlashElement,
  changeHasElement,
  changeLeftItems,
  changeRightItems,
  changeWindowFlash,
} from '../../redux/slices/calculatorDataSlice';
import { RootState } from '../../redux/store';
import { MathOperation } from '../../types/enums';
import {
  checkActive,
  copyAndChangeActiveById,
  copyAndChangeNotActiveById,
  copyAndFilterById,
  getSwappingElement,
  isElementInArray,
} from '../../Utils/intex';
import CalculatorRightContent from './CalculatorRightContent';
import CalcWindow from './CalcWIndow';
import Controller from './Controller/Controller';
import DigitBlock from './DigitBlock';
import EqualBlock from './EqulaBlock';
import './MainComponent.scss';
import MathBlock from './MathBlock';
import { Items } from '../../redux/slices/calculatorDataSlice';

const Calculator = () => {
  const { mode } = useSelector((state: RootState) => state.mode);
  const {
    isActive,
    windowFlash,
    hasElement,
    flashElement,
    flashCalcElement,
    leftItems,
    rightItems,
  } = useSelector((state: RootState) => state.calculatorData);

  const dispatch = useDispatch();
  const dragItem = React.useRef<number>(0);
  const testRef = React.useRef(true);
  const targetItem = React.useRef<Items | undefined>();
  const draggableItem = React.useRef<Items | undefined>();

  const dragStart = (e: React.DragEvent, index: number) => {
    e.stopPropagation();
    dragItem.current = 0;
    dragItem.current = dragItem.current + index;
  };

  const dragEntry = (e: React.DragEvent, element: Items | undefined) => {
    if (!testRef.current) return;
    if (!dragItem.current && rightItems.length) {
      dispatch(changeWindowFlash(true));
    } else {
      hasElement === true ? '' : dispatch(changeActive(true));
    }
  };

  const dragLeave = (element: Items | undefined) => {
    hasElement === true ? '' : dispatch(changeActive(true));
    if (element) {
      dispatch(changeWindowFlash(false));
      dispatch(changeFlashElement({ id: null }));
    }
  };

  const drop = (element: Items | undefined) => {
    if (draggableItem.current) {
      return;
    }
    dispatch(changeActive(false));
    if (!isElementInArray(rightItems, dragItem.current)) {
      const currentElement = leftItems[dragItem.current];
      dispatch(changeLeftItems(copyAndChangeNotActiveById(leftItems, dragItem.current)));
      if (dragItem.current === 0) {
        dispatch(changeRightItems([{ ...currentElement, category: 1 }, ...rightItems]));
      } else {
        dispatch(changeRightItems([...rightItems, { ...currentElement, category: 1 }]));
      }
      dispatch(changeHasElement(true));
      if (element) dispatch(changeFlashElement({ id: null }));
    }
  };

  const dragOver = (e: React.DragEvent, element: Items | undefined) => {
    e.preventDefault();
    if (!testRef.current) return;
    if (!dragItem.current) {
    } else if (element) {
      dispatch(changeFlashElement({ id: element.id }));
    }
  };

  const deleteElement = (e: React.MouseEvent, id: number) => {
    if (mode) {
      if (e.detail > 1) {
        const checkElement = copyAndFilterById(rightItems, id);
        if (checkElement.length === 0) dispatch(changeHasElement(false));
        dispatch(changeRightItems(checkElement));
        dispatch(changeLeftItems(copyAndChangeActiveById(leftItems, id)));
      }
    }
  };

  const dragEnd = () => {
    dispatch(changeWindowFlash(false));

    setTimeout(() => {
      if (rightItems.length === 0) {
        dispatch(changeActive(false));
      }
    }, 0);
  };

  const dragStartCalcElement = (e: React.DragEvent, item: Items) => {
    e.stopPropagation();
    testRef.current = false;
    draggableItem.current = item;
  };

  const dragEndCalcElement = (e: React.DragEvent, index: number) => {
    if (e.currentTarget.getAttribute('draggable') !== 'true') {
      return;
    }
    testRef.current = true;
    dispatch(changeFlashCalcElement({ id: null }));
    draggableItem.current = undefined;
  };
  const dragEnterCalcElement = (e: React.DragEvent, item: Items) => {
    e.preventDefault();
    dispatch(changeFlashCalcElement({ id: item.id }));
    const id = e.currentTarget.getAttribute('data-item');
    if (id) {
      targetItem.current = rightItems.filter((el) => el.id === +id)[0];
    }
  };
  const dragOverCalcElement = (e: React.DragEvent, item: Items) => {
    e.preventDefault();
    dispatch(changeFlashCalcElement({ id: item.id }));
  };

  const dragDropCalcElement = (e: React.DragEvent) => {
    e.preventDefault();
    const dragItemId = draggableItem.current?.id;
    const targetItemId = targetItem.current?.id;
    if (targetItemId === 0) {
      return;
    }
    dispatch(changeRightItems(getSwappingElement(rightItems, dragItemId, targetItemId)));
  };
  const giveFlashClass = (id: number) => {
    if (draggableItem.current?.category === 1) {
      if (targetItem.current?.id === 0) return false;
      return flashCalcElement.id === id ? 'flash-border' : '';
    }
  };

  const getClassForWindow = (index: number) => {
    rightItems[0].id === index - 1 ? 'window' : '';
  };

  const elementFabric = (name: string) => {
    switch (name) {
      case MathOperation.WINDOW:
        return <CalcWindow />;
      case MathOperation.MATH:
        return <MathBlock />;
      case MathOperation.DIGITS:
        return <DigitBlock />;
      case MathOperation.EQUAL:
        return <EqualBlock />;
    }
  };
  const isDraggableRightItems = (item: Items) => {
    const result = item.id === 0 ? false : true;
    if (!mode) {
      return false;
    }
    return result;
  };
  const calculatorConstructor = () => {
    return (
      <>
        {rightItems.map((item, index) => (
          <div
            data-item={item.id}
            onClick={(e) => deleteElement(e, item.id)}
            onDragStart={(e) => dragStartCalcElement(e, rightItems[index])}
            onDragEnd={(e) => dragEndCalcElement(e, index)}
            draggable={isDraggableRightItems(item)}
            onDragEnter={(e) => dragEnterCalcElement(e, rightItems[index])}
            onDragOver={(e) => dragOverCalcElement(e, rightItems[index])}
            onDrop={(e) => dragDropCalcElement(e)}
            key={item.name}
            className={`left-block__item right ${
              flashElement.id === item.id ? 'active' : ''
            } ${giveFlashClass(item.id)}  ${item.id === 0 ? 'error' : ''}
              ${windowFlash ? getClassForWindow(index) : ''}
              `}>
            {elementFabric(item.name)}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="container">
      <div className="calculator__controller">
        <div></div>
        <Controller />
      </div>
      <div className="drag">
        <div className={`drag__left-block block ${mode ? '' : 'hidden'}`}>
          {leftItems.map((item, index) => (
            <div
              onDragEnd={dragEnd}
              data-index={index}
              onDragStart={(e) => dragStart(e, index)}
              draggable={checkActive(item.active)}
              key={item.name}
              className={`${!item.active ? 'left-block__item opacity' : 'left-block__item'}`}>
              {elementFabric(item.name)}
            </div>
          ))}
        </div>
        <div
          onDragOver={(e) => dragOver(e, rightItems.at(-1))}
          onDrop={() => drop(rightItems.at(-1))}
          onDragLeave={() => dragLeave(rightItems.at(-1))}
          onDragEnter={(e) => dragEntry(e, rightItems.at(-1))}
          className={`drag__right-block block ${isActive ? 'active' : ''}`}>
          {!rightItems.length ? <CalculatorRightContent /> : calculatorConstructor()}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
