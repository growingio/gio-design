import * as React from 'react';
import notification from 'rc-notification';
import Link from '../link';
import Icon from '@gio-design/icon';

import './custom-style.less';

const DURATION: {
  SUCCESS: number;
  ERROR: number;
  HASACTION: number;
  WARNING: number;
} = {
  SUCCESS: 1,
  ERROR: 2,
  HASACTION: 3,
  WARNING: 2,
};

interface INameToValueMap<T> {
  [key: string]: T;
}

const iconMap: INameToValueMap<string> = {
  success: 'check-circle',
  error: 'close-circle',
  warning: 'warning-circle',
};

type NoticeType = 'success' | 'error' | 'warning';

// 由于 gatsby 与 frontend-app 的 webpack 版本不兼容，在 gatsby 升级之前暂时采用这种写法
const newInstance = notification.__esModule ? notification.default.newInstance : notification.newInstance;

let notifier: any = null;
newInstance(
  {
    prefixCls: 'gio-message',
    transitionName: 'move-up',
  },
  (n: any) => (notifier = n)
);

const notice = (content: string, type: NoticeType, customDuration?: number, shouldRenderCloseBtn = false) => {
  const key = Date.now();
  let duration = DURATION[type.toUpperCase() as 'SUCCESS' | 'ERROR' | 'WARNING'];
  let shouldRenderCloseButton = shouldRenderCloseBtn;
  const result: number[] = [];
  for (let i = 0; i < content.length; i++) {
    if (content[i] === '#') {
      result.push(i);
    }
  }
  const hasAction = result.length === 2;

  return new Promise((resolve) => {
    const close = () => {
      notifier.removeNotice(key);
      resolve('close');
    };

    const action = () => {
      notifier.removeNotice(key);
      resolve('action');
    };

    let actionContent: React.ReactElement<any> | null = null;
    if (hasAction) {
      duration = DURATION.HASACTION;
      shouldRenderCloseButton = true;
      actionContent = (
        <span>
          <span>{content.substring(0, result[0])}</span>
          {/* <a className='gio-message-action' onClick={action}>{content.substring(result[0] + 1, result[1])}</a>*/}
          <Link inverse className='gio-message-action' onClick={action}>
            {content.substring(result[0] + 1, result[1])}
          </Link>
          <span>{content.substring(result[1] + 1)}</span>
        </span>
      );
    }
    if (customDuration !== undefined) {
      duration = customDuration;
    }
    notifier.notice({
      key,
      closable: shouldRenderCloseButton,
      onClose: close,
      duration,
      content: (
        <div className={`gio-message-inner gio-message-${type}`}>
          <span className='gio-message-notice-icon'>
            <Icon type={iconMap[type]} width={18} height={18} />
          </span>
          {hasAction ? actionContent : content}
          {shouldRenderCloseButton ? (
            <span className='gio-message-notice-close' onClick={close}>
              <Icon type='close' />
            </span>
          ) : null}
        </div>
      ),
    });
  });
};

const success = (content: string, duration?: number, shouldRenderCloseBtn?: boolean) =>
  notice(content, 'success', duration, shouldRenderCloseBtn);
const error = (content: string, duration?: number, shouldRenderCloseBtn?: boolean) =>
  notice(content, 'error', duration, shouldRenderCloseBtn);
const warning = (content: string, duration?: number, shouldRenderCloseBtn?: boolean) =>
  notice(content, 'warning', duration, shouldRenderCloseBtn);
const destory = () => {
  if (notifier) {
    notifier.destroy();
  }
};
const message = { success, error, destory, warning };

export default message;
