import React from 'react';
import classnames from 'classnames';
import { DownOutlined } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import { ExpandItemProps } from './interfaces';
import { PREFIX } from './constants';

function ExpandItem({ className, text, ...restProps }: ExpandItemProps) {
  const prefixCls = `${usePrefixCls(PREFIX)}__expand-item`;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <li role="option" aria-selected {...restProps} className={classnames(prefixCls, className)}>
      <DownOutlined className={`${prefixCls}__icon`} size="14px" />
      <span className={`${prefixCls}__text`}>{text}</span>
    </li>
  );
}

export default ExpandItem;
