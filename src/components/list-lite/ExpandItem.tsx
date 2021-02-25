import React from 'react';
import classnames from 'classnames';
import { DownOutlined } from '@gio-design/icons';
import { ExpandItemProps } from './interfaces';
import { PREFIX } from './constants';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

function ExpandItem({ className, ...restProps }: ExpandItemProps) {
  const prefixCls = `${usePrefixCls(PREFIX)}__expand-item`;
  const cls = classnames(prefixCls, className);
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <li role="option" aria-selected {...restProps} className={cls}>
      <DownOutlined className={`${prefixCls}__icon`} size="14px" />
      <span className={`${prefixCls}__text`}>展开全部</span>
    </li>
  );
}

export default ExpandItem;
