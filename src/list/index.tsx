import {
  ItemProps as InnerItemProps,
  ListProps as InnerListProps,
  OptionProps,
  DragListProps as DragProps,
  DragItemProps,
  BaseItemProps,
  CascaderItemProps,
} from './interfance';
import List from './List';
import Item from './Item';
import Drag from './Drag';
import DragItem from './DragItem';
import Selection from './Selection';
import BaseItem from './inner/baseItem';
import WithSubComponent from '../utils/withSubComponent';

type ItemProps = Omit<InnerItemProps, 'selected' | 'selectValue'>;
type ListProps = Omit<InnerListProps, 'selectedParent'>;

export type { ItemProps, ListProps, OptionProps, DragProps, DragItemProps, BaseItemProps, CascaderItemProps };

export { List, Item, Drag, DragItem, Selection, BaseItem };

export default WithSubComponent(List, { Item, Drag, DragItem, Selection });
