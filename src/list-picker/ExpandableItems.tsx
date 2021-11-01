/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import Item from './Item';
import ExpandItem from './ExpandItem';
import { ExpandableItemsProps, ItemType } from './interfaces';
import { DEFAULT_SHOW_ITEMS_COUNT } from './constants';

function ExpandableItems({ expandable, expanded, expandText, onExpand, items, value }: ExpandableItemsProps) {
  function convertItemsToNodes(currentItems: ItemType[], selectedValue?: string) {
    return currentItems.map((i: ItemType) => <Item {...i} selected={i.value === selectedValue} key={i.value} />);
  }

  let elements;
  if (expandable && !expanded && items.length > DEFAULT_SHOW_ITEMS_COUNT) {
    const showItems = items.slice(0, DEFAULT_SHOW_ITEMS_COUNT);
    elements = convertItemsToNodes(showItems, value).concat(
      <ExpandItem key={`expand-item-${showItems.length + 1}`} onClick={onExpand} text={expandText} />
    );
  } else {
    elements = convertItemsToNodes(items, value);
  }
  return <>{elements}</>;
}

export default ExpandableItems;
