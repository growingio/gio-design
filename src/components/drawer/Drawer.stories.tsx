import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Button from '../button';
import { DrawerProps } from './interfaces';
import Drawer from '.';
import './style';
import Docs from './Drawer.mdx';

export default {
  title: 'Basic Components/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

export const Default: Story<DrawerProps> = (args) => {
  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const renderFooter = () => (
    <div
      style={{
        textAlign: 'right',
      }}
    >
      <Button onClick={onClose} type="secondary" style={{ marginRight: 8 }}>
        取消
      </Button>
      <Button onClick={onClose} type="primary">
        保存
      </Button>
    </div>
  );

  return (
    <>
      <div>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </div>
      <Drawer {...args} onClose={onClose} visible={visible} footer={renderFooter()}>
        <div style={{ width: '100%', height: '100%', padding: '16px', border: '1px dashed #DCDFED' }}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </div>
      </Drawer>
    </>
  );
};

Default.args = {
  title: 'default drawer',
  placement: 'right',
  mask: true,
  maskClosable: true,
  direction: 'rtl',
};
