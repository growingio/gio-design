import React from 'react';
import Item from './Item';
import ExpandItem from './ExpandItem';
import { ItemProps } from './interfaces';
import { DEFAULT_SHOW_ITEMS_COUNT } from './constants';

export function renderItem(i: ItemProps) {
  return <Item {...i} key={i.value} />;
}

export function renderItems(
  expandable: boolean,
  expanded: boolean,
  currentItems: ItemProps[],
  onExpand: () => void,
  expandText?: string
) {
  if (expandable && !expanded && currentItems.length > DEFAULT_SHOW_ITEMS_COUNT) {
    const showItems = currentItems.slice(0, DEFAULT_SHOW_ITEMS_COUNT);
    return showItems
      .map(renderItem)
      .concat(<ExpandItem key={`expand-item-${showItems.length + 1}`} onClick={onExpand} text={expandText} />);
  }
  return currentItems.map(renderItem);
}

export default {
  renderItem,
  renderItems,
};
