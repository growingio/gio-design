import {
  ItemProps as InnerItemProps,
  ListProps,
  OptionProps,
  DragListProps as DragProps,
  DragItemProps,
  BaseItemProps,
} from './interfance';
import List from './List';
import Item from './Item';
import Drag from './Drag';
import DragItem from './DragItem';
import Selection from './Selection';
import SelectionItem from './SelectionItem';
import BaseItem from './inner/baseItem';
import WithSubComponent from '../utils/withSubComponent';

type ItemProps = Omit<InnerItemProps, 'selected' | 'isMultiple'>;

export type { ItemProps, ListProps, OptionProps, DragProps, DragItemProps, BaseItemProps };

export { List, Item, Drag, DragItem, Selection, SelectionItem, BaseItem };

export default WithSubComponent(List, { Item, Drag, DragItem, Selection, SelectionItem });
