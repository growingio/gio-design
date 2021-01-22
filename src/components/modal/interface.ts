import { ReactElement, ReactNode, CSSProperties } from 'react';
import { ButtonProps } from '../button';

export type IStringOrHtmlElement = string | HTMLElement;

export type TModalSize = 'small' | 'middle' | 'full';

export type TStepNoParamFn = () => void | Promise<unknown>;

export interface ITitleProps {
  title?: ReactNode;
  useBack?: boolean;
  onBack?: TStepNoParamFn;
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
  onOk?: (e: React.MouseEvent<HTMLElement>) => void | Promise<unknown>;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void | Promise<unknown>;
  useOk: boolean;
  useClose: boolean;
}

export interface IModalProps extends ITitleProps, Omit<IFooterProps, 'useOk' | 'useClose'> {
  /**
   替代 `Modal` 组件 `class` 的 `gio-modal` 前缀
   */
  prefixCls?: string;
  /**
   `Modal` 根节点 `className`
   */
  className?: string;
  /**
   `Modal` `wrap` 的 `className`
   */
  wrapClassName?: string;
  /**
   `Modal` 根节点的样式
   */
  style?: CSSProperties;
  /**
   `Modal` `wrap` 内联样式
   */
  wrapStyle?: Record<string, unknown>;
  /**
   `Modal` `body` 内联样式
   */
  bodyStyle?: Record<string, unknown>;
  /**
   `Modal` `mask` 内联样式
   */
  maskStyle?: Record<string, unknown>;
  /**
   `Modal` `body` `props`
   */
  bodyProps?: Record<string, unknown>;
  /**
   `Modal` `mask` `props`
   */
  maskProps?: Record<string, unknown>;
  /**
   `Modal wrap props`
   */
  wrapProps?: Record<string, unknown>;
  /**
   	`Modal` 层级
   */
  zIndex?: number;
  /**
   `Modal` 右上角关闭 `Icon`
   */
  closeIcon?: ReactNode;
  /**
   被包裹的元素
   */
  children?: ReactNode;
  /**
   是否支持按 ESC 关闭 Modal
   */
  keyboard?: boolean;
  /**
   `Modal` 的尺寸
   */
  size?: TModalSize;
  /**
   `Modal` 是否可见
   */
  visible?: boolean;
  /**
   是否不使用 `Footer` 中的关闭按钮
   */
  dropCloseButton?: boolean;
  /**
   组件 `pending` 状态
   */
  pending?: boolean;
  /**
   执行 `close` 后紧接着执行的操作
   */
  afterClose?: () => void;
  /**
   `Modal` `onOk` 执行后是否执行 `onClose`
   */
  closeAfterOk?: boolean;
  /**
   `Modal` `onClose` 执行后是否卸载 `Modal` 组件
   */
  destroyOnClose?: boolean;
  getContainer?: IStringOrHtmlElement | (() => IStringOrHtmlElement) | false;
  forceRender?: boolean;
  focusTriggerAfterClose?: boolean;
}

export type TStepChange = (nextStep: string) => void;

export interface IStepModalNodeRenderProps {
  step: IStep;
  push: TStepChange;
  pop: TStepNoParamFn;
}

export type TModalNodeRender = ReactNode | ((renderProps: IStepModalNodeRenderProps) => ReactNode);

export interface IStep {
  /**
   当前 `Step` 的唯一标识
   */
  key: string;
  /**
   当前 Step 的上一步
   */
  return: string | null;
  /**
   多分支路径下，当前步骤是否是默认的下一步
   */
  firstNextInTier?: boolean;
  /**
   多分支路径下的出口标识
   */
  wayout?: boolean;
  /**
   下一步 回调
   */
  onNext?: TStepNoParamFn;
  /**
   上一步 回调
   */
  onBack?: TStepNoParamFn;
  /**
   当前步骤 `Modal` 的 `Title`
   */
  title?: TModalNodeRender;
  /**
   当前步骤 `Modal` 的 `Body`
   */
  content?: TModalNodeRender;
  /**
   当前步骤 `Modal` 的 `Footer`
   */
  footer?: TModalNodeRender;
  /**
   除了 `OkButton` 及 `CloseButton` 外的自定义 `Footer`
   */
  additionalFooter?: ReactNode;
  /**
   传递给下一步按钮的 props
   */
  nextButtonProps?: ButtonProps;
  /**
   传递给取消按钮的 `props` 元素
   */
  cancelButtonProps?: ButtonProps;
  /**
   传递给上一步按钮的 `props` 元素
    @deprecated  
   */
  backButtonProps?: ButtonProps;
  /**
   传递给下一步按钮的显示文案
   */
  nextText?: string;
  /**
   传递给取消按钮的显示文案
   */
  cancelText?: string;
  /**
   传递给上一步按钮的显示文案
    @deprecated  
   */
  backText?: string;
}

export interface IStepInner extends IStep {
  next?: string[];
}

export interface IStepMap {
  [key: string]: IStepInner;
}

export interface IStepModalProps extends Omit<IModalProps, 'pending'> {
  steps?: IStep[];
  onStepChange?: (step: string) => void;
}

export type TModalStaticFuncType = 'confirm' | 'info' | 'success' | 'warn' | 'error';

export interface IModalStaticFuncConfig extends Omit<IModalProps, 'visible' | 'onOk' | 'onClose' | 'pending'> {
  content?: ReactNode;
  // 函数式调用类型
  type?: TModalStaticFuncType;
  // 函数式调用时的前缀 icon
  icon?: ReactNode;
  // 是否显示取消按钮
  showClose?: boolean;
  onOk?: () => void | Promise<unknown>;
  onClose?: () => void | Promise<unknown>;
}

export interface IModalStaticFuncReturn {
  destroy: () => void;
  update: (config: IModalStaticFuncConfig) => void;
}

export interface ICalloutModalProps extends IModalStaticFuncConfig {
  visible: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  close: (...args: any[]) => void;
  afterClose?: () => void;
}

export interface IModalStaticFunc {
  (config: IModalStaticFuncConfig): IModalStaticFuncReturn;
}

export interface IModalStaticFunctions {
  info: IModalStaticFunc;
  success: IModalStaticFunc;
  error: IModalStaticFunc;
  warn: IModalStaticFunc;
  confirm: IModalStaticFunc;
}

export type THookModalRef = IModalStaticFuncReturn;

export interface IHookModalProps {
  config: IModalStaticFuncConfig;
  afterClose: () => void;
}

export interface IUseModal {
  (): [IModalStaticFunctions, ReactElement];
}

export interface IModalConfigs {
  prefixCls?: string;
}
