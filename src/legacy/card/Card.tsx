import React from 'react';
import classNames from 'classnames';
import { isUndefined } from 'lodash';
import { usePrefixCls } from '@gio-design/utils';
import { CardProps } from './interfaces';
import Meta from './Meta';

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
  ...rest
}: CardProps) => {
  const prefixCls = usePrefixCls('card', customizePrefixCls);

  const renderTitle = () => (isUndefined(title) ? undefined : <div className={`${prefixCls}-title`}>{title}</div>);

  const renderFooter = () => (isUndefined(footer) ? undefined : <div className={`${prefixCls}-footer`}>{footer}</div>);

  return (
    <div
      className={classNames(prefixCls, className, {
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-clickable`]: clickable,
      })}
      style={style}
      onClick={() => disabled || (clickable && onClick?.())}
      aria-hidden="true"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {renderTitle()}
      {children}
      {renderFooter()}
    </div>
  );
};

Card.Meta = Meta;
export default Card;
