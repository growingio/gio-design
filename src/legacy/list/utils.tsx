/* eslint-disable import/prefer-default-export */
import React from 'react';
import Item from './Item';
import ExpandItem from './ExpandItem';
import { ListItemProps } from './interfaces';
import { DEFAULT_SHOW_ITEMS_COUNT } from './constants';

export function renderItem(i: ListItemProps, idx: number) {
  return <Item {...i} key={`item-${idx}`} />;
}

export function renderItems(
  expandable: boolean,
  expanded: boolean,
  currentItems: ListItemProps[],
  onExpand: () => void
) {
  if (expandable) {
    if (expanded) {
      return currentItems.map(renderItem);
    }
    if (currentItems.length > DEFAULT_SHOW_ITEMS_COUNT) {
      const showItems = currentItems.slice(0, DEFAULT_SHOW_ITEMS_COUNT);
      return showItems
        .map(renderItem)
        .concat(<ExpandItem key={`expand-item-${showItems.length + 1}`} onClick={onExpand} />);
    }
    return currentItems.map(renderItem);
  }
  return currentItems.map(renderItem);
}
