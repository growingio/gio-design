import React, { useMemo, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { RightDoubleOutlined, HomeOutlined, UserOutlined, TagOutlined, DeleteOutlined, AndroidFilled, IosFilled } from '@gio-design/icons';
import List from '../List';
import { ListProps, OptionProps } from '../index';
import '../style';
import Item from '../Item';
import './style.less';
import DragList from '../Drag';
import Selection from '../Selection';
import CascaderItem from '../inner/CascaderItem';
import Docs from './ListPage';
import { Avatar, Divider, Dropdown, SearchBar, Tag } from '../..';
import Button from '../../button';
import Toggle from '../../toggle';

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
    actions: { argTypesRegex: '^on.*' },
    docs: {
      page: Docs,
    },
  },
} as Meta;







const ListTemplate: Story<ListProps> = (args: ListProps) => <div className="gio-list-demo-box overflow"><List {...args} /></div>
export const Default = ListTemplate.bind({});
Default.args = {
  children: [
    <Item value="1">
      List Item 1
    </Item>,
    <Item disabled value="2">
      List Item 2
    </Item>,
    <Item value="3">
      List Item 3,List Item 3,List Item 3,List Item 3,
    </Item>,
    <Item value="4" prefix={<HomeOutlined />}>
      List Item 4
    </Item>,
    <Item value="5" suffix={<RightDoubleOutlined />}>
      List Item 5
    </Item>,
    <Item value="6" suffix={<Tag title="标签" size="small" status="success">标签</Tag>}>
      List Item 6
    </Item>,
    <Item disabled value="7" suffix={<Tag title="标签" size="small" status="info" >标签</Tag>}>
      List Item 7
    </Item>
  ]
};

export const Empty = ListTemplate.bind({
  children: null,
  options: null,
})
Empty.args = {
  needEmpty: true,
}
const listOptions: OptionProps[] = [...new Array(12)].map((_, index) => ({
  label: `List Item ${index}`,
  value: index,
  disabled: index > 6,
}));
const fruits = ['Apple', 'Orange', 'Peach', 'Pineapple', 'Watermellon', 'Dragon Fruit', 'Grape'];

export const MultipleSelect = () => {
  const [value, setValue] = useState([]);
  const handleChange = (v?: Array<string | number>) => {
    console.log('onChange value',v)
    setValue(v);
  };
  return (
    <div className="gio-list-demo-box">
      <List model="multiple" max={3} value={value} onChange={handleChange} onMultipleOverflow={(v) => console.log('onMultipleOverflow value',v)}>
        <Item value="1">List Item 1</Item>
        <Item disabled value="2">
          List Item 2
        </Item>
        <Item value="3">List Item 3</Item>
        <Item value="4">List Item 4</Item>
        <Item value="5">List Item 5</Item>
      </List>
    </div>
  );
};

export const Drag = () => {
  const datas = useMemo(() => listOptions.map((option, i) =>
  ({
    ...option,
    prefix: i % 3 === 1 ? <UserOutlined /> : <TagOutlined />
  })), [])
  return <div className="gio-list-demo-box"><DragList options={datas} onChange={v => console.log(v)} /></div>
}

