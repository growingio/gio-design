import { useRef } from 'react';
import { isUndefined } from 'lodash';
import { GetComponentProps } from '../interface';

const useHackOnRow = <RecordType,>(OnRow: GetComponentProps<RecordType> | undefined, hackRowEvent: boolean) => {
  const constant = useRef([0, 0, 0, 0]);
  const OnHackRow: (record: RecordType) => React.HTMLAttributes<HTMLElement> = (record) => {
    if (isUndefined(OnRow)) {
      return {};
    }
    const { onClick, onMouseDown, onMouseUp, ...rest } = OnRow(record);
    const onHackMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onMouseDown?.(e);
      constant.current[0] = e.clientX;
      constant.current[1] = e.clientY;
    };
    const onHackMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onMouseUp?.(e);
      constant.current[2] = e.clientX;
      constant.current[3] = e.clientY;
    };
    const onHackClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const [clientX1, clientY1, clientX2, clientY2] = constant.current;
      if (Math.hypot(clientX2 - clientX1, clientY2 - clientY1) < 1) {
        onClick?.(e);
      }
      constant.current = [0, 0, 0, 0];
    };
    return { ...rest, onClick: onHackClick, onMouseDown: onHackMouseDown, onMouseUp: onHackMouseUp };
  };
  return hackRowEvent ? OnHackRow : OnRow;
};

export default useHackOnRow;
