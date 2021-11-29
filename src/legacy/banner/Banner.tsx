import React, { useState } from 'react';
import { CloseOutlined } from '@gio-design/icons';
import className from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { BannerProps } from './interface';

const Banner: React.FC<BannerProps> = (props: BannerProps) => {
  const { type = 'normal', content, closeable = true, onClose, button, prefixCls: customizePrefixCls } = props;
  const [visible, setVisible] = useState(true);
  const prefixCls = usePrefixCls('banner-legacy', customizePrefixCls);
  const onCloseBanner = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <div
      className={className(
        `${prefixCls}`,
        `${prefixCls}-${type}`,
        closeable && `${prefixCls}-closeable`,
        !visible && `${prefixCls}-close`
      )}
    >
      <div className={className(`${prefixCls}-content`, button && `${prefixCls}-content-button`)}>{content}</div>
      <div className={className(`${prefixCls}-button`)}>{button}</div>
      <div
        className={className(`${prefixCls}-closeIcon`)}
        style={{ display: closeable ? 'flex' : 'none' }}
        onClick={onCloseBanner}
        aria-hidden="true"
      >
        <CloseOutlined />
      </div>
    </div>
  );
};

export default Banner;
