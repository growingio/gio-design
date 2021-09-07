import React from 'react';
import classnames from 'classnames';
import { useLocale, usePrefixCls, useSize } from '@gio-design/utils';
import Empty from '../components/empty';
import ItemGroup from './ItemGroup';
import ItemSubgroup from './ItemSubgroup';
import Item from './Item';
import Divider from './Divider';
import {
  ListProps,
  ListItemProps,
  ListItemGroupProps,
  DividerProps,
  ListItemSubgroupProps,
  ListLocale,
} from './interfaces';
import defaultLocale from './locales/zh-CN';

const List: React.FC<ListProps> & {
  Item: React.FC<ListItemProps>;
  ItemGroup: React.FC<ListItemGroupProps>;
  ItemSubgroup: React.FC<ListItemSubgroupProps>;
  Divider: React.FC<DividerProps>;
} = ({
  className,
  style,
  children,
  items,
  expandable = false,
  emptyImage,
  locale: customizeLocale,
  size: customizeSize,
}: ListProps) => {
  const locale = useLocale('List');
  const prefixCls = usePrefixCls('list');
  const size = useSize();

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
  } as ListLocale;
  const content = () => {
    if (items && items.length > 0) {
      return items.map((item: ListItemGroupProps | ListItemProps) => {
        if ('title' in item) {
          const groupProps = {
            ...item,
            expandable,
            expandText,
          };
          return <ItemGroup {...groupProps} key={groupProps.key} />;
        }
        return <Item {...(item as ListItemProps)} key={item.key} />;
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

List.Item = Item;
List.ItemGroup = ItemGroup;
List.ItemSubgroup = ItemSubgroup;
List.Divider = Divider;

export default List;
