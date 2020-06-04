import React from 'react';
import notification from 'rc-notification';
import GIOIcon from '../icon';
import './index.less';

// const notifier = notification.newInstance({
//   prefixCls: 'gio-greeting',
//   transitionName: 'move-up',
//   delay: 3000
// }, () => {});

let notifier: any = null;
notification.newInstance(
  {
    prefixCls: 'gio-greeting',
    transitionName: 'move-up',
    delay: 3000,
  },
  (n: any) => (notifier = n)
);

const notice = (content: string) => {
  const key = Date.now();

  return new Promise((resolve) => {
    const close = () => {
      notifier.removeNotice(key);
      resolve('close');
    };
    notifier.notice({
      key,
      onClose: close,
      content: (
        <div>
          <span className='gio-greeting-notice-icon'>
            <GIOIcon name='gicon-coffee' size='large' fill='#fff' />
          </span>
          <span className='gio-greeting-tip'>{content}</span>
        </div>
      ),
    });
  });
};

const info = (content: string) => notice(content);
const destory = () => {
  if (notifier) {
    notifier.destroy();
  }
};
const greeting = { info, destory };

export default greeting;
