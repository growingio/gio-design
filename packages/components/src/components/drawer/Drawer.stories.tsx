import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Button } from '@gio-design/components';
import { DrawerProps } from './interfaces';
import Drawer from './index';
import './style';

export default {
  title: 'Components/Basic/Drawer',
  component: Drawer,
} as Meta;

export const Default: Story<DrawerProps> = (args) => {
  const [visible, setVisible] = React.useState(false);
  const [showFooter, setShowFooter] = React.useState(true);

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
      <Drawer {...args} onClose={onClose} visible={visible} footer={showFooter ? renderFooter() : null} direction="rtl">
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
  placement: 'left',
  mask: true,
  maskClosable: true,
};
