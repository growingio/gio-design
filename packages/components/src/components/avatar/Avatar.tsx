import React, { useState, useEffect, useContext, useRef } from 'react';
import classNames from 'classnames';
import { More } from '@gio-design/icons';
import Tooltip from '../tooltip';
import { AvatarProps } from './interface';
import { ConfigContext } from '../config-provider';

const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
  const {
    className,
    size = 'default',
    droppable = false,
    children: userName,
    src,
    omit = true,
    displayTooltip = false,
    prefixCls: customizePrefixCls,
    placement = 'bottom',
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const [isImgExist, setIsImgExist] = useState<boolean>(src !== undefined);
  const [scale, setScale] = useState<number>(1);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const childrenRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (nodeRef.current && childrenRef.current) {
      const nodeWidth = nodeRef.current.offsetWidth;
      const childrenWidth = childrenRef.current.offsetWidth;
      setScale(nodeWidth - 8 < childrenWidth ? (nodeWidth - 8) / childrenWidth : 1);
    }
  }, [userName]);

  const prefixCls = getPrefixCls('avatar', customizePrefixCls);
  const classString = classNames(className, prefixCls, {
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-df`]: size === 'default',
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-hg`]: size === 'huge',
  });

  const childrenStyle: React.CSSProperties = {
    transform: `scale(${scale})`,
  };

  const renderMore = () => {
    if (droppable) {
      return (
        <div className={classNames({ [`${prefixCls}-droppable`]: droppable })}>
          <More size="16px" color="#FFFFFF" />
        </div>
      );
    }
    return null;
  };

  const renderAvatar = () => {
    if (!!src && isImgExist) {
      return <img alt="avatar" src={src} onError={() => setIsImgExist(false)} />;
    }
    if (userName !== undefined && typeof userName === 'string') {
      const prefixUserName = omit && typeof userName === 'string' ? userName.trim()[0] : userName.trim();
      return (
        <span ref={childrenRef} style={childrenStyle}>
          {prefixUserName}
        </span>
      );
    }
    return null;
  };

  const renderTooltip = (child: React.ReactElement) =>
    displayTooltip ? (
      <Tooltip title={userName?.trim()} placement={placement}>
        {child}
      </Tooltip>
    ) : (
      child
    );

  return renderTooltip(
    <span ref={nodeRef} className={classString}>
      {renderMore()}
      {renderAvatar()}
    </span>
  );
};

export default Avatar;
