import {
  ItemProps as InnerItemProps,
  ListProps,
  OptionProps,
  DragListProps as DragProps,
  DragItemProps,
} from './interfance';
import List from './List';
import Item from './Item';
import Drag from './Drag';
import DragItem from './DragItem';
import Selection from './Selection';
import SelectionItem from './SelectionItem';
import WithSubComponent from '../utils/withSubComponent';

type ItemProps = Omit<InnerItemProps, 'selected' | 'isMultiple'>;

export type { ItemProps, ListProps, OptionProps, DragProps, DragItemProps };

export { List, Item, Drag, DragItem, Selection, SelectionItem };

export default WithSubComponent(List, { Item, Drag, DragItem, Selection, SelectionItem });
