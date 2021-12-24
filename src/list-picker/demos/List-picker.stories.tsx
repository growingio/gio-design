import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import '../style';
import { isEqual, uniqueId } from 'lodash';
import {
  CodelessTrackingOutlined,
  EventsPresetOutlined,
  EventsTrackingOutlined,
  MetricsPresetOutlined,
} from '@gio-design/icons';
import classNames from 'classnames';
import { action } from '@storybook/addon-actions';
import CheckboxItem from '../../list/inner/CheckboxItem';
import { OptionProps } from '../../list/interfance';
import { ListPickerProps } from '../interfance';
import ListPicker from '../listPicker';
import SearchBar from '../../search-bar';
import Tabs, { Tab } from '../../tabs';
import List from '../../list';
import Recent from '../Recent';
import Docs from './List-pickerPage';
import { Card, Divider, Popover, Skeleton, Table, Tag, Page } from '../..';

interface Tmesurements {
  id: string;
  name: string;
  type: Types;
  action: string;
  elementId: string;
  valueType?: string;
  isSystem: boolean;
}
export type Types =
  | 'custom' // 埋点事件
  | 'simple' // 无埋点事件
  | 'prepared' // 预置事件
  | 'complex' // 自定义计算指标
  | 'virtual'; // 虚拟事件

