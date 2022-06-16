import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ConfirmModal from '../ConfirmModal';
import { IHookModalProps, THookModalRef, IModalStaticFuncConfig } from '../interface';

const defaultConfig = { okText: '确定', closeText: '取消' };

const HookModal: React.ForwardRefRenderFunction<THookModalRef, IHookModalProps> = ({ config, afterClose }, ref) => {
  const [visible, setVisible] = useState(true);
  const [mergedConfig, setMergedConfig] = useState({ ...defaultConfig, ...config });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClose = (...args: any[]) => {
    setVisible(false);
    const triggerCancel = args.some((param) => param && param.triggerCancel);
    if (mergedConfig.onClose && triggerCancel) {
      mergedConfig.onClose();
    }
  };
  useImperativeHandle(ref, () => ({
    destroy: handleClose,
    update: (newConfig: IModalStaticFuncConfig) => {
      setMergedConfig((originMergedConfig) => ({
        ...originMergedConfig,
        ...newConfig,
      }));
    },
  }));

  return <ConfirmModal visible={visible} close={handleClose} {...mergedConfig} afterClose={afterClose} />;
};

export default forwardRef(HookModal);
