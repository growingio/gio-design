import React from 'react';
import classNames from 'classnames';
import { isUndefined } from 'lodash';
import { CardProps } from './interfaces';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import Meta from './meta';

const Card = ({
  prefixCls: customizePrefixCls,
  className,
  style,
  title,
  footer,
  children,
  disabled = false,
  clickable = true,
  onClick,
}: CardProps) => {
  const prefixCls = usePrefixCls('card', customizePrefixCls);

  const renderTitle = () => 
    isUndefined(title) ? undefined :
    <div className={`${prefixCls}-title`}>{title}</div>
  
  const renderFooter = () => 
    isUndefined(footer) ? undefined :
    <div className={`${prefixCls}-footer`}>{footer}</div>
  
  return (
    <div
      className={classNames(prefixCls, className, {
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-clickable`]: clickable
      })}
      style={style}
      onClick={() => disabled || ( clickable && onClick?.())}
      aria-hidden="true"
    >
      {renderTitle()}
      {children}
      {renderFooter()}
    </div>
  );
}

Card.Meta = Meta;
export default Card;
