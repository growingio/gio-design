import React from 'react';
import classNames from 'classnames';
import Notification from 'rc-notification';
import { defaultRootPrefixCls } from '../config-provider';
import { getIconMap } from './toastIcons';
import createUseToast from './useToast';
import {
  ConfigOptions,
  ArgsProps,
  IToastApi,
  ThenableArgument,
  JointContent,
  ConfigDuration,
  ConfigOnClose,
  IToastNotice,
  NotificationInstance,
} from './interface';

export { ConfigOptions as ToastConfigOptions, TToastType as ToastType } from './interface';

let key = 1;
let toastInstance: NotificationInstance;
let defaultDuration = 2;
let defaultTop: number;
let defaultPrefixCls = defaultRootPrefixCls;
let defaultTransitionName = 'move-up';
let defaultGetContainer: () => HTMLElement;
let defaultMaxCount: number;
let defaultRtl = false;

function getToastInstance(args: ArgsProps, callback: (i: any) => void) {
  const {
    transitionName = defaultTransitionName,
    style = { top: defaultTop }, // 覆盖原来的样式
    getContainer = defaultGetContainer,
    maxCount = defaultMaxCount,
  } = args;

  const outerPrefixCls = args.prefixCls ?? defaultPrefixCls;
  const prefixCls = `${outerPrefixCls}-toast-legacy`;

  if (toastInstance) {
    callback({ instance: toastInstance, prefixCls });
    return;
  }

  Notification.newInstance(
    {
      prefixCls,
      transitionName,
      style, // 覆盖原来的样式
      getContainer,
      maxCount,
    },
    (instance: any) => {
      toastInstance = instance;
      callback({ instance, prefixCls });
    }
  );
}

const getNoticeProps = (args: ArgsProps, prefixCls: string) => {
  const duration = args.duration !== undefined ? args.duration : defaultDuration;
  const icon = getIconMap(prefixCls)[args.type] || null;

  const toastClassName = classNames(`${prefixCls}-custom-content`, {
    [`${prefixCls}-${args.type}`]: args.type,
    [`${prefixCls}-rtl`]: defaultRtl === true,
  });

  return {
    key: args.key,
    duration,
    style: args.style || {},
    className: args.className,
    content: (
      <div className={toastClassName}>
        {args.icon || icon}
        <span>{args.content}</span>
      </div>
    ),
    onClose: args.onClose,
  };
};

function notice(args: ArgsProps): IToastNotice {
  // eslint-disable-next-line no-plusplus
  const target = args.key || key++;

  const closePromise = new Promise((resolve) => {
    const callback = () => {
      if (typeof args.onClose === 'function') {
        args.onClose();
      }
      return resolve(true);
    };
    getToastInstance(args, ({ instance, prefixCls }) => {
      instance.notice(
        getNoticeProps(
          {
            ...args,
            key: target,
            onClose: callback,
          },
          prefixCls
        )
      );
    });
  });
  const result: any = () => {
    if (toastInstance) {
      toastInstance.removeNotice(target);
    }
  };
  result.then = (filled: ThenableArgument, rejected: ThenableArgument) => closePromise.then(filled, rejected);
  result.promise = closePromise;
  return result;
}

export function isArgsProps(content: JointContent): content is ArgsProps {
  return Object.prototype.toString.call(content) === '[object Object]' && !!(content as ArgsProps).content;
}

const api: any = {
  open: notice,
  config(options: ConfigOptions) {
    if (options.top !== undefined) {
      defaultTop = options.top;
      toastInstance = null; // delete toastInstance for new defaultTop
    }
    if (options.duration !== undefined) {
      defaultDuration = options.duration;
    }
    if (options.prefixCls !== undefined) {
      defaultPrefixCls = options.prefixCls;
    }
    if (options.getContainer !== undefined) {
      defaultGetContainer = options.getContainer;
    }
    if (options.transitionName !== undefined) {
      defaultTransitionName = options.transitionName;
      toastInstance = null; // delete toastInstance for new transitionName
    }
    if (options.maxCount !== undefined) {
      defaultMaxCount = options.maxCount;
      toastInstance = null;
    }
    if (options.rtl !== undefined) {
      defaultRtl = options.rtl;
    }
  },
  destroy() {
    if (toastInstance) {
      toastInstance.destroy();
      toastInstance = null;
    }
  },
  useToast: createUseToast(getToastInstance, getNoticeProps),
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

    return api.open({
      content,
      duration,
      type,
      onClose,
    });
  };
});

export default api as IToastApi;
