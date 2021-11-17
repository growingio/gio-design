import React from 'react';
import classnames from 'classnames';
import { DownOutlined } from '@gio-design/icons';
import { ExpandItemProps } from './interfaces';
import { useRootPrefixCls } from './utils';

function ExpandItem({ className, title = '展开全部', ...restProps }: ExpandItemProps) {
  const prefixCls = `${useRootPrefixCls()}__expand-item`;
  const cls = classnames(prefixCls, className);
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <li role="option" aria-selected {...restProps} className={cls}>
      <DownOutlined className={`${prefixCls}__icon`} size="14px" />
      <span className={`${prefixCls}__text`}>{title}</span>
    </li>
  );
}

export default ExpandItem;
