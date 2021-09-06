import { Meta } from '@storybook/react/types-6-0';
import Docs from './Table.mdx';
import Table from '../index';
import '../style';
import { Base } from './Base';
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
};
