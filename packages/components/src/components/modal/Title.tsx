import React, { useContext } from 'react';
import classnames from 'classnames';
import { LeftOutlined } from '@gio-design/icons';
import { ITitleProps } from './interface';
import { ModalPrefixClsContext } from './ModalContext';

const Title: React.FC<ITitleProps> = ({ onBack, title, useBack }) => {
  const prefix = useContext(ModalPrefixClsContext);
  const titleCls = classnames(`${prefix}__title`, {
    [`${prefix}__step-title`]: useBack,
  });
  const backCls = classnames(`${prefix}__btn-back`);

  const handleBack = () => onBack?.();

  return (
    <>
      {useBack && (
        <span className={backCls} onClick={handleBack}>
          <LeftOutlined />
        </span>
      )}
      <div className={titleCls}>{title}</div>
    </>
  );
};

export default Title;
