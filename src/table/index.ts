import ResizableTable from './ResizableTable';
import { TableProps } from './interface';
import InnerTable from './Table';
import WithSubComponent from '../utils/withSubComponent';

export { TableProps, ResizableTable };

export const Table = WithSubComponent(InnerTable, {
  ResizableTable,
});

export default Table;
