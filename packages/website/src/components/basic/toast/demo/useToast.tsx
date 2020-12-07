import React, { useContext } from 'react';
import { Toast, Button, ConfigContext } from '@gio-design/components';
import './useToast.less';

const SuccessMessage = () => (
  <span>
    操作成功！
    <a
      href="https://growingio.design/"
      target="_blank"
      rel="noreferrer"
      style={{ color: '#3867f4', textDecoration: 'underline' }}
    >
      去看看
    </a>
  </span>
);

export default () => {
  const context = useContext(ConfigContext);
  const [hookToast, toastHolder] = Toast.useToast();

  const handleSuccess = () => {
    hookToast.success('操作成功！');
  };

  const handleFail = () => {
    hookToast.error('操作失败！');
  };

  const handleWarn = () => {
    hookToast.warning('警告，怪兽即将入侵！');
  };

  const handleSuccessDiy = () => {
    hookToast.success(<SuccessMessage />);
  };

  const handleInfo = () => {
    hookToast.info('这是一条温馨提示~');
  };

  return (
    <ConfigContext.Provider value={{ ...context, rootPrefixCls: 'hook' }}>
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
      {toastHolder}
    </ConfigContext.Provider>
  );
};
