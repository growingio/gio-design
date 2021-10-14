import { Meta } from '@storybook/react/types-6-0';
import Docs from './TablePage';
import Table from '../index';
import '../style';
import { Base } from './Base';
import { CompactTable } from './CompactTable';
import { TableHeader } from './TableHeader';
import { MultiLine } from './MultiLine';
import { TableScroll } from './TableScroll';
import { TableEmpty } from './TableEmpty';
import { TableLoading } from './TableLoading';
import { TablePagination } from './TablePagination';
import { ControlledTable } from './TableControlled';
import { RowExpandTable } from './RowExpandTable';
import { TreeExpandTable } from './TreeExpandTable';
import { ExpandWithTable } from './ExpandWithTable';
import { RowExpandWithFixedColumn } from './RowExpandWithFixedColumn';
import { ResizableWithTable } from './ResizableTable';
import { DragColumns } from './DragTable';

export default {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4066%3A42548',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

export {
  Base,
  CompactTable,
  TableHeader,
  MultiLine,
  TableScroll,
  TableEmpty,
  TableLoading,
  TablePagination,
  ControlledTable,
  RowExpandTable,
  TreeExpandTable,
  ExpandWithTable,
  RowExpandWithFixedColumn,
  ResizableWithTable,
  DragColumns,
};
