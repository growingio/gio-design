import NormalList from './normal';
import DragList from './drag';

export { IBaseListProps as ListProps, Option as ListOption } from './interface';

type TList = typeof NormalList & {
  DragList: typeof DragList;
};

const List = NormalList as TList;
List.DragList = DragList;

export { DragList };
export default List;
