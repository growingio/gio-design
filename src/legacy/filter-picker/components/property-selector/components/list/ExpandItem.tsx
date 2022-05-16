import React from 'react';
import classnames from 'classnames';
import { ArrowDownOutlined } from '@gio-design/icons';
import { useLocale } from '@gio-design/utils';
import { ExpandItemProps } from './interfaces';
import { useRootPrefixCls } from './utils';
import defaultLocaleTextObject from '../../../../../../list/locales/zh-CN';

function ExpandItem({ className, title, ...restProps }: ExpandItemProps) {
  const prefixCls = `${useRootPrefixCls()}__expand-item`;
  const cls = classnames(prefixCls, className);
  const localeTextObject: typeof defaultLocaleTextObject = useLocale('List') || defaultLocaleTextObject;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <li role="option" aria-selected {...restProps} className={cls}>
      <ArrowDownOutlined className={`${prefixCls}__icon`} size="14px" />
      <span className={`${prefixCls}__text`}>{title ?? localeTextObject.expandAll?.()}</span>
    </li>
  );
}

export default ExpandItem;
