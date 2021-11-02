import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Pagination, { PaginationProps } from '../index';
import '../style';
import Docs from './PaginationPage';

export default {
  title: 'Upgraded/Pagination',
  component: Pagination,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=6334%3A78663',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const DemoTemplate = () => (
  <table>
    <tr>
      <th>Control</th>

      <th>Example</th>
    </tr>
    <tr>
      <td>default</td>
      <td>
        <Pagination total={100} />
      </td>
    </tr>
    <tr>
      <td>notShowQuickJumper</td>
      <td>
        <Pagination showQuickJumper={false} showSizeChanger total={100} />
      </td>
    </tr>
    <tr>
      <td>notshowSizeChanger </td>
      <td>
        <Pagination showSizeChanger={false} showQuickJumper total={100} />
      </td>
    </tr>
    <tr>
      <td>showSizeChanger+showSizeChanger </td>
      <td>
        <Pagination total={100} showSizeChanger showQuickJumper />
      </td>
    </tr>
  </table>
);
export const Demo = DemoTemplate.bind({});

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />;
export const Default = Template.bind({});

Default.args = {
  total: 75,
  showQuickJumper: true,
  showSizeChanger: true,
  onChange: () => action('action'),
} as PaginationProps;

export const notShowQuickJumper = Template.bind({});

notShowQuickJumper.args = {
  total: 75,
  showQuickJumper: false,
  showSizeChanger: true,
  onChange: () => action('action'),
} as PaginationProps;

export const notShowSizeChanger = Template.bind({});

notShowSizeChanger.args = {
  total: 75,
  showQuickJumper: true,
  showSizeChanger: false,
  onChange: () => action('action'),
} as PaginationProps;
