import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import '../style';
import { isEqual, uniqueId } from 'lodash';
// import { UserOutlined } from '@gio-design/icons';
import CheckboxItem from '../../list/inner/CheckboxItem';
import { OptionProps } from '../../list/interfance';
// import { uniqueId } from 'lodash';
// import { uniqBy, uniqueId } from 'lodash';
import { ListPickerProps } from '../interfance';
import ListPicker from '../listPicker';
import SearchBar from '../../search-bar';
import Tabs, { Tab } from '../../tabs';
import List from '../../list';
import Button from '../../button/Button';
import Recent from '../Recent';
import Docs from './List-pickerPage';

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
const Template: Story<ListPickerProps> = () => {
  const [value, setValue] = useState<undefined | string>('ziyi');
  const [multipleValue, setMultipleValue] = useState<undefined | string[]>(undefined);
  const [activeTab, setActiveTab] = useState('tab1');
  const [search, setSearch] = useState('');
  const multipleOptions = [
    { label: '子一', value: 'ziyi' },
    { label: '子二', value: 'zier' },
  ];
  const onChange = (val?: string, opt?: OptionProps | OptionProps[]) => {
    setValue(val);
    console.log('onChange执行', val, opt, search);
  };
  return (
    <div style={{ height: '3000px' }}>
      <h3>单选</h3>
      <div className="demo-box">
        <div style={{ padding: '10px' }}>
          <Button size="small" onClick={() => setValue('')}>
            清空
          </Button>
        </div>
        <ListPicker
          value={value}
          onChange={onChange}
          overlayStyle={{ width: '240px' }}
          style={{ width: '100%' }}
          onClear={() => {
            console.log('onClear执行');
          }}
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
                <Recent />
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
      </div>
      <div>
        <h3>scroll list</h3>
        <ListPicker placeholder="请选择" getContainer={(node) => node?.parentElement || document.body}>
          <Tabs value={activeTab} defaultValue="tab1" onChange={(key: string) => setActiveTab(key)}>
            <Tab label="tab1" value="tab1">
              <List style={{ width: '240px' }} options={simpleLargeOptions} />
            </Tab>
          </Tabs>
        </ListPicker>
      </div>
      <div>
        <h3>scroll selection list</h3>
        <ListPicker placeholder="请选择">
          <Tabs value={activeTab} defaultValue="tab1" onChange={(key: string) => setActiveTab(key)}>
            <Tab label="tab1" value="tab1">
              <List.Selection>
                <List id="group2" title="分组2" style={{ width: '240px' }} options={simpleLargeOptions} />
              </List.Selection>
            </Tab>
          </Tabs>
        </ListPicker>
      </div>
      <div>
        <h3>selection option</h3>
        <div className="demo-box">
          <ListPicker
            value={value}
            onChange={onChange}
            overlayStyle={{ width: '240px' }}
            onClear={() => {
              setValue('');
            }}
            placeholder="请选择"
          >
            <SearchBar
              size="small"
              style={{ width: '100%' }}
              placeholder="请搜索名称"
              onSearch={(val: string) => setSearch(val)}
            />
            <List.Selection
              options={[
                { label: '子一', value: 'ziyi', groupId: 'group1', groupName: '分组1' },
                { label: '子二', value: 'zier', groupId: 'group2', groupName: '分组2' },
              ]}
            />
          </ListPicker>
        </div>
        <div className="demo-box">
          <ListPicker
            value={value}
            onChange={onChange}
            overlayStyle={{ width: '240px' }}
            onClear={() => {
              setValue('');
            }}
            placeholder="请选择"
          >
            <SearchBar
              size="small"
              style={{ width: '100%' }}
              placeholder="请搜索名称"
              onSearch={(val: string) => setSearch(val)}
            />

            <List.Selection
              options={[
                { label: '子一', value: 'ziyi' },
                { label: '子二', value: 'zier' },
              ]}
            />
          </ListPicker>
        </div>
        <h3>不同全选的方式</h3>
        <div className="demo-box">
          <div style={{ padding: '10px' }}>
            <Button size="small" onClick={() => setMultipleValue(['ziyi', 'zier'])}>
              全选
            </Button>
          </div>
          <ListPicker
            value={multipleValue}
            onChange={(val) => {
              console.log('multiple onChange 并不会触发', val);
            }}
            onConfim={(val) => {
              console.log(val);
              setMultipleValue(val as string[]);
            }}
            overlayStyle={{ width: '240px' }}
            model="multiple"
            onClear={() => {
              setMultipleValue([]);
            }}
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
                  {(context) => (
                    <>
                      <CheckboxItem
                        selected={context?.value?.length === 2}
                        onClick={() => {
                          if (context?.value?.length === 2) {
                            context?.onChange([]);
                          } else {
                            context?.onChange(Array.from(context?.options.keys()));
                          }
                        }}
                        label="全部"
                        value="all"
                      />

                      <List options={multipleOptions} id="id" title="有item" />
                    </>
                  )}
                </List.Selection>
              </Tab>
              <Tab label="tab2" value="tab2">
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
        </div>
        <h3>selection下list 无 item</h3>
        <div className="demo-box">
          <ListPicker overlayStyle={{ width: '240px' }} placeholder="请选择" onChange={(v) => console.log('v', v)}>
            <SearchBar
              size="small"
              style={{ width: '100%' }}
              placeholder="请搜索名称"
              onSearch={(val: string) => setSearch(val)}
            />
            <List.Selection>
              <List options={multipleOptions} id="id" title="有item" />
              <List options={[]} id="id2" title="无item" />
              <List id="id3" title="有JSX item">
                <List.Item value="id3-1">JSX-1</List.Item>
                <List.Item value="id3-2">JSX-2</List.Item>
              </List>
            </List.Selection>
          </ListPicker>
        </div>
        <h3>超长的ListPicker</h3>
        <div className="demo-box">
          <ListPicker
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
            <SearchBar
              size="small"
              style={{ width: '100%' }}
              placeholder="请搜索名称"
              onSearch={(val: string) => setSearch(val)}
            />
            <List.Selection options={largeOptions} />
          </ListPicker>
        </div>
        <h3>disabled</h3>
        <div className="demo-box">
          <ListPicker
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
            <SearchBar
              size="small"
              style={{ width: '100%' }}
              placeholder="请搜索名称"
              onSearch={(val: string) => setSearch(val)}
            />
            <List.Selection options={largeOptions} />
          </ListPicker>
        </div>
        <div className="demo-box">
          <ListPicker value="1.2" model="cascader">
            <List options={[{ label: '1', value: '1', childrens: [{ label: '2', value: '2' }] }]} />
          </ListPicker>
        </div>
      </div>
    </div>
  );
};
export const Default = Template.bind({});
Default.args = {
  searchPlaceholder: '请输入',
};

