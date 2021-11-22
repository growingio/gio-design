import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PlusOutlined, FilterOutlined } from '@gio-design/icons';

import { CascaderProps } from '../interfance';
import Cascader from '../Cascader';
import '../style';
import './style.less';
import CascaderItem from '../../list/inner/CascaderItem';
import { List } from '../../list';

export default {
  title: 'Upgraded/Cascader',
  component: Cascader,
} as Meta;
const defaultLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const defaultOptions = [
  {
    label: '苹果',
    value: 'apple',
    childrens: [
      {
        label: '切',
        value: 'cut',
        childrens: [
          {
            label: '坏了',
            value: 'bad',
          },
          {
            label: '没坏',
            value: 'good',
          },
        ],
      },
      {
        label: '掰开',
        value: 'bye',
        childrens: [
          {
            label: '坏了',
            value: 'bad',
          },
          {
            label: '没坏',
            value: 'good',
          },
        ],
      },
    ],
  },
];
const Template: Story<CascaderProps> = (props) => {
  const options = defaultLabels.reduce(
    (prev, curr) => [
      ...prev,
      {
        label: `第${curr}条咸鱼`,
        value: curr,
        childrens: [
          { label: '要', value: 'yes' },
          { label: '不要', value: 'no' },
        ],
      },
    ],
    []
  );
  return (
    <>
      <div className="demo-box">
        <Cascader options={defaultOptions} triggerProps={{ placeholder: '请选择' }} size="normal" {...props} />
      </div>
      <div className="demo-box">
        <Cascader triggerProps={{ placeholder: '请选择', allowClear: false }} size="normal" {...props}>
          <CascaderItem label="苹果" value="apple" disabled>
            <List>
              <CascaderItem label="切" value="cat">
                <List>
                  <CascaderItem label="坏了" value="bad" disabledTooltip="123123121" />
                  <CascaderItem label="没坏" value="good" />
                </List>
              </CascaderItem>
              <CascaderItem prefix="233" label="掰开" value="bye" />
            </List>
          </CascaderItem>
        </Cascader>
      </div>
      <h3>自定义list,trigger宽度</h3>
      <div className="demo-box">
        <Cascader
          options={options}
          contentStyle={{ width: 240 }}
          triggerProps={{ placeholder: '请选择', allowClear: false, style: { width: 240, textAlign: 'left' } }}
          size="small"
          {...props}
        />
      </div>
      <h3>hide trigger Prefix</h3>
      <div className="demo-box">
        <Cascader
          options={options}
          overlayStyle={{ width: 240 }}
          triggerProps={{ placeholder: '请选择', style: { width: 240, textAlign: 'left' } }}
          size="small"
          {...props}
        />
      </div>
      <h3>prefix,suffix(如果设置prefix、suffix trigger在有值时会render Select的prefix、suffix)</h3>
      <div className="demo-box">
        <Cascader
          options={options}
          prefix={() => <PlusOutlined size="14px" />}
          suffix={() => <FilterOutlined size="14px" />}
          overlayStyle={{ width: 240 }}
          triggerProps={{
            placeholder: '请选择',
            style: { width: 240, textAlign: 'left' },
          }}
          size="small"
          {...props}
        />
      </div>
    </>
  );
};

export const Default = Template.bind({
  triggerProps: {
    placeholder: '请选择',
    allowClear: false,
  },
});
