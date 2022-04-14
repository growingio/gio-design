import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PlusOutlined, FilterOutlined } from '@gio-design/icons';
import { uniqueId } from 'lodash';
import { CascaderProps } from '../interface';
import Cascader from '../Cascader';
import '../style';
import './style.less';
import CascaderItem from '../../list/inner/CascaderItem';
import Docs from './CascaderPage';

export default {
  title: 'Upgraded/Cascader',
  component: Cascader,
  subcomponents: { CascaderItem },
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const defaultOptions = [
  {
    label: '苹果',
    value: 'apple',
    id: uniqueId(),
    description: uniqueId(),
    items: [
      {
        label: '切',
        value: 'cut',
        id: uniqueId(),
        description: uniqueId(),
        items: [
          {
            label: '坏了',
            value: 'bad',
            id: uniqueId(),
            description: uniqueId(),
          },
          {
            label: '没坏',
            value: 'good',
            id: uniqueId(),
          },
        ],
      },
      {
        label: '掰开',
        value: 'bye',
        id: uniqueId(),
        items: [
          {
            label: '坏了',
            value: 'bad',
            id: uniqueId(),
          },
          {
            label: '没坏',
            value: 'good',
            id: uniqueId(),
          },
        ],
      },
    ],
  },
];
const options = new Array(12).fill('').map((_, index) => ({
  label: `第${index}条咸鱼`,
  value: index.toString(),
  items: [
    { label: '要', value: 'yes' },
    { label: '不要', value: 'no' },
  ],
}));
export const Default: Story<CascaderProps> = (args) => (
  <Cascader {...args} value="apple.cut.bad" options={defaultOptions} placeholder="请选择" size="normal" />
);
Default.args = {};

export function Demo(props: CascaderProps) {
  return (
    <table className="table-demo">
      <tr>
        <th>Cascader</th>
        <th>Example</th>
      </tr>
      <tr>
        <td>options</td>
        <td>
          <Cascader
            onChange={(val: any, opt: any) => console.log('val', val, opt)}
            options={defaultOptions}
            placeholder="haha"
            style={{ width: '240px', textAlign: 'left' }}
            size="normal"
            {...props}
          />
        </td>
      </tr>
      {/* <tr>
        <td>jsx</td>
        <td>
          <Cascader
            onChange={(val: any, opt: any) => console.log('val', val, opt)}
            placeholder="请选择"
            allowClear={false}
            size="normal"
            style={{ width: '240px', textAlign: 'left' }}
            {...props}
          >
            <CascaderItem label="苹果" value="apple">
              <List model="cascader">
                <CascaderItem label="切" value="cat">
                  <List model="cascader">
                    <CascaderItem label="坏了" value="bad" />
                    <CascaderItem label="没坏" value="good" />
                  </List>
                </CascaderItem>
                <CascaderItem label="掰开" value="bye" />
              </List>
            </CascaderItem>
          </Cascader>
        </td>
      </tr> */}
      <tr>
        <td>hide prefix suffix</td>
        <td>
          <Cascader
            onChange={(val: any, opt: any) => console.log('val', val, opt)}
            options={options}
            overlayStyle={{ width: 240 }}
            style={{ width: '240px', textAlign: 'left' }}
            placeholder="请选择"
            size="small"
            {...props}
          />
        </td>
      </tr>
      <tr>
        <td>prefix suffix</td>
        <td>
          <Cascader
            onChange={(val: any, opt: any) => console.log('val', val, opt)}
            options={options}
            prefix={() => <PlusOutlined size="14px" />}
            suffix={() => <FilterOutlined size="14px" />}
            overlayStyle={{ width: 240 }}
            style={{ width: '240px', textAlign: 'left' }}
            placeholder="请选择"
            allowClear={false}
            size="small"
            {...props}
          />
        </td>
      </tr>
    </table>
  );
}
