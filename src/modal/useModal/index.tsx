import React, { createRef } from 'react';
import usePatchElement from '../../utils/hooks/usePatchElement';
import HookModal from './hookModal';
import { IUseModal, IModalStaticFuncConfig, THookModalRef } from '../interface';

let modalId = 0;

const useModal: IUseModal = () => {
  const [modalElements, patchModalElements] = usePatchElement();

  const getHookCalloutFnc = (config: IModalStaticFuncConfig) => {
    modalId += 1;

    const hookModalRef = createRef<THookModalRef>();

    let handleClose: () => void;
    const modal = (
      <HookModal key={`hook-modal-${modalId}`} ref={hookModalRef} config={config} afterClose={() => handleClose()} />
    );
    handleClose = patchModalElements(modal);

    return {
      destroy: () => {
        hookModalRef.current?.destroy();
      },
      update: (newConfig: IModalStaticFuncConfig) => {
        hookModalRef.current?.update(newConfig);
      },
    };
  };

  return [
    {
      open: getHookCalloutFnc,
    },
    <>{modalElements}</>,
  ];
};

export default useModal;
