import React, { useContext } from 'react';
import classnames from 'classnames';
import RcDialog from 'rc-dialog';
import { Close } from '@gio-design/icons';
import { ButtonProps } from '../button';
import { ConfigContext } from '../config-provider';
import { IModalProps } from './interface';
import { ModalPrefixClsContext } from './ModalContext';
import Title from './Title';
import Footer from './Footer';

const Modal: React.FC<IModalProps> = ({
  prefixCls: customPrefixCls,
  size = 'small',
  className,
  wrapClassName,
  useBack,
  title,
  additionalFooter,
  onBack,
  closeAfterOk,
  dropCloseButton,
  okText,
  closeText,
  okButtonProps,
  closeButtonProps,
  onOk,
  onClose,
  pending,
  ...restProps
}) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefix = getPrefixCls('modal', customPrefixCls);
  const modalCls = classnames(className, {
    [`${prefix}--small`]: size === 'small',
    [`${prefix}--middle`]: size === 'middle',
    [`${prefix}--full`]: size === 'full',
  });
  const wrapperCls = classnames(wrapClassName, `${prefix}__wrapper`);
  const closeCls = classnames(`${prefix}__close`, {
    [`${prefix}__close--disabled`]: pending,
  });

  const useOkBtn = !!onOk && typeof onOk === 'function';
  let useFooter = useOkBtn || !dropCloseButton || !!additionalFooter;
  if (restProps === false || restProps === null || ('footer' in restProps && restProps === undefined)) {
    useFooter = false;
  }
  const okBtnProps: ButtonProps = {
    loading: pending,
    disabled: pending,
    ...okButtonProps,
  };
  const closeBtnProps: ButtonProps = {
    disabled: pending,
    ...closeButtonProps,
  };

  const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
    if (onOk && typeof onOk === 'function') {
      e.persist();
      await Promise.resolve(onOk(e));
      if (closeAfterOk) {
        onClose?.(e);
      }
    }
  };

  const handleClose = (e: any) => {
    if (!pending) {
      onClose?.(e);
    }
  };

  return (
    <ModalPrefixClsContext.Provider value={prefix}>
      <RcDialog
        keyboard={true}
        {...restProps}
        maskClosable={!useFooter}
        onClose={handleClose}
        transitionName="zoom"
        maskTransitionName="fade"
        prefixCls={prefix}
        className={modalCls}
        wrapClassName={wrapperCls}
        closeIcon={<Close className={closeCls} />}
        title={<Title onBack={onBack} useBack={useBack} title={title} />}
        footer={
          useFooter && (
            <Footer
              okText={okText}
              closeText={closeText}
              okButtonProps={okBtnProps}
              closeButtonProps={closeBtnProps}
              footer={restProps.footer}
              additionalFooter={additionalFooter}
              onOk={handleOk}
              onClose={handleClose}
              useOk={useOkBtn}
              useClose={!dropCloseButton}
            />
          )
        }
      />
    </ModalPrefixClsContext.Provider>
  );
};

export default Modal;
