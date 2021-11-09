import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button } from '../..';
import BatchActions from '../BatchActions';
import { BatchActionProps } from '../interfaces';
import '../style';

export default {
  component: BatchActions,
  title: 'Upgraded/Panel/BatchActions',
  argTypes: {
    count: {
      description: '已选择数量',
      table: { defaultValue: 0 },
    },
    onClose: {
      description: '点击取消的回调',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      table: { defaultValue: () => {} },
    },
  },
} as Meta<BatchActionProps>;

const Template: Story<BatchActionProps> = (args) => (
  <BatchActions {...args}>
    <Button type="secondary">批量移动</Button>
    <Button type="secondary">批量删除 </Button>
  </BatchActions>
);

export const Default = Template.bind({});
Default.args = {
  count: 0,
};
