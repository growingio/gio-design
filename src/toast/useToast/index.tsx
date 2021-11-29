import React, { useRef, ReactElement } from 'react';
import useRCNotification from 'rc-notification/lib/useNotification';
import {
  NotificationInstance as RCNotificationInstance,
  NoticeContent as RCNoticeContent,
  HolderReadyCallback as RCHolderReadyCallback,
} from 'rc-notification/lib/Notification';
import { ConfigConsumer, ConfigConsumerProps } from '../../config-provider';
import { isArgsProps } from '..';
import { ArgsProps, JointContent, ConfigDuration, ConfigOnClose, IToastMethods } from '../interface';

const createUseToast = (
  getToastInstance: (args: ArgsProps, callback: (i: any) => void) => void,
  getNoticeProps: (args: ArgsProps, prefixCls: string) => RCNoticeContent
): (() => [IToastMethods, ReactElement]) => {
  const useToast = (): [IToastMethods, ReactElement] => {
    let rootPrefixCls: ConfigConsumerProps['rootPrefixCls'];

    let innerInstance: RCNotificationInstance | null = null;
    const proxy = {
      add: (noticeProps: RCNoticeContent, holderCallback?: RCHolderReadyCallback) => {
        innerInstance?.component.add(noticeProps, holderCallback);
      },
    } as any;
    const [hookNotify, notificationElement] = useRCNotification(proxy);

    const notify = (args: ArgsProps) => {
      const { prefixCls: customPrefixCls } = args;
      const mergedPrefixCls = customPrefixCls ?? rootPrefixCls;
      getToastInstance(
        {
          ...args,
          prefixCls: mergedPrefixCls,
        },
        ({ instance, prefixCls }) => {
          innerInstance = instance;
          hookNotify(getNoticeProps(args, prefixCls));
        }
      );
    };

    const hookApiRef = useRef<any>({});

    hookApiRef.current.open = notify;

    ['success', 'warning', 'error', 'info'].forEach((type: string) => {
      hookApiRef.current[type] = (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => {
        if (isArgsProps(content)) {
          return hookApiRef.current.open({ ...content, type });
        }

        if (typeof duration === 'function') {
          // eslint-disable-next-line no-param-reassign
          onClose = duration;
          // eslint-disable-next-line no-param-reassign
          duration = undefined;
        }

        return hookApiRef.current.open({
          content,
          duration,
          type,
          onClose,
        });
      };
    });

    return [
      hookApiRef.current,
      <ConfigConsumer>
        {(context: ConfigConsumerProps) => {
          ({ rootPrefixCls } = context);
          return notificationElement;
        }}
      </ConfigConsumer>,
    ];
  };

  return useToast;
};

export default createUseToast;
