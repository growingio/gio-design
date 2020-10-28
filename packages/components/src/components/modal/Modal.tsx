import React, { useContext } from 'react';
import classnames from 'classnames';
import RcDialog from 'rc-dialog';
import { Close } from '@gio-design/icons';
import { ButtonProps } from '../button';
import { ConfigContext } from '../config-provider';
import { IModalProps } from './interface';
import ModalPrefixClsContext from './ModalContext';
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
}: IModalProps) => {
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
  if ('footer' in restProps && (restProps.footer === false || restProps.footer === null)) {
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
      try {
        await Promise.resolve(onOk(e));
        if (closeAfterOk) {
          onClose?.(e);
        }
      } catch (error) {
        const err = error ?? 'onOk 执行 reject 或抛出错误。';
        console.error(err);
      }
    }
  };

  const handleClose = (e: React.SyntheticEvent<HTMLElement, Event>) => {
    if (!pending) {
      onClose?.(e as React.MouseEvent<HTMLElement, MouseEvent>);
    }
  };

  return (
    <ModalPrefixClsContext.Provider value={prefix}>
      <RcDialog
        keyboard
        {...restProps}
        maskClosable={!useFooter}
        onClose={handleClose}
        transitionName="zoom"
        maskTransitionName="fade"
        prefixCls={prefix}
        className={modalCls}
        wrapClassName={wrapperCls}
        closable={title !== false}
        closeIcon={<Close className={closeCls} />}
        title={title !== false && <Title onBack={onBack} useBack={useBack} title={title} />}
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
