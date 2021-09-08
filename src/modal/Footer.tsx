import React, { useContext } from 'react';
import classnames from 'classnames';
import Button from '../components/button';
import { IFooterProps } from './interface';
import ModalPrefixClsContext from './ModalContext';

const Footer: React.FC<IFooterProps> = ({
  footer,
  additionalFooter,
  okText,
  closeText,
  okButtonProps,
  closeButtonProps,
  useOk,
  useClose,
  onOk,
  onClose,
}: IFooterProps) => {
  const prefix = useContext(ModalPrefixClsContext);
  const cls = classnames(`${prefix}__footer`);
  const additionCls = classnames(`${prefix}__footer-additional`);
  const closeBtnCls = classnames(`${prefix}__btn-close`, closeButtonProps?.className ?? '');
  const okBtnCls = classnames(`${prefix}__btn-ok`, okButtonProps?.className ?? '');

  if (footer) {
    return <div className={cls}>{footer}</div>;
  }

  return (
    <div className={cls}>
      <div className={additionCls}>{additionalFooter}</div>
      <div>
        {useClose && (
          <Button type="secondary" {...closeButtonProps} className={closeBtnCls} onClick={onClose}>
            {closeText ?? '取消'}
          </Button>
        )}
        {useOk && (
          <Button type="primary" {...okButtonProps} className={okBtnCls} onClick={onOk}>
            {okText ?? '确定'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Footer;
