import React, { useContext } from 'react';
import RcCheckbox from 'rc-checkbox';
import classnames from 'classnames';
import { ConfigContext } from '../config-provider';
import SizeContext from '../config-provider/SizeContext';
import RadioGroup from './Group';
import RadioButton from './RadioButton';
import RadioGroupContext from './context';
import { IRadioProps, IRadioChangeEvent } from './interface';

interface CompoundedRadio extends React.ForwardRefExoticComponent<IRadioProps & React.RefAttributes<HTMLElement>> {
  Group: typeof RadioGroup;
  Button: typeof RadioButton;
  componentType: string;
}

const InnerRadio: React.ForwardRefRenderFunction<unknown, IRadioProps> = (
  { type = 'radio', prefixCls: customPrefixCls, className, style, children, ...restProps }: IRadioProps,
  ref
) => {
  const groupContext = useContext(RadioGroupContext);
  const { getPrefixCls } = useContext(ConfigContext);
  const configSize = React.useContext(SizeContext);

  const groupSize = groupContext?.size;
  const size = groupSize ?? configSize ?? 'middle';
  const groupPrefixCls = groupContext?.prefixCls ?? '';
  const prefixCls = getPrefixCls('radio', customPrefixCls ?? groupPrefixCls);
  const wrapperCls = classnames(className, `${prefixCls}__wrapper`, `${prefixCls}__wrapper--${size}`, {
    [`${prefixCls}__wrapper--checked`]: restProps.checked,
    [`${prefixCls}__wrapper--disabled`]: restProps.disabled,
  });
  const labelCls = classnames(className, `${prefixCls}__label`);

  const handleChange = (e: IRadioChangeEvent) => {
    if (restProps.onChange) {
      restProps.onChange(e);
    }

    if (groupContext) {
      groupContext.onChange(e);
    }
  };

  const rcProps = { ...restProps, onChange: handleChange };

  /**
   *  同步以 children 形式写在 RadioGroup 中的 Radio 的 props
   */
  if (groupContext) {
    rcProps.checked = groupContext.value === restProps.value;
    rcProps.name = groupContext.name;
    rcProps.disabled = groupContext.disabled || restProps.disabled;
  }

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      className={wrapperCls}
      style={style}
      onMouseEnter={restProps.onMouseEnter}
      onMouseLeave={restProps.onMouseLeave}
    >
      <RcCheckbox type={type} {...rcProps} prefixCls={prefixCls} ref={ref as any} />
      {children ? <span className={labelCls}>{children}</span> : null}
    </label>
  );
};

const Radio = React.forwardRef<unknown, IRadioProps>(InnerRadio) as CompoundedRadio;

Radio.displayName = 'GioRadio';

Radio.componentType = 'GIO_RADIO';

export default Radio;
