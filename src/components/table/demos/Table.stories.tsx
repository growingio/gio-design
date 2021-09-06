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

export default {
  title: 'Functional Components/Table',
  component: Table,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

export { Base, TableHeader, MultiLine, TableScroll, TableEmpty, TableLoading, TablePagination, ControlledTable };
