import React, { forwardRef, useImperativeHandle, useState } from 'react';
import CalloutModal from '../CalloutModal';
import { IHookModalProps, THookModalRef, IModalStaticFuncConfig } from '../interface';

const defaultConfig = { okText: '确定', closeText: '取消' };

const HookModal: React.ForwardRefRenderFunction<THookModalRef, IHookModalProps> = ({ config, afterClose }, ref) => {
  const [visible, setVisible] = useState(true);
  const [mergedConfig, setMergedConfig] = useState({ ...defaultConfig, ...config });

  const handleClose = () => setVisible(false);

  useImperativeHandle(ref, () => ({
    destroy: handleClose,
    update: (newConfig: IModalStaticFuncConfig) => {
      setMergedConfig((originMergedConfig) => ({
        ...originMergedConfig,
        ...newConfig,
      }));
    },
  }));

  return <CalloutModal visible={visible} close={handleClose} {...mergedConfig} afterClose={afterClose} />;
};

export default forwardRef(HookModal);
