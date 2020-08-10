import * as React from 'react';
import { Drawer, Button, Radio } from '@gio-design/components';
import '@gio-design/components/es/components/drawer/style/index.less';

export default () => {
  const [visible, setVisible] = React.useState(false);
  const [closable, setClosable] = React.useState(false);
  const [showFooter, setShowFooter] = React.useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const changeClosable = (e: any) => {
    setClosable(e.target.value);
  };
  const changeShowFooter = (e: any) => {
    setShowFooter(e.target.value);
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
      <div style={{ marginBottom: '10px' }}>
        <Radio.Group value={closable} onChange={changeClosable}>
          <Radio value={true}>显示关闭按钮</Radio>
          <Radio value={false}>不显示关闭按钮</Radio>
        </Radio.Group>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <Radio.Group value={showFooter} onChange={changeShowFooter}>
          <Radio value={true}>显示底部按钮</Radio>
          <Radio value={false}>不显示底部按钮</Radio>
        </Radio.Group>
      </div>
      <div>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </div>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={closable}
        onClose={onClose}
        visible={visible}
        mask={true}
        footer={showFooter ? renderFooter() : null}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
