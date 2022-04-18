/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { MoreOutlined, EditOutlined, RightOutlined } from '@gio-design/icons';
import Docs from './CollapsePage';
import Collapse from '../index';
import Button from '../../button';

import '../style';

export default {
  title: 'Upgraded/Collapse',
  component: Collapse,
  subcomponents: { 'Collapse.Panel': Collapse.Panel },
  parameters: {
    docs: {
      page: Docs,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=7034%3A72443',
      allowFullscreen: true,
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
  className: 'cc',
  onChange: action('onchange'),
};

export const Secondmenu = () => (
  <Collapse>
    <Collapse.Panel header="一级菜单标题" key="1">
      <Collapse>
        <Collapse.Panel header="二级菜单标题" key="2">
          <p>{text}</p>
          <p>{text}</p>
          <p>{text}</p>
        </Collapse.Panel>
      </Collapse>
    </Collapse.Panel>
    <Collapse.Panel header="一级菜单标题" key="1">
      <Collapse bordered={false}>
        <Collapse.Panel header="二级菜单标题" key="2">
          <p>{text}</p>
          <p>{text}</p>
          <p>{text}</p>
        </Collapse.Panel>
      </Collapse>
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
    <Collapse expandIcon={() => <RightOutlined size="14px" />}>
      <Collapse.Panel header="折叠面板标题" key="1" extra={genExtra()}>
        <p>{text}</p>
        <p>{text}</p>
        <p>{text}</p>
      </Collapse.Panel>
    </Collapse>
  );
};

export const Accordion = () => (
  <Collapse accordion>
    <Collapse.Panel header="手风琴效果标题1" key="1">
      <p>{text}</p>
      <p>{text}</p>
      <p>{text}</p>
    </Collapse.Panel>
    <Collapse.Panel header="手风琴效果标题2" key="2">
      <p>{text}</p>
      <p>{text}</p>
      <p>{text}</p>
    </Collapse.Panel>
    <Collapse.Panel header="手风琴效果标题3" key="3">
      <p>{text}</p>
      <p>{text}</p>
      <p>{text}</p>
    </Collapse.Panel>
  </Collapse>
);

export const Bordered = () => (
  <Collapse bordered={false}>
    <Collapse.Panel header="无边框标题1" key="1">
      <p>{text}</p>
      <p>{text}</p>
      <p>{text}</p>
    </Collapse.Panel>
    <Collapse.Panel header="无边框标题2" key="2">
      <p>{text}</p>
      <p>{text}</p>
      <p>{text}</p>
    </Collapse.Panel>
    <Collapse.Panel header="无边框标题3" key="3">
      <p>{text}</p>
      <p>{text}</p>
      <p>{text}</p>
    </Collapse.Panel>
  </Collapse>
);
