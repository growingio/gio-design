/**
 * title: 以 hook 方式获取上下文
 * desc: Modal.confirm 等函数式调用方法构造的 Modal 无法读取 ConfigContext 中的上下文信息。<br /> 因此提供了以 Modal.useModal 或直接引入 useModal 方式获取带有上下 ConfigContext 上下文信息的函数式调用 Modal。
 */

import React, { useContext } from 'react';
import { Modal, Button, ConfigContext } from '@gio-design/components';
import './useModal.less';

const buttonStyle = {
  marginRight: 10,
};

export default () => {
  const [modalFuncs, hookModal] = Modal.useModal();

  const handleConfirm = () => {
    modalFuncs.confirm({
      title: 'Confirm',
      content: 'Confirm content',
    });
  };

  const handleInfo = () => {
    modalFuncs.info({
      title: 'Info',
      content: 'Info content',
    });
  };

  const handleSuccess = () => {
    modalFuncs.success({
      title: 'Success',
      content: 'Success content',
    });
  };

  const handleWarn = () => {
    modalFuncs.warn({
      title: 'Warn',
      content: 'Warn content',
    });
  };

  const handleError = () => {
    modalFuncs.error({
      title: 'Error',
      content: 'Error content',
    });
  };

  const context = useContext(ConfigContext);

  return (
    <ConfigContext.Provider value={{ ...context, rootPrefixCls: 'custom' }}>
      <>
        <Button type="secondary" style={buttonStyle} onClick={() => handleConfirm()}>
          confirm
        </Button>
        <Button type="secondary" style={buttonStyle} onClick={() => handleInfo()}>
          Info
        </Button>
        <Button type="secondary" style={buttonStyle} onClick={() => handleSuccess()}>
          Success
        </Button>
        <Button type="secondary" style={buttonStyle} onClick={() => handleWarn()}>
          Warn
        </Button>
        <Button type="secondary" style={buttonStyle} onClick={() => handleError()}>
          Error
        </Button>
        {hookModal}
      </>
    </ConfigContext.Provider>
  );
};
