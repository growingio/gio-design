import GioModal from './Modal';
import StepModal from './StepModal';
import callout, { withConfirm, withInfo, withSuccess, withWarn, withError } from './callout';
import { IModalStaticFuncConfig, IModalStaticFunctions } from './interface';

export {
  IModalProps,
  IStepModalProps,
  TModalSize,
  IStep,
  TStepChange,
  IModalStaticFuncConfig,
  IModalStaticFuncReturn,
  TModalStaticFuncType,
  IModalStaticFunc,
} from './interface';

export { StepModal };

export type TModal = typeof GioModal & IModalStaticFunctions;

const Modal = GioModal as TModal;

Modal.confirm = (config: IModalStaticFuncConfig) => callout(withConfirm(config));

Modal.info = (config: IModalStaticFuncConfig) => callout(withInfo(config));

Modal.success = (config: IModalStaticFuncConfig) => callout(withSuccess(config));

Modal.warn = (config: IModalStaticFuncConfig) => callout(withWarn(config));

Modal.error = (config: IModalStaticFuncConfig) => callout(withError(config));

export default Modal;
