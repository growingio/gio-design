import React, { useMemo, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import '../style';
import { groupBy, uniqBy } from 'lodash';
import { AddCircleOutlined } from '@gio-design/icons';
import { ListPickerProps, OptionProps } from '../interfance';
import ListPicker from '../listPicker';
import SearchBar from '../../search-bar';
import { Tab } from '../../tabs';
import { Tabs } from '../..';

export default {
  title: 'Upgraded/ListPicker',
  component: ListPicker,
} as Meta;
const options = [
  {
    label: '访问',
    value: 'visit',
    groupId: 'custom',
    groupName: '用户属性',
    selectionValue: 'global',
    selectionTitle: '全局',
  },
  {
    label: '离开',
    value: 'leave',
    groupId: 'custom',
    groupName: '用户属性',
    selectionValue: 'global',
    selectionTitle: '全局',
  },
  {
    label: '香蕉',
    value: 'banana',
    groupId: 'fruits',
    groupName: '水果',
    selectionValue: 'beijing',
    selectionTitle: '北京',
  },
  {
    label: '苹果',
    value: 'apple',
    groupId: 'fruits',
    groupName: '水果',
    selectionValue: 'beijing',
    selectionTitle: '北京',
  },
  {
    label: '椰子',
    value: 'coconut',
    groupId: 'fruits',
    groupName: '水果',
    selectionValue: 'shenzhen',
    selectionTitle: '深圳',
  },
];

const cascaderOptions = [
  {
    label: '访问',
    value: 'visit',
    groupId: 'custom',
    groupName: '用户属性',
    selectionValue: 'global',
    selectionTitle: '全局',
    childrens: [
      { label: '有', value: 'yes' },
      { label: '没有', value: 'no' },
    ],
  },
  {
    label: '离开',
    value: 'leave',
    groupId: 'custom',
    groupName: '用户属性',
    selectionValue: 'global',
    selectionTitle: '全局',
  },
  {
    label: '香蕉',
    value: 'banana',
    groupId: 'fruits',
    groupName: '水果',
    selectionValue: 'beijing',
    selectionTitle: '北京',
    childrens: [
      { label: '吃了', value: 'eat' },
      { label: '没吃', value: 'no eat' },
    ],
  },
  {
    label: '苹果',
    value: 'apple',
    groupId: 'fruits',
    groupName: '水果',
    selectionValue: 'beijing',
    selectionTitle: '北京',
    childrens: [
      { label: '好的', value: 'good', childrens: [{ label: 'cool', value: 'cool' }] },
      { label: '坏的', value: 'bad' },
    ],
  },
  {
    label: '椰子',
    value: 'coconut',
    groupId: 'fruits',
    groupName: '水果',
    selectionValue: 'shenzhen',
    selectionTitle: '深圳',
  },
];

const Template: Story<ListPickerProps> = () => {
  const [value, setValue] = useState(undefined);
  const [multiple, setMutipleValue] = useState(undefined);
  const [activeTab, setActiveTab] = useState('fruits');
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState(undefined);
  const tabs = uniqBy(
    options.reduce((prev, curr) => [...prev, { label: curr?.groupName, value: curr.groupId }], []),
    'value'
  );
  const filterOptions = useMemo(
    () =>
      groupBy(
        options?.filter((option) => activeTab === option.groupId && option.label.includes(search)),
        'groupId'
      ),
    [activeTab, search]
  );
  const onChange = (val?: string | string[], opt?: OptionProps | OptionProps[]) => {
    setValue(val);
    console.log('onChange执行', val, opt);
  };
  const onMultipleChange = (val?: string | string[], opt?: OptionProps | OptionProps[]) => {
    setMutipleValue(val);
    console.log('onChange执行', val, opt);
  };
  return (
    <div>
      <h3>单选</h3>
      <h4>normal</h4>
      <div className="demo-box">
        <ListPicker
          value={value}
          options={filterOptions[activeTab]}
          onChange={onChange}
          // overlayStyle={{ width: '240px' }}
          onClear={() => {
            setValue('');
          }}
          triggerProps={
            {
              // style: { width: '240px' },
            }
          }
          placeholder="请选择"
        >
          <SearchBar size="small" style={{ width: '100%' }} onSearch={(val: string) => setSearch(val)} />
          <div style={{ margin: '8px 0px' }}>
            <Tabs
              value={activeTab}
              defaultValue="fruits"
              onChange={(key: string) => {
                setActiveTab(key);
              }}
            >
              {tabs.map((tab) => (
                <Tab label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </div>
        </ListPicker>
      </div>
      <h4>no search and tab</h4>
      <div className="demo-box">
        <ListPicker
          size="small"
          value={value}
          options={options}
          onChange={onChange}
          overlayStyle={{ width: '240px' }}
          onClear={() => {
            setValue('');
          }}
          triggerProps={{
            style: { width: '240px' },
          }}
          placeholder="请选择"
        />
      </div>
      <h4>custom trigger</h4>
      <div className="demo-box">
        <ListPicker
          value={value}
          options={filterOptions[activeTab]}
          renderTrigger={() => <AddCircleOutlined />}
          onChange={onChange}
          overlayStyle={{ width: '240px' }}
          onClear={() => {
            setValue('');
          }}
          triggerProps={{
            style: { width: '240px' },
          }}
          placeholder="请选择"
        >
          <SearchBar style={{ width: '100%' }} onSearch={(val: string) => setSearch(val)} />
          <div style={{ margin: '8px 0px' }}>
            <Tabs
              value={activeTab}
              defaultValue="fruits"
              onChange={(key: string) => {
                setActiveTab(key);
              }}
            >
              {tabs.map((tab) => (
                <Tab label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </div>
        </ListPicker>
      </div>
      <h3>多选</h3>
      <h4>normal</h4>
      <div className="demo-box">
        <ListPicker
          value={multiple}
          options={filterOptions[activeTab]}
          size="small"
          model="multiple"
          onChange={onMultipleChange}
          onConfim={onMultipleChange}
          overlayStyle={{ width: '240px' }}
          onClear={() => {
            setMutipleValue('');
          }}
          triggerProps={{
            style: { width: '240px' },
          }}
          placeholder="请选择"
        >
          <SearchBar size="small" style={{ width: '100%' }} onSearch={(val: string) => setSearch(val)} />
          <div style={{ margin: '8px 0px' }}>
            <Tabs
              size="small"
              value={activeTab}
              defaultValue="fruits"
              onChange={(key: string) => {
                setActiveTab(key);
              }}
            >
              {tabs.map((tab) => (
                <Tab label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </div>
        </ListPicker>
      </div>
      <h4>no search and tab</h4>
      <div className="demo-box">
        <ListPicker
          value={multiple}
          options={options}
          size="small"
          model="multiple"
          onChange={onMultipleChange}
          onConfim={onMultipleChange}
          overlayStyle={{ width: '240px' }}
          onClear={() => {
            setValue('');
          }}
          triggerProps={{
            style: { width: '240px' },
          }}
          placeholder="请选择"
        />
      </div>
      <h3>cascader</h3>
      <h4>cascader不支持多选</h4>
      <div className="demo-box">
        <ListPicker
          options={cascaderOptions}
          size="small"
          model="cascader"
          overlayStyle={{ width: '240px' }}
          onClear={() => {
            setValue('');
          }}
          triggerProps={{
            style: { width: '240px' },
          }}
          placeholder="请选择"
        />
      </div>
      <h4>separator</h4>
      <div className="demo-box">
        <ListPicker
          options={cascaderOptions}
          size="small"
          model="cascader"
          separator="--"
          overlayStyle={{ width: '240px' }}
          onClear={() => {
            setValue('');
          }}
          triggerProps={{
            style: { width: '240px' },
          }}
          placeholder="请选择"
        />
      </div>
      <h4>custom trigger value</h4>
      <p>separator多级文本连接符失效</p>
      <div className="demo-box">
        <ListPicker
          options={cascaderOptions}
          size="small"
          onChange={(val, opt: OptionProps[]) =>
            setTitle(`${opt?.reduce((prev, curr) => [...prev, `${curr?.value}==` ?? '无值'], []).join('')}的`)
          }
          separator="超人"
          model="cascader"
          overlayStyle={{ width: '240px' }}
          onClear={() => {
            setValue('');
          }}
          triggerProps={{
            value: title,
            style: { width: '240px' },
          }}
          placeholder="请选择"
        />
      </div>
      <h3>无 selection</h3>
      <div className="demo-box">
        <ListPicker
          options={options
            .concat(options)
            .reduce(
              (prev, curr, index) => [...prev, { label: `${curr.label}-${index}`, value: `${curr.value}-${index}` }],
              []
            )}
          size="small"
          overlayStyle={{ width: '240px' }}
          triggerProps={{
            value: title,
            style: { width: '240px' },
            allowClear: false,
          }}
          placeholder="请选择"
        />
      </div>
    </div>
  );
};
export const Default = Template.bind({});

Default.args = {
  searchPlaceholder: '请输入',
};
