import React from 'react';
import classNames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { CardProps } from './interfaces';
import WithRef from '../utils/withRef';

export const Card = WithRef<HTMLDivElement, CardProps>(
  (
    {
      fullWidthContent = false,
      disabled = false,
      clickable = true,
      children,
      className,
      prefixCls: customizePrefixCls,
      boxShadow = false,
      ...restProps
    }: CardProps,
    ref?
  ) => {
    const prefixCls = usePrefixCls('card', customizePrefixCls);
    const cardClassName = classNames(prefixCls, className, {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-clickable`]: clickable,
      [`${prefixCls}-full-width-content`]: fullWidthContent,
      [`${prefixCls}-box-shadow`]: boxShadow,
    });

    return (
      <div className={cardClassName} ref={ref} data-testid="card" {...restProps}>
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
