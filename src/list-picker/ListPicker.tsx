/* eslint-disable react/no-array-index-key */
import React from 'react';
import classnames from 'classnames';
import { useControlledState, useLocale, usePrefixCls } from '@gio-design/utils';
import Empty from '../components/empty';
import Group from './Group';
import Subgroup from './Subgroup';
import Item from './Item';
import Divider from './Divider';
import {
  ListPickerProps,
  ItemProps,
  GroupProps,
  DividerProps,
  SubgroupProps,
  ListPickerLocale,
  GroupType,
  ItemType,
  SubgroupType,
  ValueItemMap,
} from './interfaces';
import defaultLocale from './locales/zh-CN';

function reduceItems(items: ItemType[]) {
  const map: ValueItemMap = {};
  items.forEach((item: ItemType) => {
    map[item.value] = item;
  });
  return map;
}

const ListPicker: React.FC<ListPickerProps> & {
  Item: React.FC<ItemProps>;
  Group: React.FC<GroupProps>;
  Subgroup: React.FC<SubgroupProps>;
  Divider: React.FC<DividerProps>;
} = ({
  className,
  defaultValue,
  style,
  items,
  expandable = false,
  emptyImage,
  groups,
  locale: customizeLocale,
  size: customizeSize,
  value,
  onSelect,
}: ListPickerProps) => {
  const locale = useLocale('ListPicker');
  const prefixCls = usePrefixCls('list-picker');
  const [currentValue, setCurrentVaule] = useControlledState(value, defaultValue);

  const coalescingSize = customizeSize;
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
  const handleOnSelect = (selectedValue: string, selectedItem?: React.ReactNode) => {
    setCurrentVaule(selectedValue);
    onSelect?.(selectedValue, selectedItem);
  };
  const itemsMap: ValueItemMap = React.useMemo(() => {
    let map = {};
    if (groups) {
      groups.forEach((group: GroupType) => {
        if (group.subgroups) {
          group.subgroups.forEach((subgroup: SubgroupType) => {
            map = { ...map, ...reduceItems(subgroup.items) };
          });
        }
        if (group.items) {
          map = { ...map, ...reduceItems(group.items) };
        }
      });
    }
    if (items) {
      map = { ...map, ...reduceItems(items) };
    }
    return map;
  }, [groups, items]);
  const content = React.useMemo(() => {
    if (groups && groups.length > 0) {
      return groups.map((group: GroupType, index: number) => {
        const groupProps = {
          ...group,
          expandable,
          expandText,
        };
        return (
          <Group {...groupProps} key={`group-${index}`} isLast={index === groups.length - 1} value={currentValue} />
        );
      });
    }
    if (items && items.length > 0) {
      return items.map((item: ItemType) => <Item {...item} selected={item.value === currentValue} key={item.value} />);
    }
    return undefined;
  }, [groups, items, expandable, expandText, currentValue]);

  return (
    <ul
      className={cls}
      style={style}
      onClick={(e: React.MouseEvent) => {
        const element = e.target as HTMLElement;
        if (element.tagName === 'LI') {
          const itemValue = element.getAttribute('value') as string;
          if (!itemsMap[itemValue].disabled) {
            handleOnSelect(itemValue, itemsMap[itemValue].children);
          }
        }
      }}
      role="presentation"
      onKeyPress={() => undefined}
    >
      {content ?? <Empty size="small" description={description} image={emptyImage} />}
    </ul>
  );
};

ListPicker.Item = Item;
ListPicker.Group = Group;
ListPicker.Subgroup = Subgroup;
ListPicker.Divider = Divider;

export default ListPicker;
