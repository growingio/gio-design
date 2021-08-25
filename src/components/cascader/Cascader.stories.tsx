import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import _ from 'lodash';
import { Grid, Checkbox } from '../..';
import Cascader from './index';
import CascaderMenu from './menu';
import { Props } from './interface';
import './style';
import './style/stories.less';
import '../input/style';
import '../dropdown/style';
import '../search-bar/style';
import Docs from './Cascader.mdx';

export default {
  title: 'Basic Components/Cascader',
  component: Cascader,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;
// eslint-disable-next-line
const Title = (props: { children?: React.ReactNode }) => <h3>{props.children ?? 'title'}</h3>;

const defaultDataSource = [
  { label: 'option A', value: 'a' },
  { label: 'option B', value: 'b', children: [{ label: 'B-1', value: 'b-1' }] },
  {
    label: 'option C',
    value: 'c',
    children: [
      { label: 'Option C-1', value: 'c-1' },
      {
        label: 'Option C-2',
        value: 'c-2',
        children: [
          { label: 'Option C-2-1', value: 'c-2-1' },
          { label: 'Option C-2-2', value: 'c-2-2', children: [{ label: 'Option C-2-2-1', value: 'c-2-2-1' }] },
        ],
      },
    ],
  },
];

const keyMappingDataSource = [
  { name: 'option A', id: 'a' },
  { name: 'option B', id: 'b', children: [{ name: 'B-1', id: 'b-1' }] },
];

const groupDataSource = [
  { label: 'option A-1', value: 'a-1', groupId: 'a', groupName: '节能' },
  { label: 'option A-2', value: 'a-2', groupId: 'a' },
  { label: 'option B-1', value: 'b-1', groupId: 'b', groupName: '哈哈' },
  { label: 'option B-2', value: 'b-2', groupId: 'b' },
];

const Template: Story<Props> = (args) => {
  const { title } = args;
  return (
    <>
      <Title>{title}</Title>
      <Cascader {...args} />
    </>
  );
};

const GroupTemplate: Story<Props> = (args) => {
  const groupNameIcons: { [key: string]: React.ReactNode } = { a: '🎃', b: '🎄' };
  const groupName = (id: any) => (
    <div role="img" aria-label="groupName icon">
      {groupNameIcons[id] ?? 'groupName'}
    </div>
  );

  return (
    <>
      <Title>数据分组</Title>
      <Cascader {...args} />
      <br />
      <Title>自定义组名</Title>
      <Cascader {...args} groupName={groupName} />
    </>
  );
};

const SearchTemplate: Story<Props> = (args) => {
  const [deepSearch, setDeepSearch] = React.useState(false);
  const [ignoreCase, setIgnoreCase] = React.useState(true);
  const [lazySearch, setLazySearch] = React.useState(false);
  const { title } = args;
  return (
    <div>
      <Title>{title}</Title>
      <Grid gap={5} collapse>
        <Grid>
          <Checkbox
            checked={deepSearch}
            onChange={(e) => {
              setDeepSearch(e.target.checked);
            }}
          >
            深度搜索
          </Checkbox>
        </Grid>
        <Grid>
          <Checkbox
            checked={ignoreCase}
            onChange={(e) => {
              setIgnoreCase(e.target.checked);
            }}
          >
            忽略大小写
          </Checkbox>
        </Grid>
        <Grid>
          <Checkbox
            checked={lazySearch}
            onChange={(e) => {
              setLazySearch(e.target.checked);
            }}
          >
            回车触发搜索
          </Checkbox>
        </Grid>
      </Grid>
      <br />
      <Cascader {...args} lazySearch={lazySearch} deepSearch={deepSearch} ignoreCase={ignoreCase} />
    </div>
  );
};

const CustomTemplate: Story<Props> = (args) => {
  const [keyword, setKeyword] = React.useState('');
  const nextData = defaultDataSource.filter((d) => d.label.startsWith(keyword));
  return (
    <>
      <Title>自定义 menu-item </Title>
      <Cascader
        {...args}
        onRender={(e) => (
          <Grid justify="space-between">
            <div>
              <span role="img" aria-label="cool" style={{ marginRight: 6 }}>
                😎
              </span>
              <span>{e.label}</span>
            </div>
            {Array.isArray(e.children) && e.children.length > 0 && <span>→</span>}
          </Grid>
        )}
      />
      <Title>自定义 input </Title>
      <Cascader {...args} input={<input />} />
      <Title>自定义 search-bar </Title>
      <Cascader
        keyword={keyword}
        dataSource={nextData}
        header={<input type="search" onChange={(e) => setKeyword(e.target.value)} />}
      />
      <Title>分离 menu </Title>
      <CascaderMenu
        {...args}
        style={{ minHeight: 160 }}
        header={<div>header</div>}
        footer={<div>footer</div>}
        dataSource={defaultDataSource}
        autoFocus={false}
      />
    </>
  );
};

const AsyncTemplate: Story<Props> = (args) => {
  const { title } = args;
  return (
    <>
      <Title>{title}</Title>
      <Cascader
        {...args}
        // eslint-disable-next-line
        beforeSelect={(_e, data) => {
          if ((_.isEmpty(data.children) && _.isUndefined(data.index)) || data.index < 1) {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  {
                    label: `${data.label} a`,
                    value: `${data.label} a`,
                    index: _.isNumber(data.index) ? data.index + 1 : 0,
                  },
                  {
                    label: `${data.label} b`,
                    value: `${data.label} b`,
                    index: _.isNumber(data.index) ? data.index + 1 : 0,
                  },
                ]);
              }, 500);
            });
          }
          return null;
        }}
      />
    </>
  );
};

const TooltipTemplate: Story<Props> = (args) => {
  const { title } = args;
  return (
    <>
      <Title>{title}</Title>
      <Cascader
        {...args}
        afterInner={(nodeData) => {
          if (_.isEmpty(nodeData.children)) {
            return <div className="extra-desc">{nodeData.label}</div>;
          }
          return null;
        }}
      />
    </>
  );
};

export const Default = Template.bind({});
export const KeyMapping = Template.bind({});
export const Group = GroupTemplate.bind({});
export const Trigger = Template.bind({});
export const Search = SearchTemplate.bind({});
export const Custom = CustomTemplate.bind({});
export const Async = AsyncTemplate.bind({});
export const Tooltip = TooltipTemplate.bind({});

Default.args = {
  dataSource: defaultDataSource,
  title: '基础用法',
};
KeyMapping.args = {
  dataSource: keyMappingDataSource,
  keyMapping: { value: 'id', label: 'name' },
  title: '键名映射',
};
Group.args = {
  dataSource: groupDataSource,
  groupName: true,
};
Trigger.args = {
  dataSource: defaultDataSource,
  title: '触发方式 - click',
  trigger: 'click',
};
Search.args = {
  dataSource: defaultDataSource,
  title: '可搜索的',
};
Custom.args = {
  dataSource: defaultDataSource,
};
Async.args = {
  dataSource: defaultDataSource,
  title: '异步获取数据',
};
Tooltip.args = {
  dataSource: defaultDataSource,
  title: '添加文字提示',
};
