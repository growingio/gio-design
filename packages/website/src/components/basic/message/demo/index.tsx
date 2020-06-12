import * as React from 'react';
import { Toast, Button } from '@gio-design/components';
import '@gio-design/components/es/components/button/custom-style.css';
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

  return (
    <div>
      <Button onClick={handleSuccess}>成功</Button>
      <br />
      <br />
      <Button onClick={handleFail}>失败</Button>
      <br />
      <br />
      <Button onClick={handleWarn}>警告</Button>
      <br />
      <br />
      <Button onClick={handleSuccessDiy}>成功，去看看</Button>
    </div>
  );
};
