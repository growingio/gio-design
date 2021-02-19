import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { MoreOutlined, UserOutlined } from '@gio-design/icons';
import { isNil, isUndefined } from 'lodash';
import Tooltip from '../tooltip';
import { AvatarProps } from './interfaces';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import composeRef from '../../utils/composeRef';

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>((props: AvatarProps, ref: React.Ref<HTMLSpanElement>) => {
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
    tooltipTitle,
    ...rest
  } = props;

  const [isImgExist, setIsImgExist] = useState<boolean>(src !== undefined);
  const [scale, setScale] = useState<number>(1);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const childrenRef = useRef<HTMLSpanElement>(null);
  const mergedRef = composeRef(ref, nodeRef);

  useEffect(() => {
    setIsImgExist(!isUndefined(src));
  }, [src]);

  useEffect(() => {
    if (nodeRef.current && childrenRef.current) {
      const nodeWidth = nodeRef.current.offsetWidth;
      const childrenWidth = childrenRef.current.offsetWidth;
      setScale(nodeWidth - 8 < childrenWidth ? (nodeWidth - 8) / childrenWidth : 1);
    }
  }, [userName, isImgExist]);

  const prefixCls = usePrefixCls('avatar', customizePrefixCls);
  const classString = classNames(className, prefixCls, {
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-df`]: size === 'default',
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-hg`]: size === 'huge',
  });
  const iconSizeMap: { [K: string]: string } = {
    small: '10',
    default: '14',
    large: '24',
    huge: '35',
  };

  const childrenStyle: React.CSSProperties = {
    transform: `scale(${scale}) translateX(-50%)`,
  };

  const renderMore = () => {
    if (droppable) {
      return (
        <div className={classNames({ [`${prefixCls}-droppable`]: droppable })}>
          <MoreOutlined size="16px" color="#FFFFFF" />
        </div>
      );
    }
    return null;
  };

  const renderAvatar = () => {
    if (!!src && isImgExist) {
      return <img alt="avatar" src={src} onError={() => setIsImgExist(false)} />;
    }
    if (!userName) {
      return (
        <span className={`${prefixCls}-default`}>
          <UserOutlined color="#fff" size={iconSizeMap[size]} />
        </span>
      );
    }
    if (typeof userName === 'string') {
      const prefixUserName = omit && typeof userName === 'string' ? userName.trim()[0]?.toUpperCase() : userName.trim();
      return (
        <span ref={childrenRef} style={childrenStyle} className={`${prefixCls}-string`}>
          {prefixUserName}
        </span>
      );
    }
    return null;
  };

  const renderTooltip = (child: React.ReactElement) =>
    displayTooltip ? (
      <Tooltip title={isNil(tooltipTitle) ? userName?.trim() : tooltipTitle} placement={placement}>
        {child}
      </Tooltip>
    ) : (
      child
    );

  return renderTooltip(
    // For Dropdown trigger will set Event on rest
    // eslint-disable-next-line react/jsx-props-no-spreading
    <span ref={mergedRef} className={classString} {...rest}>
      {renderMore()}
      {renderAvatar()}
    </span>
  );
});

export default Avatar;