export const Cascader = () => {
  const [cascaderValue, setCascadervalue] = useState('1.1-1');
  const [cascaderValue2, setCascaderValue2] = useState('1&1.1');
  return (
    <div style={{ display: 'flex' }}>
      <div className="gio-list-demo-box">
        <p style={{ padding: '8px', color: "#242e59" }}>value:{cascaderValue}</p>
        <Divider />
        <List
          model="cascader"
          value={cascaderValue}
          onChange={(val) => {
            setCascadervalue(val as string);
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
              <Item label="2-1" value="2-1" />
              <Item label="2-2" value="2-2" />
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
      <div className="gio-list-demo-box">
        <p style={{ padding: '8px', color: "#242e59" }}>value:{cascaderValue2}</p>
        <Divider />
        <List
          model="cascader"
          value={cascaderValue2}
          valueSeparator="$"
          onChange={(val) => {
            console.log(val);
            setCascaderValue2(val as string);
          }}
        >
          <CascaderItem label="1" value="1">
            <List>
              <Item label="1.1" value="1.1" />
              <Item label="1.2" value="1.2" />
            </List>
          </CascaderItem>
          <CascaderItem label="2" value="2">
            <List>
              <Item label="2.1" value="2.1" />
              <Item label="2.2" value="2.2" />
            </List>
          </CascaderItem>
          <CascaderItem label="3" value="3" />
          <CascaderItem label="4" value="4">
            <List>
              <CascaderItem label="4.1" value="4.1">
                <List>
                  <Item label="4.1.1" value="4.1.1" />
                  <Item label="4.1.2" value="4.1.2" />
                </List>
              </CascaderItem>
            </List>
          </CascaderItem>
        </List>
      </div>
    </div>
  );
};
export const Collapse = () => (
  <div style={{ display: 'flex' }}>
    <div className="gio-list-demo-box">
      <List collapse={10} onChange={(value) => console.log('value', value)}>
        {listOptions.map((option) => (
          <Item label={option?.label} value={option?.value} onClick={(v) => console.log('v', v)} />
        ))}
      </List>
    </div>
    <div className="gio-list-demo-box">
      <List collapse={5} onChange={(value) => console.log('value', value)}>
        {listOptions.map((option) => (
          <Item label={option?.label} value={option?.value} onClick={(v) => console.log('v', v)} />
        ))}
      </List>
    </div>
  </div >
);
export const Prefix = () => <div className="gio-list-demo-box overflow">
  <List>
    {
      fruits.map((fruit) => <Item value={fruit} label={fruit}
        prefix={<TagOutlined />} />)
    }
  </List>
</div>
export const Suffix = () => <div className="gio-list-demo-box overflow">
  <List>
    {
      fruits.map((fruit) => <Item value={fruit} label={fruit}
        suffix={<Button.IconButton type="text" size="small" ><DeleteOutlined /></Button.IconButton>} />)
    }
  </List>
</div>
export const Basic = () => <div className="gio-list-demo-box overflow">
  <List value="Orange">
    {
      fruits.map((fruit) => <Item value={fruit} label={fruit} />)
    }
  </List>
</div>
export const AvatarWithTextAndIcon = () => <div className="gio-list-demo-box overflow">
  <List>
    {
      fruits.map((fruit) => <Item value={fruit} label={fruit}
        suffix={<Button.IconButton type="text" size="small" ><DeleteOutlined /></Button.IconButton>}
        prefix={<Avatar backgroundColor="transparent" size="small" mode="circle" src={`https://joeschmoe.io/api/v1/${fruit}`} />} />)
    }
  </List>
</div>
export const WithIconAndSwitch = () => {
  const items = [{ value: 'Android', state: false, icon: <AndroidFilled /> }, { value: 'IOS', state: true, icon: <IosFilled /> }];
  const updatePinState = (value: boolean, idx: number) => {
    items[idx] = { ...items[idx], state: value }
  }
  return <div className="gio-list-demo-box">
    <List>
      {
        items.map((itm, index) =>
          <Item value={itm.value} label={itm.value}
            suffix={<Toggle on={itm.state} onChange={e => { updatePinState(e.target.checked, index) }} size="small" />}
            prefix={<Avatar size="medium" backgroundColor="#dedede" mode="circle" icon={<AndroidFilled />} />} />
        )
      }
    </List>
  </div>
}


export const SelectionList = () => {
  const [cascaderValue, setCascadervalue] = useState('1.1-1');
  const [multipleValue, setMultipleValue] = useState([]);

  return (
    <>
      <div className="gio-list-demo-box">
        <Selection onChange={val => console.log('Selection onChange', val)}>
          <List id="l1" title="普通列表" onChange={(value) => console.log('普通列表 onChange value', value)}>
            <Item value="1">
              List Item 1
            </Item>
            <Item disabled value="2">
              List Item 2
            </Item>
            <Item value="3">
              List Item 3,List Item 3,List Item 3,List Item 3,
            </Item>
            <Item value="4"
              prefix={<Avatar backgroundColor="transparent" size="small" mode="circle" src="https://joeschmoe.io/api/v1/random" />} >
              List Item 4
            </Item>
            <Item value="6" suffix={<Tag title="标签" size="small" status="success">标签</Tag>}>
              List Item 6
            </Item>
          </List>
          <List
            id="l2"
            title="级联列表"
            model="cascader"
            value={cascaderValue}
            onChange={(val) => {
              setCascadervalue(val as string);
              console.log('cascader onChange', val)
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
            id="l3"
            title="可拖拽列表"
            options={listOptions.slice(0, 4)}
            onChange={(value) => console.log('DragList value', value)}
          />
          <List
            id="l4"
            value={multipleValue}
            onChange={(value: string[]) => {
              console.log('DragList value', value)
              setMultipleValue(value)
            }}
            model="multiple"
            title="可选列表"
            options={listOptions.slice(0, 4)}
          />
        </Selection>
      </div>
    </>
  );
};

export const DropdownList = () => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const options = fruits.slice(4).map(v => ({ value: v, label: v }));
  // const options2 = listOptions;
  return <Dropdown
    visible={visible}
    onVisibleChange={(vis) => setVisible(vis)}
    content={
      <>
        <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
        <Selection style={{ padding: '8px 0 0 0' }}>
          <List
            id="group1"
            title="group1"
            options={options}
          />
        </Selection>
      </>
    }
  >
    <Button active={visible} type="secondary">请选择...</Button>
  </Dropdown>
}