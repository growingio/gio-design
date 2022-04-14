import React, { useContext } from 'react';

import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import SwitchContext from './context';
import { SwitchItemProps } from './interface';
import WithRef from '../utils/withRef';

const InnerSwitchItem: React.ForwardRefRenderFunction<HTMLInputElement, SwitchItemProps> = (props, ref) => {
  const { prefixCls: customPrefixCls, className, style, children, defaultChecked, prefix, ...restProps } = props;

  const groupContext = useContext(SwitchContext);
  const prefixCls = usePrefixCls('switch', customPrefixCls);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    groupContext?.onChange(e);
  };

  const switchProps = { ...restProps, onChange: handleChange };
  if (groupContext) {
    switchProps.checked = groupContext.value === restProps.value;
    switchProps.name = groupContext.name;
    switchProps.disabled = groupContext.disabled || restProps.disabled;
  }

  const wrapperCls = classnames(className, `${prefixCls}__wrapper`, {
    [`${prefixCls}__wrapper__checked`]: switchProps.checked,
    [`${prefixCls}__wrapper__disabled`]: switchProps.disabled,
  });

  const classes = classnames([className, prefixCls], {
    [`${prefixCls}-${restProps.checked ? 'checked' : ''}`]: switchProps.checked,
    [`${prefixCls}-${restProps.disabled ? 'disabled' : ''}`]: switchProps.disabled,
  });

  const prefixIcon = React.isValidElement(prefix)
    ? React.cloneElement(prefix, { className: `${prefixCls}-prefix` })
    : prefix;

  return (
    <label className={wrapperCls}>
      <input
        type="radio"
        ref={ref}
        className={classes}
        value={restProps.value}
        checked={restProps.checked}
        style={style}
        disabled={restProps.disabled}
        defaultChecked={defaultChecked}
        data-testid="switch-item"
        {...switchProps}
      />
      {prefixIcon}
      {children}
    </label>
  );
};

const SwitchItem = WithRef<HTMLInputElement, SwitchItemProps>(InnerSwitchItem);

SwitchItem.displayName = 'SwitchItem';

export default SwitchItem;
