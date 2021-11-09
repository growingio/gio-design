import React from 'react';
import classnames from 'classnames';
import { useLocale, usePrefixCls } from '@gio-design/utils';
import RcDialog from 'rc-dialog';
import { CloseOutlined } from '@gio-design/icons';
import Button, { IconButton } from '../button';
import { ModalProps, ModalLocale } from './interface';

const Modal: React.FC<ModalProps> = ({
  prefixCls: customPrefixCls,
  size = 'normal',
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
  const prefix = usePrefixCls('modal-new', customPrefixCls);
  const modalCls = classnames(className, {
    [`${prefix}-normal`]: size === 'normal',
    [`${prefix}-fixed`]: size === 'fixed',
    [`${prefix}-full`]: size === 'full',
  });
  const wrapperCls = classnames(wrapClassName, `${prefix}__wrapper`);
  const closeCls = classnames(`${prefix}__close`);

  const { closeText, okText } = useLocale<ModalLocale>('Modal');

  const renderFooter = () => {
    const cls = classnames(`${prefix}__footer`);
    const closeBtnCls = classnames(`${prefix}__btn-close`, closeButtonProps?.className ?? '');
    const okBtnCls = classnames(`${prefix}__btn-ok`, okButtonProps?.className ?? '');
    const useOkBtn = !!onOk && typeof onOk === 'function';

    return (
      <div className={cls}>
        {restProps.footer || (
          <div>
            <Button
              type="secondary"
              {...closeButtonProps}
              style={{ padding: '7px 13px' }}
              className={closeBtnCls}
              onClick={onClose}
            >
              {customizeCloseText ?? closeText ?? '取消'}
            </Button>
            {useOkBtn && (
              <Button
                type="primary"
                {...okButtonProps}
                loading={confirmLoading}
                className={okBtnCls}
                style={{ padding: '7px 13px' }}
                onClick={onOk}
              >
                {customizeOKText ?? okText ?? '确定'}
              </Button>
            )}
          </div>
        )}
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
      closeIcon={
        closeIcon || (
          <IconButton type="text" size="small">
            <CloseOutlined className={closeCls} />
          </IconButton>
        )
      }
      title={title}
      footer={renderFooter()}
      {...restProps}
    />
  );
};

export default Modal;
