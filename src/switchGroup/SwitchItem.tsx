import React, { useContext } from 'react';

import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import SwitchGroupContext from './context';
import { ISwitchProps } from './interface';
import WithRef from '../utils/withRef';

const InnerSwitchItem: React.ForwardRefRenderFunction<HTMLInputElement, ISwitchProps> = (props: ISwitchProps, ref) => {
  const { prefixCls: customPrefixCls, className, style, children, defaultChecked, prefix, ...restProps } = props;

  const groupContext = useContext(SwitchGroupContext);
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
    [`${prefixCls}__wrapper__checked`]: restProps.checked,
    [`${prefixCls}__wrapper__disabled`]: switchProps.disabled,
  });

  const classes = classnames([className, prefixCls], {
    [`${prefixCls}-${restProps.checked ? 'checked' : ''}`]: restProps.checked,
    [`${prefixCls}-${restProps.disabled ? 'disabled' : ''}`]: restProps.disabled,
  });

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={wrapperCls}>
      <input
        type="radio"
        ref={ref}
        className={classes}
        value={restProps.value}
        checked={restProps.checked}
        onChange={handleChange}
        style={style}
        disabled={restProps.disabled}
        defaultChecked={defaultChecked}
      />
      <span>
        {prefix}
        {children}
      </span>
    </label>
  );
};

const SwitchItem = WithRef<HTMLInputElement, ISwitchProps>(InnerSwitchItem);

SwitchItem.displayName = 'Switch';

export default SwitchItem;
