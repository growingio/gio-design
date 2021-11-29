import OriginalModal from './Modal';
import open, { destroyFns } from './open';
import useModal from './useModal';

import { ModalFuncProps, IUseModal, IModalStaticFunctions } from './interface';

type ModalType = typeof OriginalModal &
  IModalStaticFunctions & {
    destroyAll: () => void;
    useModal: IUseModal;
  };

const Modal = OriginalModal as ModalType;

Modal.open = function confirmFn(props: ModalFuncProps) {
  return open(props);
};

Modal.useModal = useModal;

Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

export type { ModalProps } from './interface';

export default Modal;
