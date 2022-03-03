import React from 'react';
import classnames from 'classnames';
import { useLocale, usePrefixCls } from '@gio-design/utils';
import RcDialog from 'rc-dialog';
import { CloseOutlined } from '@gio-design/icons';
import { omit } from 'lodash';
import Button from '../button';
import { ModalProps } from './interface';
import defaultLocale from '../locales/zh-CN';

const Modal: React.FC<ModalProps> = ({
  prefixCls: customPrefixCls,
  size = 'fixed',
  className,
  wrapClassName,
  title,
  confirmLoading,
  okText: customizeOKText,
  cancelText: customizeCloseText,
  okButtonProps,
  closeButtonProps,
  onOk,
  onClose,
  closeIcon,
  maskClosable = false,
  ...restProps
}: ModalProps) => {
  const prefix = usePrefixCls('modal', customPrefixCls);
  const modalCls = classnames(className, {
    [`${prefix}-${size}`]: ['full', 'normal', 'fixed'].includes(size),
  });
  const wrapperCls = classnames(wrapClassName, `${prefix}__wrapper`);
  const closeCls = classnames(`${prefix}__close`);

  const { closeText, okText } = useLocale<typeof defaultLocale>('Modal') || defaultLocale;

  const renderDefaultFooter = () => {
    const cls = classnames(`${prefix}__footer`);
    const closeBtnCls = classnames(`${prefix}__btn-close`, closeButtonProps?.className ?? '');
    const okBtnCls = classnames(`${prefix}__btn-ok`, okButtonProps?.className ?? '');
    const useOkBtn = !!onOk && typeof onOk === 'function';

    return (
      <div className={cls}>
        <div>
          <Button
            type="secondary"
            style={{ padding: '7px 13px', ...closeButtonProps?.style }}
            className={closeBtnCls}
            onClick={(e) => {
              onClose?.(e);
              closeButtonProps?.onClick?.(e);
            }}
            {...omit(closeButtonProps, 'style', 'className', 'onClick')}
          >
            {customizeCloseText ?? closeText ?? '取消'}
          </Button>
          {useOkBtn && (
            <Button
              type="primary"
              loading={confirmLoading ?? okButtonProps?.loading}
              className={okBtnCls}
              style={{ padding: '7px 13px', ...okButtonProps?.style }}
              onClick={(e) => {
                onOk?.(e);
                okButtonProps?.onClick?.(e);
              }}
              {...omit(okButtonProps, 'style', 'onClick', 'className', 'loading')}
            >
              {customizeOKText ?? okText ?? '确定'}
            </Button>
          )}
        </div>
      </div>
    );
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClose && typeof onClose === 'function') {
      onClose?.(e);
    }
  };

  return (
    <RcDialog
      data-testid="modal"
      keyboard
      maskClosable={maskClosable}
      onClose={handleClose}
      prefixCls={prefix}
      className={modalCls}
      wrapClassName={wrapperCls}
      closable={title !== false}
      closeIcon={closeIcon || <CloseOutlined className={closeCls} />}
      title={title}
      footer={renderDefaultFooter()}
      {...restProps}
    />
  );
};

export default Modal;
