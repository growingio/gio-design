import React, { useRef, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PlusOutlined, FilterOutlined, EventsPresetOutlined } from '@gio-design/icons';
import { action } from '@storybook/addon-actions';
import List from '../List';
import { ItemProps, ListProps, OptionProps } from '../index';
import '../style';
import Item from '../Item';
import './style.less';
import DragList from '../Drag';
import Selection from '../Selection';
import CascaderItem from '../inner/CascaderItem';
import CheckboxItem from '../inner/CheckboxItem';
import Popover from '../../popover';
import Docs from './ListPage';
import { Divider } from '../..';

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
const renderEventIcon = <EventsPresetOutlined size="14px" />;
const options = [...new Array(12)].map((_, index) => ({
  label: `List Item ${index}`,
  value: index,
  disabled: index > 6,
  prefix: index % 2 === 0 ? renderEventIcon : <FilterOutlined size="14px" />,
  onMoved: () => action('move'),
}));
const CascaderDemo = (props: any) => {
  const [cas, casSet] = useState();

  return (
    <div className="demo-box">
      <List
        model="cascader"
        value={cas}
        onChange={(val) => {
          casSet(val as any);
          action('val');
        }}
      >
        <CascaderItem label="1" value="1" {...props}>
          <List>
            <Item label="1-1" value="1-1" />
            <Item label="1-2" value="1-2" />
          </List>
        </CascaderItem>
        <CascaderItem label="2" value="2" {...props}>
          <List>
            <Item label="2-1" value="1-1" />
            <Item label="2-2" value="1-2" />
          </List>
        </CascaderItem>
        <CascaderItem label="3" value="3" {...props} />
        <CascaderItem label="4" value="4" {...props}>
          <List>
            <CascaderItem label="4-1" value="4-1" {...props}>
              <List>
                <Item label="4-1-1" value="4-1-1" />
                <Item label="4-1-2" value="4-1-2" />
              </List>
            </CascaderItem>
          </List>
        </CascaderItem>
      </List>
    </div>
  );
};
const Template: Story<ListProps> = (props) => {
  const [value, setValue] = useState([]);
  const [cascaderValue, setCascadervalue] = useState('1.1-1');
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
        <List
          onClick={(v) => console.log('list触发 onClick', v)}
          onChange={(v, o) => console.log('list触发 onChange', v, o)}
        >
          <Popover
            placement="rightTop"
            content={
              <div style={{ width: '200px', height: '200px', background: 'white', border: '1px solid black' }}>
                <h3>preview</h3>
              </div>
            }
          >
            <span>
              <Item value="1" label="1" onClick={(v) => console.log('item click', v)} />
            </span>
          </Popover>
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
const SuffixTemplate = (props: any) => (
  <div className="demo-box">
    <List>
      {[...new Array(12)].map(() => (
        <Item value="1" prefix={renderEventIcon} {...props}>
          List Item
        </Item>
      ))}
    </List>
  </div>
);
const fruitArr = ['Apple', 'Orange', 'Peach', 'Pineapple', 'Watermellon', 'Dragon Fruit', 'Grape'];
const CheckboxTemplate = () => {
  const [checkboxValue, CheckboxVauleSet] = useState([]);
  const isEqualValue = fruitArr.length === checkboxValue.length;

  // const [selected, selectedSet] = useState(false);
  return (
    <>
      <div className="demo-box">
        <Selection>
          <>
            <CheckboxItem
              selected={isEqualValue}
              onClick={() => {
                if (isEqualValue) {
                  CheckboxVauleSet([]);
                } else {
                  CheckboxVauleSet(fruitArr);
                }
              }}
              label="全部选中"
              value="all"
            />
            <Divider
              style={{
                margin: '4px 0',
              }}
            />
            <List
              value={checkboxValue}
              model="multiple"
              onChange={(v) => {
                CheckboxVauleSet(v as any);
              }}
              options={fruitArr.map((c) => ({
                value: c,
                label: c,
              }))}
            />
          </>
        </Selection>
      </div>
      <div className="demo-box">
        <Selection>
          <>
            <CheckboxItem
              selected={isEqualValue}
              onClick={() => {
                if (isEqualValue) {
                  CheckboxVauleSet([]);
                } else {
                  CheckboxVauleSet(fruitArr);
                }
              }}
              label="全部选中"
              value="all"
            />
            <Divider
              style={{
                margin: '4px 0',
              }}
            />
            <List
              value={checkboxValue}
              model="multiple"
              onChange={(v) => {
                CheckboxVauleSet(v as any);
              }}
              options={fruitArr.map((c) => ({
                prefix: renderEventIcon,
                value: c,
                label: c,
              }))}
            />
          </>
        </Selection>
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
  const ref = useRef(null);
  return (
    <div className="demo-box">
      <List onChange={() => console.log('list onChange触发')} ref={ref}>
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

const DragTemplate = (props: any) => (
  <>
    <div className="demo-box">
      <DragList
        options={options.map((cur) => ({ ...cur, prefix: '' }))}
        onChange={(value) => console.log('value', value)}
        {...props}
      />
    </div>
    <div className="demo-box">
      <DragList options={options} onChange={(value) => console.log('value', value)} {...props} />
    </div>
  </>
);
const SelectionTemplate = () => {
  const [cascaderValue, setCascadervalue] = useState('1.1-1');
  const [multipleValue, setMultipleValue] = useState([]);

  return (
    <>
      <div className="demo-box">
        <Selection>
          <List title="普通列表" onChange={(value) => console.log('value', value)}>
            <Item label="选中的List" prefix={renderEventIcon} value="123">
              选中的List
            </Item>
            <Item label="Regular Item" prefix={renderEventIcon} value="234">
              Regular Item
            </Item>
            <Item label="Disabled Item" prefix={renderEventIcon} value="456" disabled>
              Disabled Item
            </Item>
          </List>
          <List
            title="级联列表"
            model="cascader"
            value={cascaderValue}
            onChange={(val) => {
              setCascadervalue(val as any);
            }}
          >
            <CascaderItem label="Nested Item" value="1">
              <List>
                <Item label="1-1" value="1-1" />
                <Item label="1-2" value="1-2" />
              </List>
            </CascaderItem>
            <CascaderItem label="Disabled Nested Item" value="2" disabled>
              <List>
                <Item label="2-1" value="1-1" />
                <Item label="2-2" value="1-2" />
              </List>
            </CascaderItem>
          </List>

          <DragList
            title="可拖拽列表"
            options={options.slice(0, 4)}
            onChange={(value) => console.log('value', value)}
          />
          <List
            value={multipleValue}
            onChange={(value: string[]) => setMultipleValue(value)}
            model="multiple"
            title="可选列表"
            options={options.slice(0, 4)}
          />
        </Selection>
      </div>
    </>
  );
};
const CollapseTemplate: Story<ItemProps> = () => {
  const collapseOptions = defaultLabels.reduce((prev, curr) => [...prev, { label: curr, value: curr }], []);
  return (
    <>
      <h3>options</h3>
      <div className="demo-box">
        <List
          options={collapseOptions}
          onChange={(value) => console.log('value', value)}
          onClick={(v) => console.log('v', v)}
        />
      </div>
      <h3>{`<Item> JSX`}</h3>
      <div className="demo-box">
        <List onChange={(value) => console.log('value', value)}>
          {collapseOptions.map((option) => (
            <Item label={option?.label} value={option?.value} onClick={(v) => console.log('v', v)} />
          ))}
        </List>
      </div>
      <div className="demo-box">
        <List onChange={(value) => console.log('value', value)}>
          {collapseOptions.map((option) => (
            <Item value={option?.value} onClick={(v) => console.log('v', v)}>
              <div style={{ background: 'black' }}>{option?.label}</div>
            </Item>
          ))}
        </List>
      </div>
    </>
  );
};
const demoTemplate: Story<ListProps> = () => (
  <>
    List Item
    <table className="table-demo">
      <tr>
        <th>Type</th>
        <th>Description</th>
        <th>Default</th>
        <th>Hover</th>
        <th>Active</th>
        <th>Disabled</th>
      </tr>
      <tr>
        <td>Basic</td>
        <td>基础选项</td>
        <td>
          <Item value="1">List Item</Item>
        </td>
        <td>
          <Item
            value="1"
            selected
            style={{
              backgroundColor: '#f7f8fc',
            }}
          >
            List Item
          </Item>
        </td>
        <td>
          <Item value="1" selected>
            List Item
          </Item>
        </td>
        <td>
          <Item disabled value="1">
            List Item
          </Item>
        </td>
      </tr>
      {/* <tr>
        <td>Drag</td>
        <td>支持拖拽的选项，常用于需要排序的场景</td>
        <td>
          <DragItem index={1} value="1">
            List Item
          </DragItem>
        </td>
        <td>
          <DragItem
            value="1"
            index={1}
            style={{
              color: '#1248e9',
              backgroundColor: '#f7f8fc',
            }}
          >
            List Item
          </DragItem>
        </td>
        <td>
          <DragItem
            value="1"
            index={1}
            style={{
              backgroundColor: '#f7f8fc',
            }}
          >
            List Item
          </DragItem>
        </td>
        <td>
          <DragItem index={1} disabled value="1">
            List Item
          </DragItem>
        </td>
      </tr> */}

      <tr>
        <td>Checkbox</td>
        <td>可勾选的选项，常用于多选选择器</td>
        <td>
          <CheckboxItem label="Checkbox" value="1">
            Checkbox
          </CheckboxItem>
        </td>
        <td>
          <CheckboxItem
            value="1"
            label="Checkbox"
            style={{
              backgroundColor: '#f7f8fc',
            }}
          >
            Checkbox
          </CheckboxItem>
        </td>
        <td>
          <CheckboxItem value="1" label="Checkbox" selected>
            Checkbox
          </CheckboxItem>
        </td>
        <td>
          <CheckboxItem label="Checkbox" disabled value="1">
            Checkbox
          </CheckboxItem>
        </td>
      </tr>

      <tr>
        <td>Suffix</td>
        <td>包含后缀的选项，后缀可以是Text、Tag、icon</td>
        <td>
          <Item value="1" suffix={renderEventIcon}>
            List Item 第一条咸鱼
          </Item>
        </td>
        <td>
          <Item
            value="1"
            style={{
              backgroundColor: '#f7f8fc',
            }}
            suffix={renderEventIcon}
          >
            List Item
          </Item>
        </td>
        <td>
          <Item value="1" suffix={renderEventIcon} selected>
            List Item
          </Item>
        </td>
        <td>
          <Item disabled suffix={renderEventIcon} value="1">
            List Item
          </Item>
        </td>
      </tr>
    </table>
    <table className="table-demo">
      <tr>
        <th>UserCase</th>
        <th>Example</th>
      </tr>
      <tr>
        <td>CascaderItem</td>
        <td>
          <CascaderDemo />
          <CascaderDemo prefix={<EventsPresetOutlined size="14" />} />
        </td>
      </tr>
      <tr>
        <td>suffix List</td>
        <td>
          <SuffixTemplate />
          <SuffixTemplate suffix={<PlusOutlined size="14px" />} />
        </td>
      </tr>
      <tr>
        <td>drag list</td>
        <td>
          <DragTemplate />
        </td>
      </tr>
      <tr>
        <td>checkbox list</td>
        <td>
          <CheckboxTemplate />
        </td>
      </tr>
      <tr>
        <td>Section list</td>
        <td>
          <SelectionTemplate />
        </td>
      </tr>
    </table>
  </>
);
export const Default = Template.bind({});
export const Items = ItemTemplate.bind({});
export const Drag = DragTemplate.bind({});
export const SelectionList = SelectionTemplate.bind({});
export const Collapse = CollapseTemplate.bind({});
export const Demo = demoTemplate.bind({});
Default.args = {
  onChange: (value: OptionProps) => {
    console.log('value', value);
  },
};
