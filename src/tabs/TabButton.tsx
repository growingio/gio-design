import React from 'react';
import classnames from 'classnames';
import usePrefixCls from '../utils/hooks/use-prefix-cls';

export interface TabButtonProps {
  /**
   key
   */
  value: React.Key;
  /**
   * button内容
   */
  label?: React.ReactNode;
  /**
   * 不可选状态
   */
  disabled?: boolean;
  /**
   * 前缀元素
   */
  prefix?: React.ReactNode;
  /**
   * 是否为激活状态
   */
  active?: boolean;
  /**
   * 大小
   */
  size?: 'small' | 'normal';
  /**
   * 点击事件的回调
   */
  onClick?: (e: React.Key) => void;
}

const TabButton: React.FC<TabButtonProps> = (props) => {
  const { children, disabled, prefix, size = 'normal', value, active, onClick } = props;

  const prefixCls = usePrefixCls('tabs-new-tablist-button');
  const buttonClassnames = classnames(`${prefixCls}`, `${prefixCls}-${size}`, {
    [`${prefixCls}-active`]: active,
    [`${prefixCls}-disabled`]: disabled,
  });

  const onButtonClick = () => {
    onClick(value);
  };

  return (
    <button
      className={buttonClassnames}
      disabled={disabled}
      type="button"
      data-testid={`tablist-${value}`}
      onClick={onButtonClick}
      value={value}
    >
      <span
        className={classnames(`${prefixCls}-prefix`, {
          [`${prefixCls}-prefix-none`]: !prefix,
          [`${prefixCls}-prefix-only`]: !children,
        })}
      >
        {prefix}
      </span>
      {children}
    </button>
  );
};

export default TabButton;
