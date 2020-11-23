import { NotificationInstance as RCNotificationInstance } from 'rc-notification/lib/Notification';

export type NotificationInstance = RCNotificationInstance | null;

export interface IHookNotificationInstance {
  [key: string]: NotificationInstance;
}

export type TToastType = 'success' | 'error' | 'warning' | 'info';

export type ThenableArgument = (val: any) => void;

export type ConfigContent = React.ReactNode | string;

export type ConfigDuration = number | (() => void);

export type JointContent = ConfigContent | ArgsProps;

export type ConfigOnClose = () => void;

export interface ConfigOptions {
  top?: number;
  duration?: number;
  prefixCls?: string;
  getContainer?: () => HTMLElement;
  transitionName?: string;
  maxCount?: number;
  rtl?: boolean;
}

export interface ArgsProps extends ConfigOptions {
  content: React.ReactNode;
  type: TToastType;
  onClose?: () => void;
  icon?: React.ReactNode;
  key?: string | number;
  style?: React.CSSProperties;
  className?: string;
}

export interface IToastNotice {
  then: (fill: ThenableArgument, reject: ThenableArgument) => Promise<void>;
  promise: Promise<void>;
  (): void;
}

export interface IToastApi {
  success: (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => IToastNotice;
  error: (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => IToastNotice;
  warning: (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => IToastNotice;
  info: (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => IToastNotice;
  open: (args: ArgsProps) => IToastNotice;
  config: (options: ConfigOptions) => void;
  destroy: () => void;
  useToast: () => [];
}
