import { Items } from '../redux/slices/calculatorDataSlice';

export const copyAndChangeActiveById = (arr: Items[], id: number) => {
  let copyLeftArray = [...arr];
  copyLeftArray = copyLeftArray.map((item) =>
    item.id == id ? { ...item, active: true } : { ...item }
  );
  return copyLeftArray;
};

export const copyAndChangeNotActiveById = (arr: Items[], currentIndex: number) => {
  let copyLeft = [...arr];
  copyLeft = copyLeft.map((item) =>
    item.id === currentIndex ? { ...item, active: false } : { ...item }
  );
  return copyLeft;
};

export const copyAndFilterById = (array: Items[], id: number): Items[] => {
  let copyArray = [...array];
  copyArray = copyArray.filter((item) => item.id !== id);
  return copyArray;
};

export const checkActive = (status: boolean) => {
  return status ? true : false;
};

export const isElementInArray = (array: Items[], id: number) => {
  return array.some((item) => item.id === id);
};

export const getSwappingElement = (
  rightItems: Items[],
  dragItemId?: number,
  targetItemId?: number
): Items[] => {
  const dragIndex = rightItems.findIndex((item) => item.id === dragItemId);
  const targetIndex = rightItems.findIndex((item) => item.id === targetItemId);
  const copyDragItem = rightItems[dragIndex];
  const copyTargetItem = rightItems[targetIndex];
  const copyArray = [...rightItems];
  copyArray[dragIndex] = copyTargetItem;
  copyArray[targetIndex] = copyDragItem;
  return copyArray;
};