export default {
  title: 'Upgraded/ListPicker',
  component: ListPicker,
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
const groupIds = ['custom', 'virtual', 'tag', 'visible'];
const groupNames = ['埋点', '虚拟', '标签', '属性'];
// const selectionValues = ['all', 'apple', 'banana'];
// const selectionNames = ['全局', '苹果', '香蕉'];
const createOption = (index: number) => ({
  label: uniqueId(`label-${index.toString()}`),
  value: uniqueId(`value-${index.toString()}`),
  groupId: groupIds[Math.floor(index % 4)],
  groupName: groupNames[Math.floor(index % 4)],
});
const createSingleOption = (index: number) => ({
  label: uniqueId(`label-${index.toString()}`),
  value: uniqueId(`value-${index.toString()}`),
});
const largeOptions = new Array(200).fill(0).map((v, i) => createOption(i));
const simpleLargeOptions = new Array(200).fill(0).map((v, i) => createSingleOption(i));
const style = { width: '240px' };
export const Single = (args: ListPickerProps) => {
  const [value, setValue] = useState<undefined | string>('ziyi');
  const [activeTab, setActiveTab] = useState('tab1');
  const [search, setSearch] = useState('');
  const onChange = (val?: string, opt?: OptionProps | OptionProps[]) => {
    setValue(val);
    console.log('onChange执行', val, opt, search);
  };
  return (
    <ListPicker
      {...args}
      style={style}
      value={value}
      onChange={onChange}
      overlayStyle={{ width: '240px' }}
      onClear={() => {
        setValue('');
      }}
      recentId="test_2"
      data-testid="123"
      allowClear
      placeholder="请选择"
    >
      <SearchBar
        size="small"
        style={{ width: '100%' }}
        placeholder="请搜索名称"
        onSearch={(val: string) => setSearch(val)}
      />
      <Tabs value={activeTab} defaultValue="tab1" onChange={(key: string) => setActiveTab(key)}>
        <Tab label="tab1" value="tab1">
          <List.Selection>
            <Recent title="最近使用" />
            <List
              id="group1"
              title="分组1"
              options={[
                { label: '苹果', value: 'apple' },
                { label: '香蕉', value: 'banana' },
              ]}
            />
            <List
              id="group1"
              title="分组2"
              options={[
                { label: '属性', value: 'visible' },
                { label: '标签', value: 'tag' },
              ]}
            />
          </List.Selection>
        </Tab>
        <Tab label="tab2" value="tab2">
          <List.Selection>
            <Recent title="最近使用" />
            <List
              id="group2"
              title="分组2"
              options={[
                { label: '苹果2', value: 'apple2' },
                { label: '香蕉2', value: 'banana2' },
              ]}
            />
            <List
              id="group2"
              title="分组2"
              options={[
                { label: '属性2', value: 'visible2' },
                { label: '标签2', value: 'tag2' },
              ]}
            />
          </List.Selection>
        </Tab>
      </Tabs>
    </ListPicker>
  );
};
export const Multiple = (args: ListPickerProps) => {
  const [value, setValue] = useState<undefined | string>('ziyi');
  const [activeTab, setActiveTab] = useState('tab1');
  const onChange = (val: string) => {
    setValue(val);
  };
  return (
    <ListPicker
      {...args}
      style={style}
      value={value}
      onChange={onChange}
      overlayStyle={{ width: '240px' }}
      onClear={() => {
        setValue('');
      }}
      allowClear
      placeholder="请选择"
      model="multiple"
    >
      <SearchBar
        size="small"
        style={{ width: '100%' }}
        placeholder="请搜索名称"
        onSearch={(val: string) => action(val)}
      />
      <Tabs value={activeTab} defaultValue="tab1" onChange={(key: string) => setActiveTab(key)}>
        <Tab label="tab1" value="tab1">
          <List.Selection>
            <List
              id="group1"
              title="分组1"
              options={[
                { label: '苹果', value: 'apple' },
                { label: '香蕉', value: 'banana' },
              ]}
            />
            <List
              id="group1"
              title="分组2"
              options={[
                { label: '属性', value: 'visible' },
                { label: '标签', value: 'tag' },
              ]}
            />
          </List.Selection>
        </Tab>
        <Tab label="tab2" value="tab2">
          <List.Selection>
            <List
              id="group2"
              title="分组2"
              options={[
                { label: '苹果2', value: 'apple2' },
                { label: '香蕉2', value: 'banana2' },
              ]}
            />
            <List
              id="group2"
              title="分组2"
              options={[
                { label: '属性2', value: 'visible2' },
                { label: '标签2', value: 'tag2' },
              ]}
            />
          </List.Selection>
        </Tab>
      </Tabs>
    </ListPicker>
  );
};
export const Disable = (args: ListPickerProps) => {
  const [multipleValue, setMultipleValue] = useState<undefined | string[]>(undefined);
  return (
    <ListPicker
      {...args}
      style={style}
      disabled
      value={multipleValue}
      onChange={(val) => {
        console.log('multiple onChange 并不会触发', val);
      }}
      overlayStyle={{ width: '240px' }}
      model="multiple"
      onClear={() => {
        setMultipleValue(undefined);
      }}
      onConfim={(val) => setMultipleValue(val as any)}
      placeholder="请选择"
    >
      <SearchBar size="small" style={{ width: '100%' }} placeholder="请搜索名称" onSearch={() => action('onSearch')} />
      <List.Selection options={largeOptions} />
    </ListPicker>
  );
};
export const AllChose = (args: ListPickerProps) => {
  const [multipleValue, setMultipleValue] = useState<undefined | string[]>(undefined);
  const [activeTab, setActiveTab] = useState('tab1');
  return (
    <ListPicker
      {...args}
      style={style}
      value={multipleValue}
      onConfim={(val) => {
        setMultipleValue(val as string[]);
      }}
      overlayStyle={{ width: '240px' }}
      model="multiple"
      onClear={() => {
        setMultipleValue([]);
      }}
      placeholder="请选择"
    >
      <SearchBar size="small" style={{ width: '100%' }} placeholder="请搜索名称" onSearch={() => action('onSearch')} />

      <Tabs value={activeTab} defaultValue="tab1" onChange={(key: string) => setActiveTab(key)}>
        <Tab label="tab1" value="tab1">
          <List.Selection>
            {(context) => {
              const isEqualValue = isEqual(
                Array.from(context.options.values()).reduce((p, v) => [...p, v.value], []),
                context.value
              );
              return (
                <>
                  <CheckboxItem
                    selected={isEqualValue}
                    onClick={() => {
                      if (isEqualValue) {
                        context.onChange([]);
                      } else {
                        context.onChange(Array.from(context.options.keys()));
                      }
                    }}
                    label="全部"
                    value="all"
                  />

                  <List
                    options={[
                      { label: '1', value: '1' },
                      { label: '2', value: '2' },
                    ]}
                    id="id"
                    title="有item"
                  />
                </>
              );
            }}
          </List.Selection>
        </Tab>
      </Tabs>
    </ListPicker>
  );
};
export const Selection = (args: ListPickerProps) => {
  const multipleOptions = [
    { label: '子一', value: 'ziyi' },
    { label: '子二', value: 'zier' },
  ];
  return (
    <ListPicker
      {...args}
      overlayStyle={{ width: '240px' }}
      placeholder="请选择"
      onChange={() => action('v')}
      style={style}
    >
      <SearchBar size="small" style={{ width: '100%' }} placeholder="请搜索名称" onSearch={() => action('onSearch')} />
      <List.Selection>
        <List options={multipleOptions} id="id" title="有item" />
        <List options={[]} id="id2" title="无item" />
        <List id="id3" title="有JSX item">
          <List.Item value="id3-1">JSX-1</List.Item>
          <List.Item value="id3-2">JSX-2</List.Item>
        </List>
      </List.Selection>
    </ListPicker>
  );
};
export const Default: Story<ListPickerProps> = (args: ListPickerProps) => {
  const [activeTab, setActiveTab] = useState('tab1');
  return (
    <>
      <ListPicker
        {...args}
        style={{ width: '240px' }}
        placeholder="请选择"
        getContainer={(node) => node?.parentElement || document.body}
      >
        <Tabs value={activeTab} defaultValue="tab1" onChange={(key: string) => setActiveTab(key)}>
          <Tab label="tab1" value="tab1">
            <List style={{ width: '240px' }} options={simpleLargeOptions} />
          </Tab>
          <Tab label="tab2" value="tab2">
            <List style={{ width: '240px' }} options={[]} />
          </Tab>
          <Tab label="tab3" value="tab3">
            <List
              style={{ width: '240px' }}
              options={[]}
              empty={<Page type="noFind" description="暂无数据" size="small" />}
            />
          </Tab>
        </Tabs>
      </ListPicker>
    </>
  );
};
const getGroup = (type: string, isSystem = false) => {
  switch (type) {
    case 'custom':
      return isSystem ? ['preparedEvent', '预置事件'] : ['custom', '埋点事件'];
    case 'simple':
      return ['simple', '无埋点事件'];
    case 'virtual':
      return ['virtual', '虚拟事件'];
    case 'prepared':
      return ['prepared', '预置指标'];
    case 'complex':
      return ['complex', '自定义指标'];
    default:
      return ['unknow', '未知类型'];
  }
};

const measurements: Tmesurements[] = [
  { id: 'ExQWOQ79', name: '订单支付成功', type: 'simple', action: '', elementId: '', isSystem: true },
  { id: 'y9pm1pme', name: '订单支付_虚拟', type: 'virtual', action: '', elementId: '', isSystem: true },
  { id: 'V0G5vDAR', name: 'D_加购产品', type: 'custom', action: '', elementId: '', isSystem: false },
  { id: 'mgGJLQA4', name: 'D_预约直播', type: 'custom', action: '', elementId: '', isSystem: false },
  { id: 'qVDgrGkw', name: 'D_直播产品', type: 'complex', action: '', elementId: '', isSystem: false },
  { id: 'WkDyOpe4', name: 'D_直播订单', type: 'virtual', action: '', elementId: '', isSystem: true },
  { id: 'qgQMnp3L', name: 'D_直播链接', type: 'virtual', action: '', elementId: '', isSystem: false },
  { id: '7RDYeDA8', name: 'D_直播支付', type: 'complex', action: '', elementId: '', isSystem: true },
  { id: 'JnG4mDzK', name: 'E_点击搜索', type: 'custom', action: '', elementId: '', isSystem: false },
  { id: 'AVpZzpKy', name: 'E_订单支付成功', type: 'virtual', action: '', elementId: '', isSystem: true },
  { id: '3mpxwQOq', name: 'E_搜索产品查看', type: 'custom', action: '', elementId: '', isSystem: false },
  { id: 'KzpNzpkv', name: 'E_搜索结果', type: 'custom', action: '', elementId: '', isSystem: false },
  { id: 'zZDbKQ9o', name: 'E_搜索结果点击', type: 'custom', action: '', elementId: '', isSystem: false },
];
const iconMap = {
  simple: <CodelessTrackingOutlined size="14px" />,
  virtual: <EventsTrackingOutlined size="14px" />,
  custom: <EventsTrackingOutlined size="14px" />,
  complex: <MetricsPresetOutlined size="14px" />,
  prepared: <EventsPresetOutlined size="14px" />,
};
const renderWrapper = (o: Tmesurements) => (element: React.ReactElement) =>
  (
    <Popover
      allowArrow
      placement="right"
      strategy="fixed"
      triggerStyle={{ display: 'block' }}
      content={
        <Card style={{ width: '320px' }}>
          <Card.Meta title={o.name} description={o.id} />
          <p>{`${o.id}${o.name}${o.type}`}</p>
          <Skeleton.Image style={{ width: '100%' }} />
          <Table
            title="事件属性"
            pagination={false}
            columns={[
              {
                dataIndex: 'id',
                title: 'Id',
              },
              {
                dataIndex: 'name',
                title: 'Name',
              },
            ]}
            dataSource={Array(2)
              .fill('')
              .map((_, index) => ({
                id: `${index + 1 * 1000}`,
                name: `Name ${index + 1}`,
              }))}
          />
        </Card>
      }
    >
      {element}
    </Popover>
  );
const renderWrapper2 = (o: Tmesurements) => (element: React.ReactElement) =>
  (
    <Popover
      allowArrow
      strategy="fixed"
      placement="right"
      content={
        <Card style={{ width: 320 }}>
          <Card.Meta
            title={
              <div>
                {o.name}
                <Tag status="draft" style={{ marginLeft: 8 }}>
                  {o.type}
                </Tag>
              </div>
            }
            description={o.id}
          />
          <Divider style={{ width: '100%' }} />
          <div>{o.type}</div>
        </Card>
      }
      triggerStyle={{ display: 'block' }}
    >
      {element}
    </Popover>
  );
const dataFactory = (
  arr: Tmesurements[],
  wrapperFC: (o: Tmesurements) => (element: React.ReactElement) => JSX.Element
): OptionProps[] =>
  arr?.map((o: Tmesurements) => ({
    ...o,
    label: o.name,
    value: o.id,
    prefix: iconMap[o.type],
    groupId: getGroup(o.type, o.isSystem)[0],
    groupName: getGroup(o.type, o.isSystem)[1],
    wrapper: wrapperFC(o),
  }));

const searchData = dataFactory(measurements, renderWrapper);
const searchData2 = dataFactory(measurements, renderWrapper2);
const searchData3 = (v: number) => searchData.filter((_: any, index: number) => index % v === 0);
export const EventTargetPicker = (args: ListPickerProps) => {
  const [value, setValue] = useState<string>('');
  return (
    <ListPicker
      {...args}
      onChange={(e: string) => {
        action('onChange');
        setValue(e);
      }}
      placeholder="请选择事件"
      style={style}
      overlayStyle={{ width: '320px' }}
      value={value}
    >
      <SearchBar style={{ width: '100%' }} onChange={null} placeholder="搜索事件名称" />
      <Tabs defaultValue="all">
        <Tabs.Tab value="all" label="全部">
          <List.Selection options={searchData}>
            <Recent />
          </List.Selection>
        </Tabs.Tab>
        <Tabs.Tab value="event" label="事件">
          <List.Selection options={searchData3(2)} />
        </Tabs.Tab>
        <Tabs.Tab value="metrics" label="计算指标">
          <List.Selection options={searchData} />
        </Tabs.Tab>
      </Tabs>
    </ListPicker>
  );
};

export const UserPicker = (args: ListPickerProps) => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <ListPicker
      {...args}
      style={style}
      max={5}
      size="small"
      placeholder="请选择用户"
      // onChange={() => {}}
      onConfim={(e: string[]) => {
        action('onConfim');
        setValue(e);
      }}
      onClear={() => {
        action('onClear');
        setValue([]);
      }}
      allowClear
      model="multiple"
      value={value}
    >
      <SearchBar style={{ width: '100%' }} placeholder="搜索名称" onSearch={() => action('onSearch')} />
      <div style={{ margin: '8px 0px' }}>
        <List.Selection>
          <Recent title="最近使用" />
          <List id="prepared" title="预定义">
            <List.Item value="uv" label="全部用户" />
            <List.Item value="nuv" label="新用户" />
          </List>
          <List id="normal" title="其他">
            {measurements.map(
              (s: { id: string; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal }) => (
                <List.Item value={s.id} label={s.name} />
              )
            )}
          </List>
        </List.Selection>
      </div>
    </ListPicker>
  );
};

