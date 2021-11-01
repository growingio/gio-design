import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Divider, { DividerProps } from '..';
import Button from '../../button';
import '../style';
import './divider.style.less';
import Docs from './DividerPage';

export default {
  title: 'Upgraded/Divider',
  component: Divider,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4066%3A43358',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const DemoTemplate: Story<DividerProps> = () => (
  <table>
    <tr>
      <th>Divider</th>
      <th>Example</th>
    </tr>
    <tr>
      <td>horizontal</td>
      <td>
        <span>
          <Button type="text">Apple</Button>
          <Divider orientation="horizontal" />
          <Button type="text">Orange</Button>
          <Divider orientation="horizontal" />

          <Button type="text">Pumpkin</Button>
          <Divider orientation="horizontal" />

          <Button type="text">Pineapple</Button>
        </span>
      </td>
    </tr>
    <tr>
      <td>vertical</td>
      <td>
        <Button type="text">Apple</Button>
        <Divider orientation="vertical" />
        <Button type="text">Orange</Button>
        <Divider orientation="vertical" />

        <Button type="text">Pumpkin</Button>
        <Divider orientation="vertical" />

        <Button type="text">Pineapple</Button>
      </td>
    </tr>
    <tr>
      <td>行内元素的垂直分割线</td>
      <td>
        <div className="demo-vertical">
          <span>Apple</span>
          <Divider orientation="vertical" />

          <span>Orange</span>
          <Divider orientation="vertical" />

          <span>Pumpkin</span>
          <Divider orientation="vertical" />

          <span>Pineapple</span>
        </div>
      </td>
    </tr>
  </table>
);
export const Demo = DemoTemplate.bind({});
const HorizontalTemplate: Story<DividerProps> = (args) => (
  <>
    <h3 className="demo-divider-title">列表分割线</h3>
    <ul className="demo-divider-ul">
      <li>Apple</li>
      <Divider {...args} />
      <li>Orange</li>
      <Divider {...args} />
      <li>Pumpkin</li>
      <Divider {...args} />
      <li>Pineapple</li>
    </ul>
  </>
);

export const Horizontal = HorizontalTemplate.bind({});
Horizontal.args = {
  orientation: 'horizontal',
  flexItem: false,
} as DividerProps;

const VerticalTemplate: Story<DividerProps> = (args) => (
  <>
    <h3 className="demo-divider-title">行内元素的垂直分割线</h3>
    <div className="demo-vertical">
      <span>Apple</span>
      <Divider {...args} />
      <span>Orange</span>
      <Divider {...args} />
      <span>Pumpkin</span>
      <Divider {...args} />
      <span>Pineapple</span>
    </div>
  </>
);

export const Vertical = VerticalTemplate.bind({});
Vertical.args = {
  orientation: 'vertical',
  flexItem: false,
} as DividerProps;

const FlexItemTemplate: Story<DividerProps> = (args) => (
  <>
    <h3 className="demo-divider-title">适应 Flex 容器的垂直分割线</h3>
    <div className="demo-flex">
      <Button type="text">Apple</Button>
      <Divider {...args} />
      <Button type="text">Orange</Button>
      <Divider {...args} />
      <Button type="text">Pumpkin</Button>
      <Divider {...args} />
      <Button type="text">Pineapple</Button>
    </div>
  </>
);

export const FlexItem = FlexItemTemplate.bind({});
FlexItem.args = {
  orientation: 'vertical',
  flexItem: true,
} as DividerProps;
