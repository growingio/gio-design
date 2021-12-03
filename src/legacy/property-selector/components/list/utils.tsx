/* eslint-disable import/prefer-default-export */
import React from 'react';
import { usePrefixCls } from '@gio-design/utils';
import Item from './Item';
import ExpandItem from './ExpandItem';
import { ListItemProps } from './interfaces';
import defaultLocalText from '../../../../list/locales/zh-CN';

const DEFAULT_SHOW_ITEMS_COUNT = 10;

export const useRootPrefixCls = () => usePrefixCls('list-property-selector');

export function renderItem(i: ListItemProps, idx: number) {
  return <Item {...i} key={i.key ?? `item-${idx}`} />;
}

export function renderExpandableItems(
  expanded: boolean,
  currentItems: ListItemProps[],
  onExpand: () => void,
  localesText: typeof defaultLocalText
) {
  if (expanded) {
    return currentItems.map(renderItem);
  }
  if (currentItems.length > DEFAULT_SHOW_ITEMS_COUNT) {
    const showItems = currentItems.slice(0, DEFAULT_SHOW_ITEMS_COUNT);
    return showItems
      .map(renderItem)
      .concat(
        <ExpandItem
          title={localesText.expandAll?.(currentItems.length - showItems.length)}
          key={`expand-item-${currentItems[0].key}-${showItems.length + 1}`}
          onClick={onExpand}
        />
      );
  }
  return currentItems.map(renderItem);
}
