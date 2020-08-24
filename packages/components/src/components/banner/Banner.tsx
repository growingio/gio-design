import React, { useState, ReactNode, useContext } from 'react';
import useHover from '../../utils/hooks/useHover';
import { Close } from '@gio-design/icons';
import { ConfigContext } from '../config-provider';
import className from 'classnames';

export interface BannerProps {
  type?: 'normal' | 'alert';
  content?: string | ReactNode;
  closeable?: boolean;
  onClose?: () => void;
  button?: ReactNode;
  prefixCls?: string;
}

const Banner: React.FC<BannerProps> = (props: BannerProps) => {
  const { type = 'normal', content, closeable = true, onClose, button, prefixCls: customizePrefixCls } = props;
  const [visible, setVisible] = useState(true);
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('banner', customizePrefixCls);
  const onCloseBanner = () => {
    setVisible(false);
    onClose?.();
  };
  const [isHover, hoverHandlers] = useHover();
  const hoverAlertCls = isHover && type !== 'normal' ? `${prefixCls}-${type}-hover` : ' ';

  return (
    <div className={className(`${prefixCls}`, `${prefixCls}-${type}`, hoverAlertCls, !visible && `${prefixCls}-close`)}>
      <div className={className(`${prefixCls}-content`, button && `${prefixCls}-content-button`)}> {content}</div>
      <div className={className(`${prefixCls}-button`)}>{button}</div>
      <div
        className={className(`${prefixCls}-closeIcon`)}
        style={{ display: closeable ? 'block' : 'none' }}
        onClick={onCloseBanner}
      >
        <Close {...hoverHandlers} />
      </div>
    </div>
  );
};

export default Banner;
