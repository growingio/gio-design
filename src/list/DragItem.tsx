import { DragOutlined } from '@gio-design/icons';
import classNames from 'classnames';
import React, { useRef } from 'react';
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { usePrefixCls } from '@gio-design/utils';
import { PREFIX } from './constants';
import { DragItemProps } from './interface';
import Item from './Item';

const DragItem: React.FC<DragItemProps> = (props) => {
  const { label, value, onMoved, index, disabled, ...rest } = props;
  const prefixCls = `${usePrefixCls(PREFIX)}`;
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'drag-item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { index: number; type: string; id: string }, monitor: DropTargetMonitor) {

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect() || { bottom: 0, top: 0 };
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Dragging upwards or downwards
      if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) || (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) {
        return
      };

      onMoved?.(dragIndex as number, hoverIndex);
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });
  const [, drag] = useDrag({
    item: { type: 'drag-item', id: value, index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !disabled,
  });

  drag(drop(ref));
  return (
    <div
      className={classNames(`${prefixCls}--item`, `${prefixCls}--item--drag`, {
        [`${prefixCls}--item--disabled`]: disabled,
      })}
      ref={ref}
      data-handler-id={handlerId}
    >
      <DragOutlined
        className={classNames(`${prefixCls}--item--drag--icon`, {
          [`${prefixCls}--item--drag--icon--disabled`]: disabled,
        })}
        color="#ADB2C2"
        size="14px"
      />
      <Item label={label} value={value} disabled={disabled} {...rest} />
    </div>
  );
};

export default DragItem;
