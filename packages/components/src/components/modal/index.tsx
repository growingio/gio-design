import * as React from 'react';
import { Modal as AntModal } from 'antd';
import Button from '../button';
import Icon from '../icon';
import cn from 'classnames';

import 'antd/lib/modal/style/index.css';
import './index.less';

export interface ModalProps {
  visible: boolean;
  closable?: boolean;
  className?: string;
  width?: number;
  title: string | React.ReactNode;
  okText?: string;
  cancelText?: string;
  disableOk?: boolean;
  showCancel?: boolean;
  onCancel?: (e?: React.MouseEvent<any>) => void;
  onOk?: () => void | Promise<any>;
  footer?: React.ReactNode;
  children: React.ReactNode;
  confirmLoading?: boolean;
  wrapClassName?: string;
  okButtonType?: 'primary' | undefined;
  cancelButtonType?: 'primary' | undefined;
  maskClosable?: boolean;
  backable?: boolean;
  onBack?: () => void;
  onVisibleChange?: (visible: boolean) => void;
  overflowY?: 'scroll' | 'visible'; // 如果内容高于屏幕容器的高度，scroll为屏幕内滚动，visible为溢出屏幕
  minWidth?: number;
  size?: 'large' | undefined;
  okButtonClassName?: string;
  style?: React.CSSProperties;
  zIndex?: number;
  getContainer?: () => HTMLElement;
  locale?: string;
  transitionName: string;
  maskTransitionName: string;
  mask: boolean;
  height?: number;
}

const Modal: React.FC<ModalProps> = ({
  minWidth,
  style = {},
  backable,
  onBack,
  okButtonClassName,
  visible = false,
  closable = true,
  className = '',
  title = '',
  okText = '',
  cancelText = '',
  disableOk = false,
  showCancel = true,
  confirmLoading = false,
  overflowY = 'visible',
  ...props
}) => {
  const locale = props.locale;
  const footer = (
    <div className='gio-modal-footer'>
      {showCancel && (
        <Button size={props.size} type={props.cancelButtonType} onClick={props.onCancel}>
          {cancelText ? cancelText : locale === 'en' ? 'Cancel' : '取消'}
        </Button>
      )}
      <Button
        size={props.size}
        type={props.okButtonType || 'primary'}
        loading={confirmLoading}
        disabled={disableOk ? true : false}
        onClick={props.onOk}
        className={okButtonClassName}
      >
        {okText ? okText : locale === 'en' ? 'Confirm' : '确定'}
      </Button>
    </div>
  );
  const cls = cn('gio-modal', className, {
    'gio-modal--overflow-y-scroll': overflowY === 'scroll',
  });
  return (
    <AntModal
      {...props}
      visible={visible}
      closable={closable}
      title={title}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={confirmLoading}
      footer={props.footer !== undefined ? props.footer : footer}
      className={cls}
      style={{
        minWidth,
        ...style,
      }}
    >
      <div className='gio-modal__step-container'>
        {backable && (
          <div className='gio-modal__step-back'>
            <Icon name='gicon-arrow-left' onClick={onBack} />
          </div>
        )}
        <div className='gio-modal__step-body'>{props.children}</div>
      </div>
    </AntModal>
  );
};

export default Modal;
