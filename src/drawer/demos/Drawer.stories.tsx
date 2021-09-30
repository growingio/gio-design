import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Button from '../../components/button';
import Input from '../../components/input';
import { DrawerProps } from '../interfaces';
import Drawer from '..';
import '../style';
import Docs from './DrawerPage';

export default {
  title: 'Data Display/Drawer',
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
  onPrev: undefined,
  onNext: undefined,
};

export const ChangeContent: Story<DrawerProps> = (args) => {
  const [visible, setVisible] = React.useState(false);
  const [current, setCurrent] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const content = {
    title: `title${current}`,
    footer: `footer${current}`,
    children: (
      <>
        <Input value={`content${current}`} />
      </>
    ),
  };

  return (
    <>
      <div>
        <Button type="primary" onClick={() => setVisible(true)}>
          Open
        </Button>
      </div>
      <Drawer
        {...args}
        {...content}
        onClose={() => setVisible(false)}
        visible={visible}
        onPrev={() => setCurrent((value) => value - 1)}
        prevDisabled={current === 1}
        onNext={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setCurrent((value) => value + 1);
          }, 1000);
        }}
        nextDisabled={current === 10}
        loading={loading}
      />
    </>
  );
};

ChangeContent.args = {
  placement: 'right',
  mask: true,
  maskClosable: true,
};

export const ParentDrawer: Story<DrawerProps> = (args) => {
  const [parentVisible, setParentVisible] = React.useState(false);
  const [childVisible, setChildVisible] = React.useState(false);

  return (
    <>
      <div>
        <Button type="primary" onClick={() => setParentVisible(true)}>
          Open
        </Button>
      </div>
      <Drawer {...args} title="title" onClose={() => setParentVisible(false)} visible={parentVisible}>
        <Button type="primary" onClick={() => setChildVisible(true)}>
          Open child
        </Button>
        <Drawer
          // {...args}
          onClose={() => setChildVisible(false)}
          visible={childVisible}
        >
          child content
        </Drawer>
      </Drawer>
    </>
  );
};

ParentDrawer.args = {
  placement: 'right',
  mask: true,
  maskClosable: true,
  onPrev: undefined,
  onNext: undefined,
};
