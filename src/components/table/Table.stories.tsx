import { Meta } from '@storybook/react/types-6-0';
import Docs from './Table.mdx';
import Table from './index';
import './style';
import { Base } from './demo/Base.stories';
import { TableHeader } from './demo/TableHeader.stories';
import { MultiLine } from './demo/MultiLine.stories';
import { TableScroll } from './demo/TableScroll.stories';
import { TableEmpty } from './demo/TableEmpty.stories';
import { TableLoading } from './demo/TableLoading.stories';
import { TablePagination } from './demo/TablePagination.stories';

export default {
  title: 'Functional Components/Table',
  component: Table,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

export { Base, TableHeader, MultiLine, TableScroll, TableEmpty, TableLoading, TablePagination };
