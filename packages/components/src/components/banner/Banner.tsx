import React, { useState, useContext } from 'react';
import { Close } from '@gio-design/icons';
import className from 'classnames';
import { ConfigContext } from '../config-provider';
import { BannerProps } from './interface';

const Banner: React.FC<BannerProps> = (props: BannerProps) => {
  const {
    type = 'normal', content, closeable = true, onClose, button, prefixCls: customizePrefixCls,
  } = props;
  const [visible, setVisible] = useState(true);
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('banner', customizePrefixCls);
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
        !visible && `${prefixCls}-close`,
      )}
    >
      <div className={className(`${prefixCls}-content`, button && `${prefixCls}-content-button`)}>
        {' '}
        {content}
      </div>
      <div className={className(`${prefixCls}-button`)}>{button}</div>
      <div
        className={className(`${prefixCls}-closeIcon`)}
        style={{ display: closeable ? 'block' : 'none' }}
        onClick={onCloseBanner}
      >
        <Close />
      </div>
    </div>
  );
};

export default Banner;
