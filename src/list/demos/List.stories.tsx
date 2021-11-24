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
import Selection from '../Selection';
import CascaderItem from '../inner/CascaderItem';
import Popover from '../../popover';
import Docs from './ListPage';

export default {
  title: 'Upgraded/List',
  component: List,
  subcomponents: { DragList, Selection, Item, CascaderItem },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=6379%3A64447',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
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
  const wrapper = (e: React.ReactNode) => (
    <Popover
      placement="rightTop"
      triggerStyle={{ display: 'initial' }}
      content={
        <div style={{ width: '200px', height: '200px', background: 'white', border: '1px solid black' }}>
          <h3>preview</h3>
        </div>
      }
    >
      {e}
    </Popover>
  );
  return (
    <>
      cascaderitem
      <div className="demo-box">
        <List
          model="cascader"
          value={cascaderValue}
          onChange={(val) => {
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
      simple(default)
      <div className="demo-box">
        <h3>JSX render preview</h3>
        {/* <List>
          <Item value="1" wrapper={wrapper}>
            1
          </Item>
        </List> */}
        <h3>option render preview</h3>
        <List options={[{ label: '1', value: '1', wrapper }]} />
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
      multiple
      <div className="demo-box">
        <List
          value={value}
          model="multiple"
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
      <Selection>
        <List options={options} onChange={(value) => console.log('value', value)} />
        <List options={options} onChange={(value) => console.log('value', value)} />
      </Selection>
    </div>
    <h3>no title</h3>
    <div className="demo-box">
      <Selection>
        <List title="123" options={options} onChange={(value) => console.log('value', value)} />
        <List options={options} onChange={(value) => console.log('value', value)} />
      </Selection>
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
      <div className="demo-box">
        <List onChange={(value) => console.log('value', value)}>
          {collapseOptions.map((option) => (
            <Item value={option?.value}>
              <div style={{ background: 'black' }}>{option?.label}</div>
            </Item>
          ))}
        </List>
      </div>
    </>
  );
};
export const Default = Template.bind({});
export const Items = ItemTemplate.bind({});
export const Drag = dragTemplate.bind({});
export const SelectionList = SelectionTemplate.bind({});
export const Collapse = CollapseTemplate.bind({});
Default.args = {
  onChange: (value: OptionProps) => {
    console.log('value', value);
  },
};
