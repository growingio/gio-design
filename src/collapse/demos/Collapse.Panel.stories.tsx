/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { MoreOutlined, EditOutlined, RightOutlined } from '@gio-design/icons';
import Docs from './CollapsePanel';
import Collapse, { CollapsePanel } from '../index';
import Button from '../../button';

export default {
  title: 'Upgraded/Collapse/Panel',
  component: CollapsePanel,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const text = '示例文本';
const callback = (key: any) => {
  console.log(key);
};

const Template: Story = () => (
  <div>
    <Collapse defaultActiveKey={['2']} onChange={callback}>
      <Collapse.Panel header="折叠面板标题" key="1">
        <p>{text}</p>
        <p>{text}</p>
        <p>{text}</p>
      </Collapse.Panel>
      <Collapse.Panel header="折叠面板标题" key="2">
        <p>{text}</p>
        <Collapse expandIcon={() => <RightOutlined size="14px" />} bordered={false} onChange={callback}>
          <Collapse.Panel header="折叠面板标题" key="1">
            <p>{text}</p>
            <p>{text}</p>
            <p>{text}</p>
          </Collapse.Panel>
        </Collapse>
      </Collapse.Panel>
    </Collapse>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  className: 'CollapsePanel',
  onChange: action('onchange'),
};

export const Showarrow = () => (
  <Collapse defaultActiveKey={['1']} onChange={callback}>
    <Collapse.Panel header="隐藏折叠箭头" key="1" showArrow={false}>
      <p>{text}</p>
      <p>{text}</p>
      <p>{text}</p>
    </Collapse.Panel>
    <Collapse.Panel header="展示折叠箭头" key="1">
      <p>{text}</p>
      <p>{text}</p>
      <p>{text}</p>
    </Collapse.Panel>
  </Collapse>
);

export const Extra = () => {
  const genExtra = () => (
    <>
      <Button.IconButton
        onClick={(e) => {
          e.stopPropagation();
        }}
        type="text"
      >
        <EditOutlined />
      </Button.IconButton>
      <Button.IconButton
        onClick={(e) => {
          e.stopPropagation();
        }}
        type="text"
      >
        <MoreOutlined />
      </Button.IconButton>
    </>
  );
  return (
    <Collapse defaultActiveKey={['1']} onChange={callback}>
      <Collapse.Panel header="折叠面板标题" key="1" extra={genExtra()}>
        <p>{text}</p>
        <p>{text}</p>
        <p>{text}</p>
      </Collapse.Panel>
    </Collapse>
  );
};
