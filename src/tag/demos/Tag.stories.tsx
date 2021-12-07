import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Docs from './TagPage';
import { TagProps } from '../interface';
import Tag from '../index';
import '../style';
import '../style/demo.stories.less';

export default {
  title: 'Upgraded/Tag',
  component: Tag,
  parameters: {
    docs: {
      page: Docs,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4092%3A41171',
      allowFullscreen: true,
    },
  },
} as Meta;
const obj: Record<string, TagProps['status']> = {
  普通标签: 'default',
  灰色标签: 'draft',
  信息标签: 'info',
  成功标签: 'success',
  警告标签: 'warning',
  错误标签: 'error',
};
const DefaultTemplate: Story<TagProps> = (args) => (
  <>
    <table className="table-demo">
      <tr>
        <th>Control</th>
        <th>Example</th>
      </tr>
      <tr>
        <td>status</td>
        <td>
          {[...new Array(6)].map((item, index) => (
            <Tag {...args} data-testid="tag-status" className="tag_website_demo_tag" status={Object.values(obj)[index] as TagProps['status']}>
              {Object.keys(obj)[index]}
            </Tag>
          ))}
        </td>
      </tr>
      <tr>
        <td>highlight</td>
        <td>
          {[...new Array(6)].map((item, index) => (
            <Tag
              {...args}
              className="tag_website_demo_tag"
              status={Object.values(obj)[index] as TagProps['status']}
              type="highlight"
            >
              {Object.keys(obj)[index]}
            </Tag>
          ))}
        </td>
      </tr>
      <tr>
        <td>size</td>
        <td>
          {[...new Array(6)].map((item, index) => (
            <Tag
              {...args}
              className="tag_website_demo_tag"
              status={Object.values(obj)[index] as TagProps['status']}
              size="small"
              style={{ margin: '10' }}
            >
              {Object.keys(obj)[index]}
            </Tag>
          ))}
          <br />
          {[...new Array(6)].map((item, index) => (
            <Tag
              {...args}
              className="tag_website_demo_tag"
              status={Object.values(obj)[index] as TagProps['status']}
              size="middle"
            >
              {Object.keys(obj)[index]}
            </Tag>
          ))}
        </td>
      </tr>
      <tr>
        <td>disabled</td>
        <td>
          {[...new Array(6)].map((item, index) => (
            <Tag
              {...args}
              className="tag_website_demo_tag"
              status={Object.values(obj)[index] as TagProps['status']}
              size="small"
              type="highlight"
              style={{ margin: '10' }}
              disabled
            >
              {Object.keys(obj)[index]}
            </Tag>
          ))}
          <br />
          {[...new Array(6)].map((item, index) => (
            <Tag
              {...args}
              className="tag_website_demo_tag"
              status={Object.values(obj)[index] as TagProps['status']}
              type="highlight"
              size="middle"
              disabled
            >
              {Object.keys(obj)[index]}
            </Tag>
          ))}
        </td>
      </tr>
      <tr>
        <td>closed</td>
        <td>
          {[...new Array(6)].map((item, index) => (
            <Tag
              {...args}
              className="tag_website_demo_tag"
              status={Object.values(obj)[index] as TagProps['status']}
              size="middle"
              closable
            >
              {Object.keys(obj)[index]}
            </Tag>
          ))}
          <br />
          {[...new Array(6)].map((item, index) => (
            <Tag
              {...args}
              className="tag_website_demo_tag"
              status={Object.values(obj)[index] as TagProps['status']}
              size="middle"
              closable
            >
              {Object.keys(obj)[index]}
            </Tag>
          ))}
        </td>
      </tr>
    </table>
    <br />
  </>
);

export const Demo = DefaultTemplate.bind({});
Demo.args = {
  style: { margin: '30' },
};
const defaultTemplate = () =>
  [...new Array(6)].map((item, index) => (
    <Tag className="tag_website_demo_tag" status={Object.values(obj)[index] as TagProps['status']}>
      {Object.keys(obj)[index]}
    </Tag>
  ));

export const Default = defaultTemplate.bind({});
const DelayTemplate: Story<TagProps> = (args) => (
  <>
    <Tag className="tag_website_demo_tag" {...args}>
      控件内的过滤条件
    </Tag>
    <Tag className="tag_website_demo_tag" {...args}>
      控件内的过滤条件
    </Tag>
  </>
);
export const Closable = DelayTemplate.bind({});
Closable.args = {
  closable: true,
  persistCloseIcon: true,
};

const disableTemplate = () =>
  [...new Array(6)].map((item, index) => (
    <Tag className="tag_website_demo_tag" status={Object.values(obj)[index] as TagProps['status']} disabled>
      {Object.keys(obj)[index]}
    </Tag>
  ));
export const Disable = disableTemplate.bind({});
