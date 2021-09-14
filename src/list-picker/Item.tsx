import React from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { ItemProps } from './interfaces';
import { PREFIX } from './constants';

function Item({ className, selected, ...restProps }: ItemProps) {
  const prefixCls = `${usePrefixCls(PREFIX)}__item`;
  const cls = classnames(
    prefixCls,
    {
      [`${prefixCls}--selected`]: selected,
    },
    className
  );
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <li role="option" aria-selected className={cls} {...restProps} />
  );
}

export default Item;
