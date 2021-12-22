/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { MoreOutlined, EditOutlined, RightOutlined } from '@gio-design/icons'
import Docs from './CollapsePage';
import Collapse,{Panel} from '../index';
import { IconButton } from '../../button';

import '../style';

export default {
  title: 'Upgraded/Collapse',
  component: Collapse,
  subcomponents: { Panel },
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

const genExtra = () => (
  <>
    <IconButton onClick={(e) => { e.stopPropagation() }}
      type="text">
      <EditOutlined />
    </IconButton>
    <IconButton onClick={(e) => { e.stopPropagation() }}
      type="text">
      <MoreOutlined />
    </IconButton>
  </>
);
const text = '哈哈哈嘿嘿嘿嘻嘻嘻'
const callback = (key: any) => {
  console.log(key);
}

const Template: Story = () => (
  <div>
    <Collapse defaultActiveKey={['2']} onChange={callback}>
      <Panel header="折叠面板标题" key="1" extra={genExtra()}>
        <p>{text}</p>
        <p>{text}</p>
        <p>{text}</p>
      </Panel>
      <Panel header="折叠面板标题" key="2">
        <p>{text}</p>
        <Collapse expandIcon={() => <RightOutlined />} onChange={callback}>
          <Panel header="折叠面板标题" key="1" extra={genExtra()}>
            <p>{text}</p>
            <p>{text}</p>
            <p>{text}</p>
          </Panel>
        </Collapse>
      </Panel>
    </Collapse>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  className: 'cc',
  onChange: action('onchange'),
};
