import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Pagination, { PaginationProps } from '..';
import '../style';

export default {
  title: 'Upgraded/Pagination',
  component: Pagination,
} as Meta;

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />;
export const Default = Template.bind({});

Default.args = {
  total: 75,
  showQuickJumper: true,
  defaultPageSize: 10,
  hideOnSinglePage: false,
  showSizeChanger: true,
  pageSizeOptions: [10, 20, 50, 100, 1000],
} as PaginationProps;
