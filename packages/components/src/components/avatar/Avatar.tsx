import React, { useState, useEffect, useContext, useRef } from 'react';
import classNames from 'classnames';
import { AvatarProps } from './interface';
import { ConfigContext } from '../config-provider';

const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
  const { className, size = 'default', droppable = false, children, src, omit = true } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const [isImgExist, setIsImgExist] = useState<Boolean>(src !== undefined);
  const [scale, setScale] = useState<number>(1);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const childrenRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (nodeRef.current && childrenRef.current) {
      const nodeWidth = nodeRef.current.offsetWidth;
      const childrenWidth = childrenRef.current.offsetWidth;
      setScale(nodeWidth - 8 < childrenWidth ? (nodeWidth - 8) / childrenWidth : 1);
    }
  }, [children]);

  const prefixCls = getPrefixCls('avatar');
  const classString = classNames(className, prefixCls, {
    [`${prefixCls}-droppable`]: droppable,
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-df`]: size === 'default',
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-hg`]: size === 'huge',
  });

  const childrenStyle: React.CSSProperties = {
    transform: `scale(${scale}) translateX(-50%)`,
  };

  const renderAvatar = () => {
    if (!!src && isImgExist) {
      return <img src={src} onError={() => setIsImgExist(false)} />;
    }
    if (children !== undefined && typeof children === 'string') {
      const firstChar = children.trim()[0];
      const prefixUserName =
        omit && typeof children === 'string'
          ? /[a-z]/.test(firstChar)
            ? firstChar.toUpperCase()
            : firstChar
          : children;
      return (
        <span ref={childrenRef} style={childrenStyle}>
          {prefixUserName}
        </span>
      );
    }
    return null;
  };
  return (
    <span ref={nodeRef} className={classString}>
      {renderAvatar()}
    </span>
  );
};

export default Avatar;
