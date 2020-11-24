import React, { useContext } from 'react';
import { Toast, Button, ConfigContext } from '@gio-design/components';
import './useToast.less';

const SuccessMessage = () => (
  <span>
    操作成功！
    <a style={{ color: '#3867f4', textDecoration: 'underline' }}>去看看</a>
  </span>
);

export default () => {
  const context = useContext(ConfigContext);
  const [hootToast, toastHolder] = Toast.useToast();

  const handleSuccess = () => {
    hootToast.success('操作成功！');
  };

  const handleFail = () => {
    hootToast.error('操作失败！');
  };

  const handleWarn = () => {
    hootToast.warning('警告，怪兽即将入侵！');
  };

  const handleSuccessDiy = () => {
    hootToast.success(<SuccessMessage />);
  };

  const handleInfo = () => {
    hootToast.info('这是一条温馨提示~');
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
