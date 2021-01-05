import { ReactElement, useState } from 'react';

export type TUsePatchElement = () => [ReactElement[], (element: ReactElement) => () => void];

const usePatchElement: TUsePatchElement = () => {
  const [elements, setElements] = useState<ReactElement[]>([]);

  const handlePatch = (newElement: ReactElement) => {
    // 将新增的元素暂存
    setElements((originElements) => [...originElements, newElement]);

    // 以返回的函数调用的方式将新增的元素从数组中删除
    return () => {
      setElements((originElements) => originElements.filter((ele) => ele !== newElement));
    };
  };
  return [elements, handlePatch];
};

export default usePatchElement;
