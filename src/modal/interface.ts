/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, ReactNode } from 'react';
import { ButtonProps, ButtonType } from '../button';

export type TModalSize = 'normal' | 'fixed' | 'full';

type getContainerFunc = () => HTMLElement;

export interface ConfirmModalProps extends IModalStaticFuncConfig {
  afterClose?: () => void;
  close: (...args: any[]) => void;
  visible?: boolean;
}

export interface ModalProps {
  /** 对话框是否可见 */
  visible?: boolean;
  /** 确定按钮 loading */
  confirmLoading?: boolean;
  /** 标题 */
  title?: React.ReactNode | string;
  /** 是否显示右上角的关闭按钮 */
  closable?: boolean;
  /** 点击确定回调 */
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调 */
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  afterClose?: () => void;
  /** 垂直居中 */
  centered?: boolean;
  /** 宽度 */
  width?: string | number;
  /** 底部内容 */
  footer?: React.ReactNode;
  /** 确认按钮文字 */
  okText?: React.ReactNode;
  /** 确认按钮类型 */
  okType?: ButtonType;
  /** 取消按钮文字 */
  cancelText?: React.ReactNode;
  /** 点击蒙层是否允许关闭 */
  maskClosable?: boolean;
  /** 强制渲染 Modal */
  forceRender?: boolean;
  /**
   * 模态框大小
   * @param `normal` 随内容大小变化而变化
   * @param `fixed` 固定 500px
   * @param `full` 全屏
   * @default `fixed`
   */
  size?: TModalSize;
  okButtonProps?: ButtonProps;
  closeButtonProps?: ButtonProps;
  destroyOnClose?: boolean;
  style?: React.CSSProperties;
  wrapClassName?: string;
  maskTransitionName?: string;
  transitionName?: string;
  className?: string;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  zIndex?: number;
  bodyStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  mask?: boolean;
  keyboard?: boolean;
  prefixCls?: string;
  closeIcon?: React.ReactNode;
  modalRender?: (node: React.ReactNode) => React.ReactNode;
  focusTriggerAfterClose?: boolean;
}

export interface IModalStaticFuncConfig extends Omit<ModalProps, 'visible' | 'onOk' | 'onClose'> {
  content?: ReactNode;
  onOk?: (...args: any[]) => void | Promise<unknown>;
  onClose?: (...args: any[]) => void | Promise<unknown>;
}
export type ConfigUpdate = IModalStaticFuncConfig | ((prevConfig: IModalStaticFuncConfig) => IModalStaticFuncConfig);

export interface IModalStaticFuncReturn {
  destroy: () => void;
  update: (config: ConfigUpdate) => void;
}

export interface IModalStaticFunc {
  (config: IModalStaticFuncConfig): IModalStaticFuncReturn;
}

export interface IModalStaticFunctions {
  open: IModalStaticFunc;
}

export type THookModalRef = IModalStaticFuncReturn;

export interface IHookModalProps {
  config: IModalStaticFuncConfig;
  afterClose: () => void;
}

export interface IUseModal {
  (): [IModalStaticFunctions, ReactElement];
}
