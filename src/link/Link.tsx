import { LoadingTwoTone } from '@gio-design/icons';
import classNames from 'classnames';
import React from 'react';
import { OverridableComponent, usePrefixCls } from '@gio-design/utils';
import { LinkTypeMap } from './interface';

export const Link = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    prefix,
    loading,
    disabled: disabledProp,
    href,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: 在使用 Link 组件的时候能识别出 component prop，但是在这里却无法识别
    component = 'a',
    ...restProps
  } = props;
  const prefixCls = usePrefixCls('link');
  const classes = classNames([prefixCls, className], {
    [`${prefixCls}_disabled`]: disabledProp,
    [`${prefixCls}_loading`]: loading,
  });

  const prefixIcon = loading ? (
    <span className={`${prefixCls}-prefix-icon`}>
      <LoadingTwoTone rotating />
    </span>
  ) : (
    prefix && <span className={`${prefixCls}-prefix-icon`}>{prefix}</span>
  );

  const disabled = disabledProp || loading;

  const Component: React.ElementType = component;
  return (
    <Component
      className={classes}
      disabled={disabledProp}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      ref={ref}
      href={disabled ? undefined : href}
      data-testid="link"
      loading={component === 'a' ? undefined : loading}
      {...restProps}
    >
      {prefixIcon}
      {children}
    </Component>
  );
}) as OverridableComponent<LinkTypeMap>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: 存在 displayName 属性
Link.displayName = 'Link';

export default Link;
