import {
  ItemProps as InnerItemProps,
  ListProps as InnerListProps,
  OptionProps,
  DragListProps as DragProps,
  DragItemProps,
  BaseItemProps,
  CascaderItemProps,
  ModelType,
} from './interface';
import List from './List';
import VirtualList from './VirtualList'
import Item from './Item';
import Drag from './Drag';
import DragItem from './DragItem';
import Selection from './Selection';
import BaseItem from './inner/baseItem';
import WithSubComponent from '../utils/withSubComponent';

type ItemProps = Omit<InnerItemProps, 'selected' | 'selectValue'>;
type ListProps = Omit<InnerListProps, 'selectParent'>;

export type {
  ItemProps,
  ListProps,
  OptionProps,
  DragProps,
  DragItemProps,
  BaseItemProps,
  CascaderItemProps,
  ModelType,
};
export { List, Item, Drag, DragItem, Selection, BaseItem,VirtualList };

export default WithSubComponent(List, { Item, Drag, DragItem, Selection,VirtualList });
