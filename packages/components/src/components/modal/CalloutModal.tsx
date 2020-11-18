/* eslint-disable no-useless-return */
import React, { useState } from 'react';
import classnames from 'classnames';
import Modal from './Modal';
import { ICalloutModalProps } from './interface';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import Button from '../button';

const CalloutModal: React.FC<ICalloutModalProps> = ({
  visible,
  close,
  prefixCls: customPrefixCls,
  className,
  wrapClassName,
  icon,
  type,
  title,
  content,
  okText,
  okButtonProps,
  closeText,
  closeButtonProps,
  onOk,
  onClose,
  showClose,
  ...restProps
}: ICalloutModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const prefixCls = usePrefixCls('modal', customPrefixCls);

  const calloutPrefixCls = `${prefixCls}-callout`;
  const calloutModalClassName = classnames(className, calloutPrefixCls, `${calloutPrefixCls}--${type}`);
  const calloutModalWrapClassName = classnames(wrapClassName, `${calloutPrefixCls}__wrapper`);
  const iconCls = classnames(`${calloutPrefixCls}__icon`, `${calloutPrefixCls}__icon--${type}`);

  const calloutClose = () => close({ visible: false });

  const handleExecResult = (execResult: void | PromiseLike<any>) => {
    if (!execResult || !execResult.then) {
      return;
    }

    setLoading(true);
    execResult.then(
      () => {
        calloutClose();
      },
      (e: Error) => {
        console.error(e);
        setLoading(false);
      }
    );
  };

  const handleOk = () => {
    if (!onOk) {
      calloutClose();
      return;
    }
    const okResult = onOk();
    handleExecResult(okResult);
  };

  const handleClose = () => {
    if (!onClose) {
      calloutClose();
      return;
    }
    const closeResult = onClose();
    handleExecResult(closeResult);
  };

  return (
    <Modal
      {...restProps}
      visible={visible}
      pending={loading}
      prefixCls={prefixCls}
      className={calloutModalClassName}
      wrapClassName={calloutModalWrapClassName}
      title={false}
      footer={false}
      onClose={calloutClose}
    >
      <div className={`${calloutPrefixCls}__container`}>
        <div className={`${calloutPrefixCls}__main`}>
          <span className={iconCls}>{icon}</span>
          <div className={`${calloutPrefixCls}__infos`}>
            {!title ? null : <div className={`${calloutPrefixCls}__title`}>{title}</div>}
            <div className={`${calloutPrefixCls}__content`}>{content}</div>
          </div>
        </div>
        <div className={`${calloutPrefixCls}__footer`}>
          {showClose && (
            <Button
              type="secondary"
              loading={loading}
              disabled={loading}
              className={`${calloutPrefixCls}__btn`}
              onClick={handleClose}
              {...closeButtonProps}
            >
              {closeText}
            </Button>
          )}
          <Button
            type="primary"
            loading={loading}
            disabled={loading}
            className={`${calloutPrefixCls}__btn`}
            onClick={handleOk}
            {...okButtonProps}
          >
            {okText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CalloutModal;