export const TargetUserPicker = (args: ListPickerProps) => {
  const [value, setValue] = useState('');

  return (
    <ListPicker
      {...args}
      style={style}
      size="small"
      placeholder="请选择目标用户"
      onChange={(e: string) => {
        action('onChange');
        setValue(e);
      }}
      onClear={() => {
        action('onClear');
      }}
      allowClear
      value={value}
    >
      <SearchBar style={{ width: '100%' }} placeholder="搜索名称" onSearch={() => action('onSearch')} />
      <div style={{ margin: '8px 0px' }}>
        <List.Selection>
          <Recent title="最近使用" />
          <List id="prepared" title="预定义">
            <List.Item value="uv" label="全部用户" />
            <List.Item value="nuv" label="新用户" />
          </List>
          <List id="normal" title="其他">
            {measurements.map(
              (s: { id: string; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal }) => (
                <List.Item value={s.id} label={s.name} />
              )
            )}
          </List>
        </List.Selection>
      </div>
    </ListPicker>
  );
};

export const DimensionPicker = () => {
  const [value, setValue] = useState('');
  const renderSelection = (v: number) => <List.Selection options={searchData3(v)} />;
  return (
    <ListPicker
      value={value}
      style={style}
      placeholder="请选择属性"
      autoWidth
      onChange={(e: string) => {
        setValue(e);
        action('onChange');
      }}
      getContainer={() => document.body}
    >
      <SearchBar
        style={{ width: '100%' }}
        onChange={() => {
          action('onsearch');
        }}
        placeholder="搜索属性名称"
      />
      <Tabs defaultValue="all">
        <Tabs.Tab value="all" label="全部">
          <List.Selection options={searchData2} />
        </Tabs.Tab>
        <Tabs.Tab value="event" label="事件属性">
          {renderSelection(2)}
        </Tabs.Tab>
        {/* <Tabs.Tab value="visit" label="访问属性">
          <List.Selection options={searchData3(3)} />
        </Tabs.Tab>
        <Tabs.Tab value="segements" label="用户属性">
          <List.Selection options={searchData3(4)} />
        </Tabs.Tab> */}
      </Tabs>
    </ListPicker>
  );
};
export const SplitPicker = (args: ListPickerProps) => {
  const [value, setValue] = useState('');
  const peopledata = [
    { label: '北京访问人群', value: 'bj' },
    { label: '有任意访问人群', value: 'any' },
    { label: '验证自定义渠道', value: 'custom' },
    { label: '未转化人群记录', value: 'no' },
  ];
  return (
    <ListPicker
      {...args}
      style={style}
      overlayStyle={{ width: '320px' }}
      size="small"
      placeholder="请选择分群"
      onChange={(e: string) => {
        action('onChange');
        setValue(e);
      }}
      onClear={() => action('onClear')}
      allowClear
      value={value}
    >
      <SearchBar style={{ width: '100%' }} placeholder="搜索分群名称" onSearch={() => action('onSearch')} />
      <div style={{ margin: '8px 0px' }}>
        <List.Selection>
          <Recent title="最近使用" />
          <List id="prepared" title="预制分群">
            <List.Item value="uv" label="全部用户" />
            <List.Item value="nuv" label="新用户" />
          </List>
          <List id="normal" title="其他">
            {peopledata.map((s) => (
              <List.Item value={s.value} label={s.label} />
            ))}
          </List>
        </List.Selection>
      </div>
    </ListPicker>
  );
};
export const Demo: Story<ListPickerProps> = (args) => (
  <>
    <table className={classNames('table-demo', 'list-picker-demo')}>
      <tr>
        <th>UserCase</th>
        <th>Example</th>
      </tr>
      <tr>
        <td>Default</td>
        <td className="list-picker-demo-td">
          <Default {...args} />
        </td>
      </tr>
      <tr>
        <td>Single</td>

        <td className="list-picker-demo-td">
          <Single {...args} />
        </td>
      </tr>
      <tr>
        <td>Multiple</td>
        <td className="list-picker-demo-td">
          <Multiple {...args} />
        </td>
      </tr>
      <tr>
        <td>disabled</td>
        <td className="list-picker-demo-td">
          <Disable {...args} />
        </td>
      </tr>
      <tr>
        <td>AllChose</td>
        <td className="list-picker-demo-td">
          <AllChose {...args} />
        </td>
      </tr>
      <tr>
        <td>Selection</td>
        <td className="list-picker-demo-td">
          <Selection {...args} />
        </td>
      </tr>
      <tr>
        <td>EventTargetPicker</td>
        <td className="list-picker-demo-td">
          <EventTargetPicker {...args} />
        </td>
      </tr>
      <tr>
        <td>UserPicker</td>
        <td className="list-picker-demo-td">
          <UserPicker {...args} />
        </td>
      </tr>
      <tr>
        <td>TargetUserPicker</td>
        <td className="list-picker-demo-td">
          <TargetUserPicker {...args} />
        </td>
      </tr>
      <tr>
        <td>DimensionPicker</td>
        <td className="list-picker-demo-td">
          <DimensionPicker {...args} />
        </td>
      </tr>
      <tr>
        <td>SplitPicker</td>
        <td className="list-picker-demo-td">
          <SplitPicker {...args} />
        </td>
      </tr>
    </table>
  </>
);
Demo.args = {};
