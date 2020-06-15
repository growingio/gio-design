import * as React from 'react';
import { Toast } from '@gio-design/components';
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
    Toast.info('This is info message.');
  };

  return (
    <div>
      <a onClick={handleSuccess}>success</a>
      <br />
      <br />
      <a onClick={handleFail}>error</a>
      <br />
      <br />
      <a onClick={handleWarn}>warning</a>
      <br />
      <br />
      <a onClick={handleInfo}>info</a>
      <br />
      <br />
      <a onClick={handleSuccessDiy}>成功，去看看</a>
    </div>
  );
};
