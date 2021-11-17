/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import classnames from 'classnames';
import { useControlledState, usePrefixCls } from '@gio-design/utils';
import ListPicker from '../list-picker';
import Selector from '../selector';
import { ListSelectorProps } from './interfaces';
import { ItemProps } from '../list-picker/interfaces';

function ListSelector({
  allowClear,
  className,
  defaultValue,
  defaultVisible,
  fitContent,
  getContainer,
  onSelect,
  placeholder,
  size: customizeSize,
  style,
  triggerClassName,
  triggerStyle,
  value,
  visible,
  ...listProps
}: ListSelectorProps) {
  const [controlledValue, setControlledValue] = useControlledState(value, defaultValue);
  const [dropdownVisible, setDropdownVisible] = useControlledState(visible, defaultVisible);
  const [currentItem, setCurrentItem] = React.useState<React.ReactNode>();
  const prefixCls = usePrefixCls('list-selector');

  const handleOnSelect = (currentValue: string, item: ItemProps) => {
    setDropdownVisible(false);
    setControlledValue(currentValue);
    setCurrentItem(item);
    onSelect?.(currentValue);
  };
  const overlay = <ListPicker {...listProps} value={controlledValue} onSelect={handleOnSelect} />;
  const cls = classnames(prefixCls, className);
  return (
    <Selector
      allowClear={allowClear}
      onClear={() => {
        // @ts-ignore
        setControlledValue(null);
        setCurrentItem(undefined);
        // @ts-ignore
        onSelect?.(undefined);
      }}
      className={cls}
      fitContent={fitContent}
      getContainer={getContainer}
      style={style}
      size={customizeSize}
      triggerClassName={triggerClassName}
      triggerStyle={triggerStyle}
      overlay={overlay}
      overlayClassName={`${prefixCls}__dropdown`}
      visible={dropdownVisible}
      onVisibleChange={setDropdownVisible}
      itemRender={() => currentItem}
      placeholder={placeholder}
    />
  );
}

export default ListSelector;
