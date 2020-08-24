import { ReactNode, CSSProperties } from 'react';
import { ButtonProps } from '../button';

export type IStringOrHtmlElement = string | HTMLElement;

export type TModalSize = 'small' | 'middle' | 'full';

export interface ITitleProps {
  title?: ReactNode;
  useBack?: boolean;
  onBack?: () => void;
}

export interface IFooterProps {
  // 可以自定义除了 okButton 以及 closeBtn 外的组件
  additionalFooter?: ReactNode;
  // 完全自定义 Footer 区域
  footer?: ReactNode;
  okButtonProps?: ButtonProps;
  closeButtonProps?: ButtonProps;
  okText?: string;
  closeText?: string;
  onOk?: ((e: React.MouseEvent<HTMLElement>) => void) | ((e: React.MouseEvent<HTMLElement>) => Promise<any>);
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  useOk: boolean;
  useClose: boolean;
}

export interface IModalProps extends ITitleProps, Omit<IFooterProps, 'useOk' | 'useClose'> {
  prefixCls?: string;
  className?: string;
  wrapClassName?: string;
  style?: CSSProperties;
  wrapStyle?: {};
  bodyStyle?: {};
  maskStyle?: {};
  bodyProps?: any;
  maskProps?: any;
  wrapProps?: any;
  zIndex?: number;
  closeIcon?: ReactNode;
  children?: any;
  // 按 ESC 键是否可以关闭 Modal
  keyboard?: boolean;
  // Modal 的尺寸
  size?: TModalSize;
  // Modal 是否可见
  visible?: boolean;
  // 弃用 Footer 中的 close Button
  dropCloseButton?: boolean;
  // 组件 pending 状态
  pending?: boolean;
  // 执行 close 后紧接着执行的操作
  afterClose?: () => any;
  // 点击 Ok 后是否要紧接着执行 close
  closeAfterOk?: boolean;
  // 是否在 Modal 关闭后销毁
  destroyOnClose?: boolean;
  getContainer?: IStringOrHtmlElement | (() => IStringOrHtmlElement) | false;
  forceRender?: boolean;
  focusTriggerAfterClose?: boolean;
}

export interface IStep {
  // 当前步骤 Modal 的 Title
  title?: ReactNode;
  // 当前步骤 Modal 的 Body
  content?: ReactNode;
  // 当前步骤 Modal 的 Footer
  footer?: ReactNode;
  // 下一步
  onNext?: () => void;
  // 上一步
  onBack?: () => void;
}

export interface IStepModalProps extends IModalProps {
  steps?: IStep[];
}
