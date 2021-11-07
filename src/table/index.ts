import ResizableTable from './ResizableTable';
import DragTable from './DragTable';
import { TableProps } from './interface';
import InnerTable from './Table';
import WithSubComponent from '../utils/withSubComponent';

export { TableProps, ResizableTable, DragTable };

export const Table = WithSubComponent(InnerTable, {
  ResizableTable,
  DragTable,
});

export default Table;
