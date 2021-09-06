import React from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { ListItemProps } from './interfaces';
import { PREFIX } from './constants';

function Item({ className, ...restProps }: ListItemProps) {
  const prefixCls = `${usePrefixCls(PREFIX)}__item`;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <li role="option" aria-selected className={classnames(prefixCls, className)} {...restProps} />
  );
}

export default Item;
