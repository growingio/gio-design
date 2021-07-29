import React from 'react';
import classnames from 'classnames';
import { useControlledState, usePrefixCls } from '@gio-design/utils';
import List from '../components/list';
import { ListPickerProps } from './interfaces';

const ListPicker: React.FC<ListPickerProps> = ({ defaultValue, options, value, onSelect }: ListPickerProps) => {
  const [currentValue, setCurrentVaule] = useControlledState(value, defaultValue);
  const prefixCls = usePrefixCls('list-picker');
  const itemPrefixCls = `${prefixCls}__item`;

  function onItemClick(selectedValue: string) {
    setCurrentVaule(selectedValue);
    onSelect?.(selectedValue);
  }

  return (
    <List className={prefixCls}>
      {options.map((o) => (
        <List.Item
          key={o.value}
          className={classnames(itemPrefixCls, { [`${itemPrefixCls}--actived`]: o.value === currentValue })}
          onClick={() => {
            onItemClick(o.value);
          }}
        >
          {o.label}
        </List.Item>
      ))}
    </List>
  );
};

export default ListPicker;
