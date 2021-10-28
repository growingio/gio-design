import React from 'react';
import classNames from 'classnames';
import { TabButtonProps } from './interface';

export const TabButton = (props: TabButtonProps) => {
  const {
    tab,
    disabled,
    prefix,
    realKey = '',
    onChange,
    localActiveKey,
    setLocalActiveKey,
    prefixCls,
    size = 'normal',
    key: uniqueKey,
  } = props;
  const key = realKey.toString();
  const itemClasses = classNames({
    [`${prefixCls}-${size}`]: ['normal', 'small'].includes(size),
  });
  return (
    <button
      className={classNames(itemClasses, `${prefixCls}-item`, {
        [`${prefixCls}-item-active`]: localActiveKey === key,
        [`${prefixCls}-item-disabled`]: disabled,
      })}
      disabled={disabled}
      key={uniqueKey}
      type="button"
      data-testid={`tabList-item-${key}`}
      onClick={() => {
        key && setLocalActiveKey && setLocalActiveKey(key);
        if (localActiveKey !== key) {
          onChange?.(key);
        }
      }}
    >
      {prefix ? (
        <span className={tab ? `${prefixCls}-item-prefix-icon` : `${prefixCls}-item-prefix-icon-no-tab`}>{prefix}</span>
      ) : null}
      {tab}
    </button>
  );
};

export default TabButton;
