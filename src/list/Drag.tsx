import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { usePrefixCls } from '@gio-design/utils';
import { PREFIX } from './constants';
import { DragItemProps, DragListProps, OptionProps } from './interfance';
import DragItem from './DragItem';
import List from './List';

export const Drag: React.FC<DragListProps> & {
  Item: React.FC<DragItemProps>;
} = (props) => {
  const { onChange, className, style, options: propsOptions, disabled, ...rest } = props;

  const [options, setOptions] = useState(propsOptions);
  useEffect(() => {
    setOptions(propsOptions);
  }, [propsOptions]);
  const prefixCls = `${usePrefixCls(PREFIX)}`;

  const onMoved = (dragIndex: number, hoverIndex: number) => {
    const dragCard = options[dragIndex];
    const updateOptions = update(options, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    });
    setOptions(updateOptions);
    onChange?.(updateOptions);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <List className={classNames(`${prefixCls}--drag`, className)} style={style}>
        {options?.map((option: OptionProps, index: number) => (
          <DragItem
            {...option}
            {...rest}
            index={index}
            onMoved={onMoved}
            disabled={option?.disabled ?? disabled}
            key={option?.value}
          />
        ))}
      </List>
    </DndProvider>
  );
};
Drag.Item = DragItem;
export default Drag;
