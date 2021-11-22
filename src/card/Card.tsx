import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { CardProps } from './interfaces';
import WithRef from '../utils/withRef';

export const Card = WithRef<HTMLDivElement, HTMLAttributes<CardProps> & CardProps>(
  (
    {
      fullWidthContent = false,
      disabled = false,
      clickable = true,
      children,
      className,
      prefixCls: customizePrefixCls,
      ...restProps
    }: CardProps,
    ref?
  ) => {
    const prefixCls = usePrefixCls('card-new', customizePrefixCls);
    const cardClassName = classNames(prefixCls, className, {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-clickable`]: clickable,
      [`${prefixCls}-full-width-content`]: fullWidthContent,
    });

    return (
      <div className={cardClassName} ref={ref} {...restProps}>
        {children}
      </div>
    );
  }
);

Card.defaultProps = {
  fullWidthContent: false,
  disabled: false,
  clickable: true,
};

Card.displayName = 'Card';

export default Card;
