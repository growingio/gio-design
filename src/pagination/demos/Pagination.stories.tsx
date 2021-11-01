import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Pagination, { PaginationProps } from '../index';
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
  showSizeChanger: true,
} as PaginationProps;
