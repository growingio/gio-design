import React from 'react';
import classnames from 'classnames';
import { useControlledState, useLocale, usePrefixCls, useSize } from '@gio-design/utils';
import Empty from '../components/empty';
import Group from './Group';
import Subgroup from './Subgroup';
import Item from './Item';
import Divider from './Divider';
import { ListPickerProps, ItemProps, GroupProps, DividerProps, SubgroupProps, ListPickerLocale } from './interfaces';
import defaultLocale from './locales/zh-CN';

const ListPicker: React.FC<ListPickerProps> & {
  Item: React.FC<ItemProps>;
  Group: React.FC<GroupProps>;
  Subgroup: React.FC<SubgroupProps>;
  Divider: React.FC<DividerProps>;
} = ({
  className,
  defaultValue,
  style,
  children,
  items,
  expandable = false,
  emptyImage,
  locale: customizeLocale,
  size: customizeSize,
  value,
  onSelect,
}: ListPickerProps) => {
  const locale = useLocale('ListPicker');
  const prefixCls = usePrefixCls('list-picker');
  const size = useSize();
  const [currentValue, setCurrentVaule] = useControlledState(value, defaultValue);

  const coalescingSize = customizeSize ?? size;
  const cls = classnames(
    prefixCls,
    {
      [`${prefixCls}--${coalescingSize}`]: true,
    },
    className
  );
  const {
    empty: { description },
    expandText,
  } = {
    ...defaultLocale,
    ...locale,
    ...customizeLocale,
  } as ListPickerLocale;
  const handleOnSelect = (selectedValue: string) => {
    setCurrentVaule(selectedValue);
    onSelect?.(selectedValue);
  };
  const content = () => {
    if (items && items.length > 0) {
      return items.map((item: GroupProps | ItemProps) => {
        if ('title' in item) {
          const groupProps = {
            ...item,
            expandable,
            expandText,
          };
          return <Group {...groupProps} key={groupProps.key} value={currentValue} onSelect={handleOnSelect} />;
        }
        const itemProps = item as ItemProps;
        return (
          <Item
            {...itemProps}
            onClick={() => handleOnSelect(itemProps.value)}
            selected={itemProps.value === currentValue}
            key={itemProps.value}
          />
        );
      });
    }
    if (children) {
      return children;
    }
    return <Empty size="small" description={description} image={emptyImage} />;
  };

  return (
    <ul className={cls} style={style}>
      {content()}
    </ul>
  );
};

ListPicker.Item = Item;
ListPicker.Group = Group;
ListPicker.Subgroup = Subgroup;
ListPicker.Divider = Divider;

export default ListPicker;