// const EventPickerTemplate: Story<ListPickerProps> = () => {
//   const [value, setValue] = useState(undefined);
//   const [selectedOption, setSelectedOption] = useState(undefined);
//   const [activeTab, setActiveTab] = useState('All');
//   const [search, setSearch] = useState('');

//   const onChange = (val?: string | string[], opt?: OptionProps | OptionProps[]) => {
//     console.log('onChange执行', val, opt);
//     setValue(val);
//     setSelectedOption(opt);
//   };
//   const searchEmptyRender = () => (
//     <div style={{ width: '100%' }}>
//       <Page type="noResult" size="small" style={{ margin: '0 auto', padding: '40px 0px' }} />
//     </div>
//   );
//   // ['custom', 'virtual', 'tag', 'visible']
//   const renderPrefix = (option: OptionProps) => {
//     switch (option?.groupId) {
//       case 'custom':
//         return <UserOutlined size="14px" />;
//       case 'virtual':
//         return <AttributionPropertyOutlined size="14px" />;
//       case 'tag':
//         return <TagOutlined size="14px" />;
//       case 'visible':
//         return <ItemOutlined size="14px" />;
//       default:
//         return <EditOutlined size="14px" />;
//     }
//   };
//   const renderPreview = (opt: OptionProps) => (
//     <div
//       style={{
//         width: '320px',
//         padding: '8px',
//         height: '150px',
//         background: 'white',
//         border: '1px solid #DFE4EE',
//         boxShadow: '0px 8px 24px rgba(36, 46, 89, 0.1)',
//         borderRadius: '8px',
//       }}
//     >
//       <h2>{opt.label}</h2>
//     </div>
//   );
//   return (
//     <div>
//       <h3> event Picker Demo</h3>
//       {/* <ListPicker
//         value={value}
//         style={{ width: '320px' }}
//         size="small"
//         onChange={onChange}
//         showPreview
//         previewRender={renderPreview}
//         onClear={() => {
//           setValue('');
//         }}
//         triggerProps={{
//           allowClear: false,
//           prefix: renderPrefix(selectedOption),
//         }}
//         prefix={renderPrefix}
//         empty={!searchOptions.length ? searchEmptyRender : undefined}
//         placeholder="请选择"
//       >
//         <SearchBar style={{ width: '100%' }} placeholder="搜索名称" onSearch={(val: string) => setSearch(val)} />
//         <div style={{ margin: '8px 0px' }}>
//           <Tabs
//             value={activeTab}
//             defaultValue="fruits"
//             onChange={(key: string) => {
//               setActiveTab(key);
//             }}
//           >
//             {tabs.map((tab) => (
//               <Tab label={tab.label} value={tab.value} />
//             ))}
//           </Tabs>
//         </div>
//       </ListPicker> */}
//       <h3>options empty</h3>
//       {/* <ListPicker value={value} style={{ width: '320px' }} size="small" placeholder="请选择">
//         <SearchBar style={{ width: '100%' }} placeholder="搜索名称" onSearch={(val: string) => setSearch(val)} />
//         <div style={{ margin: '8px 0px' }}>
//           <Tabs
//             value={activeTab}
//             defaultValue="fruits"
//             onChange={(key: string) => {
//               setActiveTab(key);
//             }}
//           >
//             {tabs.map((tab) => (
//               <Tab label={tab.label} value={tab.value} />
//             ))}
//           </Tabs>
//         </div>
//       </ListPicker> */}
//     </div>
//   );
// };
// export const EventPicker = EventPickerTemplate.bind({});
// EventPicker.args = {};
