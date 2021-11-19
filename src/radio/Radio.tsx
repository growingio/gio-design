import React, { useContext } from 'react';

import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import RadioGroupContext from './context';
import { IRadioProps } from './interface';
import WithRef from '../utils/withRef';

const InnerRadio: React.ForwardRefRenderFunction<HTMLInputElement, IRadioProps> = (props: IRadioProps, ref) => {
  const { prefixCls: customPrefixCls, className, style, children, defaultChecked, color, ...restProps } = props;

  const groupContext = useContext(RadioGroupContext);
  const prefixCls = usePrefixCls('radio-new', customPrefixCls);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (restProps.onChange) {
      restProps.onChange(e);
    }

    if (groupContext) {
      groupContext.onChange(e);
    }
  };

  const radioProps = { ...restProps, onChange: handleChange };

  /**
   *  同步以 children 形式写在 RadioGroup 中的 Radio 的 props
   */
  if (groupContext) {
    radioProps.checked = groupContext.value === restProps.value;
    radioProps.name = groupContext.name;
    radioProps.disabled = groupContext.disabled || restProps.disabled;
  }

  const wrapperCls = classnames(className, `${prefixCls}__wrapper`, {
    [`${prefixCls}__wrapper__checked`]: restProps.checked,
    [`${prefixCls}__wrapper__disabled`]: radioProps.disabled,
  });

  const classes = classnames([className, prefixCls], {
    [`${prefixCls}-${restProps.checked ? 'checked' : ''}`]: restProps.checked,
    [`${prefixCls}-${restProps.disabled ? 'disabled' : ''}`]: restProps.disabled,
  });

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={wrapperCls} style={style}>
      <input
        type="radio"
        ref={ref}
        className={classes}
        value={restProps.value}
        checked={restProps.checked}
        color={color}
        disabled={restProps.disabled}
        defaultChecked={defaultChecked}
        {...radioProps}
      />
      <span>{children}</span>
    </label>
  );
};

export const Radio = WithRef<HTMLInputElement, IRadioProps>(InnerRadio); // React.forwardRef<HTMLInputElement, IRadioProps>(InnerRadio);

Radio.displayName = 'Radio';

export default Radio;
