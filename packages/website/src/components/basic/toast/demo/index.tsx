import * as React from 'react';
import { Toast, Button } from '@gio-design/components';
import '@gio-design/components/es/components/toast/style/index.css';

const SuccessMessage = () => (
  <span>
    操作成功！
    <a style={{ color: '#3867f4', textDecoration: 'underline' }}>去看看</a>
  </span>
);

export default () => {
  const handleSuccess = () => {
    Toast.success('操作成功！');
  };

  const handleFail = () => {
    Toast.error('操作失败！');
  };

  const handleWarn = () => {
    Toast.warning('警告，怪兽即将入侵！');
  };

  const handleSuccessDiy = () => {
    Toast.success(<SuccessMessage />);
  };

  const handleInfo = () => {
    Toast.info({ content: '这是一条温馨提示~', key: 'updatable' });
    setTimeout(() => Toast.success({ content: 'Loaded', key: 'updatable' }), 1000);
  };

  return (
    <div>
      <Button style={{ marginRight: 10 }} onClick={handleSuccess}>
        成功
      </Button>
      <Button style={{ marginRight: 10 }} onClick={handleFail}>
        失败
      </Button>
      <Button style={{ marginRight: 10 }} onClick={handleWarn}>
        警告
      </Button>
      <Button style={{ marginRight: 10 }} onClick={handleInfo}>
        提示
      </Button>
      <div style={{ marginTop: 10 }}>
        <Button onClick={handleSuccessDiy}>成功，去看看</Button>
      </div>
    </div>
  );
};
