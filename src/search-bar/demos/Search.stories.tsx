import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
// import { InputProps } from '../interface';
import SearchBar from '../SearchBar';
import '../style';
import { SearchBarProps } from '../interface';
// import InputNumber from '../InputNumber';
// import Password from '../Password';
// import TextArea from '../TextArea';

export default {
  title: 'Upgraded/SearchBar',
  component: SearchBar,
  argTypes: {
    prefix: {
      control: { type: 'text' }, // 不约束react_node会传入对象导致报错
    },
    suffix: {
      control: { type: 'text' },
    },
  },
} as Meta;

const Template: Story<SearchBarProps> = (args) => (
  <>
    <h3>定义</h3>
    <p>在所有内容中，通过输入内容的关键信息筛选出某个内容。</p>
    <br />
    <h3>Search Bar 样式</h3>
    <p>
      适用于对页面或弹窗内容的搜索。 当搜索框内出现搜索的内容后，原本的“搜索” Icon 变为“清除”
      Icon，点击后将清除掉所有输入的内容。
    </p>
    <table>
      <tr>
        <th>Normal</th>
        <th>Hover/Focused</th>
        <th>Filled with Content</th>
        <th>Disabled</th>
        <th>Disabled with Value</th>
      </tr>
      <tr>
        <td>
          <SearchBar {...args} />
        </td>
        <td>
          <SearchBar {...args} />
        </td>
        <td>
          <SearchBar {...args} value="集成应用" />
        </td>
        <td>
          <SearchBar {...args} disabled />
        </td>
        <td>
          <SearchBar {...args} value="数据可视化" disabled />
        </td>
      </tr>
    </table>

    <h3>Search Bar 大小</h3>
    <table>
      <tr>
        <th>Big (36px)</th>
        <th>Small (30px)</th>
      </tr>
      <tr>
        <td>
          <SearchBar {...args} />
        </td>
        <td>
          <SearchBar {...args} size="small" />
        </td>
      </tr>
    </table>
  </>
);

export const InputUsage = Template.bind({});
InputUsage.args = {
  style: { width: '200px' },
};
