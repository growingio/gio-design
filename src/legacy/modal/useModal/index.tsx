import React, { createRef } from 'react';
import usePatchElement from '../../../utils/hooks/usePatchElement';
import { withConfirm, withInfo, withSuccess, withWarn, withError } from '../callout';
import HookModal from './HookModal';
import { IUseModal, IModalStaticFuncConfig, THookModalRef, IModalStaticFuncReturn } from '../interface';

let modalId = 0;

const useModal: IUseModal = () => {
  const [modalElements, patchModalElements] = usePatchElement();

  const getHookCalloutFnc = (withConfig: (config: IModalStaticFuncConfig) => IModalStaticFuncConfig) =>
    function hookCallout(config: IModalStaticFuncConfig): IModalStaticFuncReturn {
      modalId += 1;

      const hookModalRef = createRef<THookModalRef>();

      let handleClose: () => void;
      const modal = (
        <HookModal
          key={`hook-modal-${modalId}`}
          ref={hookModalRef}
          config={withConfig(config)}
          afterClose={() => handleClose()}
        />
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
      confirm: getHookCalloutFnc(withConfirm),
      info: getHookCalloutFnc(withInfo),
      success: getHookCalloutFnc(withSuccess),
      warn: getHookCalloutFnc(withWarn),
      error: getHookCalloutFnc(withError),
    },
    <>{modalElements}</>,
  ];
};

export default useModal;
