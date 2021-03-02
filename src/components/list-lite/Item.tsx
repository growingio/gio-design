import React from 'react';
import classnames from 'classnames';
import { ListItemProps } from './interfaces';
import { PREFIX } from './constants';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

function Item({
  className,
  style,
  disabled = false,
  ellipsis = true,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ListItemProps) {
  function handleClick(e: React.MouseEvent<HTMLElement>) {
    if (!disabled && onClick) {
      onClick(e);
    }
  }
  const prefixCls = `${usePrefixCls(PREFIX)}__item`;
  const cls = classnames(
    prefixCls,
    {
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--ellipsis`]: ellipsis,
    },
    className
  );
  const restProps = {
    children,
    onClick: handleClick,
    onMouseEnter,
    onMouseLeave,
    style,
  };
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <li role="option" aria-selected className={cls} {...restProps} />
  );
}

export default Item;
