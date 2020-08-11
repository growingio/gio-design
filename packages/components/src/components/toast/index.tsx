import * as React from 'react';
import classNames from 'classnames';
import Notification from 'rc-notification';
import { CheckCircleFilled, CloseCircleFilled, WarningFilled, InformationFilled } from '@gio-design/icons';

let defaultDuration = 2;
let defaultTop: number;
let messageInstance: any;
let key = 1;
let prefixCls = 'gio-toast';
let transitionName = 'move-up';
let getContainer: () => HTMLElement;
let maxCount: number;
let rtl = false;

function getMessageInstance(callback: (i: any) => void) {
  if (messageInstance) {
    callback(messageInstance);
    return;
  }
  Notification.newInstance(
    {
      prefixCls,
      transitionName,
      style: { top: defaultTop }, // 覆盖原来的样式
      getContainer,
      maxCount,
    },
    (instance: any) => {
      if (messageInstance) {
        callback(messageInstance);
        return;
      }
      messageInstance = instance;
      callback(instance);
    }
  );
}

type NoticeType = 'success' | 'error' | 'warning' | 'info';

export type ThenableArgument = (val: any) => void;

export interface MessageType {
  then: (fill: ThenableArgument, reject: ThenableArgument) => Promise<void>;
  promise: Promise<void>;
  (): void;
}

export interface ArgsProps {
  content: React.ReactNode;
  duration: number | null;
  type: NoticeType;
  onClose?: () => void;
  icon?: React.ReactNode;
  key?: string | number;
  style?: React.CSSProperties;
  className?: string;
}

const iconStyle: React.CSSProperties = {
  width: '16px',
  height: '16px',
  verticalAlign: 'text-bottom',
};

const iconMap = {
  success: (
    <span className={`${prefixCls}-icon`}>
      <CheckCircleFilled color="#008a56" style={iconStyle} />
    </span>
  ),
  error: (
    <span className={`${prefixCls}-icon`}>
      <CloseCircleFilled color="#f21300" style={iconStyle} />
    </span>
  ),
  warning: (
    <span className={`${prefixCls}-icon`}>
      <WarningFilled color="#f8af48" style={iconStyle} />
    </span>
  ),
  info: (
    <span className={`${prefixCls}-icon`}>
      <InformationFilled color="#3867f4" style={iconStyle} />
    </span>
  ),
};

function notice(args: ArgsProps): MessageType {
  const duration = args.duration !== undefined ? args.duration : defaultDuration;
  const icon = iconMap[args.type] || null;

  const messageClass = classNames(`${prefixCls}-custom-content`, {
    [`${prefixCls}-${args.type}`]: args.type,
    [`${prefixCls}-rtl`]: rtl === true,
  });

  const target = args.key || key++;
  const closePromise = new Promise((resolve) => {
    const callback = () => {
      if (typeof args.onClose === 'function') {
        args.onClose();
      }
      return resolve(true);
    };
    getMessageInstance((instance) => {
      instance.notice({
        key: target,
        duration,
        style: args.style || {},
        className: args.className,
        content: (
          <div className={messageClass}>
            {args.icon || icon}
            <span>{args.content}</span>
          </div>
        ),
        onClose: callback,
      });
    });
  });
  const result: any = () => {
    if (messageInstance) {
      messageInstance.removeNotice(target);
    }
  };
  result.then = (filled: ThenableArgument, rejected: ThenableArgument) => closePromise.then(filled, rejected);
  result.promise = closePromise;
  return result;
}

type ConfigContent = React.ReactNode | string;
type ConfigDuration = number | (() => void);
type JointContent = ConfigContent | ArgsProps;
export type ConfigOnClose = () => void;

function isArgsProps(content: JointContent): content is ArgsProps {
  return Object.prototype.toString.call(content) === '[object Object]' && !!(content as ArgsProps).content;
}

export interface ConfigOptions {
  top?: number;
  duration?: number;
  prefixCls?: string;
  getContainer?: () => HTMLElement;
  transitionName?: string;
  maxCount?: number;
  rtl?: boolean;
}

const api: any = {
  open: notice,
  config(options: ConfigOptions) {
    if (options.top !== undefined) {
      defaultTop = options.top;
      messageInstance = null; // delete messageInstance for new defaultTop
    }
    if (options.duration !== undefined) {
      defaultDuration = options.duration;
    }
    if (options.prefixCls !== undefined) {
      prefixCls = options.prefixCls;
    }
    if (options.getContainer !== undefined) {
      getContainer = options.getContainer;
    }
    if (options.transitionName !== undefined) {
      transitionName = options.transitionName;
      messageInstance = null; // delete messageInstance for new transitionName
    }
    if (options.maxCount !== undefined) {
      maxCount = options.maxCount;
      messageInstance = null;
    }
    if (options.rtl !== undefined) {
      rtl = options.rtl;
    }
  },
  destroy() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  },
};

['success', 'warning', 'error', 'info'].forEach((type) => {
  api[type] = (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => {
    if (isArgsProps(content)) {
      return api.open({ ...content, type });
    }

    if (typeof duration === 'function') {
      onClose = duration; // eslint-disable-line
      duration = undefined; // eslint-disable-line
    }

    return api.open({ content, duration, type, onClose });
  };
});

export interface MessageApi {
  success: (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => MessageType;
  error: (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => MessageType;
  warning: (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => MessageType;
  info: (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => MessageType;
  open: (args: ArgsProps) => MessageType;
  config: (options: ConfigOptions) => void;
  destroy: () => void;
}

export default api as MessageApi;
