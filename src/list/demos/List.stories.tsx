import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PlusOutlined, FilterOutlined } from '@gio-design/icons';
import List from '../List';
import { ItemProps, ListProps, OptionProps } from '../index';
import '../style';
import Item from '../Item';
import './style.less';
// import { DragList } from '../../components/list-pro';
import DragList from '../Drag';
import SelectionList from '../Selection';
import SelectionItem from '../SelectionItem';
import CascaderItem from '../inner/CascaderItem';

export default {
  title: 'Upgraded/List',
  component: List,
} as Meta;
const defaultLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const options = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
];

const Template: Story<ListProps> = (props) => {
  const [value, setValue] = useState([]);
  const [cascaderValue, setCascadervalue] = useState('1.1-1');
  return (
    <>
      <div className="demo-box">
        <List
          isCascader
          value={cascaderValue}
          onChange={(val) => {
            console.log('cascader val', val);
            setCascadervalue(val as any);
          }}
        >
          <CascaderItem label="1" value="1">
            <List>
              <Item label="1-1" value="1-1" />
              <Item label="1-2" value="1-2" />
            </List>
          </CascaderItem>
          <CascaderItem label="2" value="2">
            <List>
              <Item label="2-1" value="1-1" />
              <Item label="2-2" value="1-2" />
            </List>
          </CascaderItem>
          <CascaderItem label="3" value="3" />
          <CascaderItem label="4" value="4">
            <List>
              <CascaderItem label="4-1" value="4-1">
                <List>
                  <Item label="4-1-1" value="4-1-1" />
                  <Item label="4-1-2" value="4-1-2" />
                </List>
              </CascaderItem>
            </List>
          </CascaderItem>
        </List>
      </div>
      <div className="demo-box">
        <List {...props}>
          <Item value="1" prefix={<PlusOutlined size="14px" />} suffix={<FilterOutlined size="14px" />}>
            第一条咸鱼
          </Item>
          <Item value="2">第二条咸鱼</Item>
          <Item value="3">第三条超级超级超级超级超级超级超级超级超级超级长的咸鱼</Item>
          <Item value="4" disabled>
            第四条disabled的咸鱼
          </Item>
          <Item value="5" disabledTooltip="disabledTooltip">
            第4-1条disabled的咸鱼
          </Item>
          <Item value="5-1" disabledTooltip="disabledTooltip">
            第4-1条disabled的咸鱼第4-1条disabled的咸鱼第4-1条disabled的咸鱼
          </Item>
          <Item value="6" disabled disabledTooltip="disabledTooltip">
            第五条是带disabledTooltip的咸鱼
          </Item>
          <Item value="7" disabled disabledTooltip="disabledTooltip">
            第六条是超级超级超级超级超级超级超级超级超级超级长带disabledTooltip的咸鱼
          </Item>
          <Item value="8" disabled>
            第七条是超级超级超级超级超级超级超级超级超级超级长不带disabledTooltip的咸鱼
          </Item>
        </List>
      </div>
      <div className="demo-box">
        <List
          value={value}
          isMultiple
          onChange={(v) => {
            console.log('v', v);
            setValue(v as any);
          }}
        >
          <Item value="1">第一条咸鱼</Item>
          <Item value="2">第二条咸鱼</Item>
          <Item value="3">第三条超级超级超级超级超级超级超级超级超级超级长的咸鱼</Item>
        </List>
      </div>
    </>
  );
};
const ItemTemplate: Story<ItemProps> = () => {
  const itemClick = (value: string | number) => {
    console.log('click value', value);
  };
  const suffixClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    console.log('e suffix触发', e);
    e.stopPropagation();
  };

  return (
    <div className="demo-box">
      <List onChange={() => console.log('list onChange触发')}>
        <Item value="first">第1条咸鱼</Item>
        <Item value="second" prefix={<PlusOutlined size="14px" />}>
          第2条咸鱼
        </Item>
        <Item value="second-1" prefix={<PlusOutlined size="14px" />} suffix={<FilterOutlined size="14px" />}>
          第2-1条咸鱼
        </Item>
        <Item value="third" suffix={<FilterOutlined size="14px" />} onClick={itemClick}>
          mouseEvent
        </Item>
        <Item value="third" onClick={itemClick} suffix={<FilterOutlined size="14px" onClick={suffixClick} />}>
          第3-1 拦截suffix点击
        </Item>
        <Item value="four" disabled onClick={itemClick}>
          第4条咸鱼
        </Item>
        <Item value="five" disabled disabledTooltip="disabledTooltip">
          第5条咸鱼
        </Item>
        <Item value="six">{'第666666条咸鱼'.repeat(5)}</Item>
      </List>
    </div>
  );
};

const dragTemplate: Story<ItemProps> = () => (
  <>
    <h3>no disabled</h3>
    <div className="demo-box">
      <DragList options={options} onChange={(value) => console.log('value', value)} />
    </div>
    <h3>disabled</h3>
    <div className="demo-box">
      <DragList options={options} disabled onChange={(value) => console.log('value', value)} />
    </div>
  </>
);
const SelectionTemplate: Story<ItemProps> = () => (
  <>
    <h3>normal</h3>
    <div className="demo-box">
      <SelectionList>
        <SelectionItem title="Selection1">
          <List options={options} onChange={(value) => console.log('value', value)} />
        </SelectionItem>
        <SelectionItem title="Selection2">
          <List options={options} onChange={(value) => console.log('value', value)} />
        </SelectionItem>
      </SelectionList>
    </div>
    <h3>no title</h3>
    <div className="demo-box">
      <SelectionList>
        <SelectionItem title="">
          <List options={options} onChange={(value) => console.log('value', value)} />
        </SelectionItem>
        <SelectionItem title="">
          <List options={options} onChange={(value) => console.log('value', value)} />
        </SelectionItem>
      </SelectionList>
    </div>
  </>
);
const CollapseTemplate: Story<ItemProps> = () => {
  const collapseOptions = defaultLabels.reduce((prev, curr) => [...prev, { label: curr, value: curr }], []);
  return (
    <>
      <h3>options</h3>
      <div className="demo-box">
        <List options={collapseOptions} onChange={(value) => console.log('value', value)} />
      </div>
      <h3>{`<Item> JSX`}</h3>
      <div className="demo-box">
        <List onChange={(value) => console.log('value', value)}>
          {collapseOptions.map((option) => (
            <Item label={option?.label} value={option?.value} />
          ))}
        </List>
      </div>
    </>
  );
};
export const Default = Template.bind({});
export const Items = ItemTemplate.bind({});
export const Drag = dragTemplate.bind({});
export const Selection = SelectionTemplate.bind({});
export const Collapse = CollapseTemplate.bind({});
Default.args = {
  onChange: (value: OptionProps) => {
    console.log('value', value);
  },
};
