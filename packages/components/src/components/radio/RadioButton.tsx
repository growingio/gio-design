import React, { useContext } from 'react';
import { ConfigContext } from '../config-provider';
import RadioGroupContext from './context';
import Radio from './Radio';
import { IRadioButtonProps } from './interface';

const RadioButtonInner: React.ForwardRefRenderFunction<IRadioButtonProps> = (
  props: IRadioButtonProps,
  ref: React.Ref<any>
) => {
  const { prefixCls: customPrefixCls, ...radioProps } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const groupContext = useContext(RadioGroupContext);
  const groupPrefixCls = `${groupContext?.prefixCls}--button` ?? '';
  const prefixCls = getPrefixCls('radio--button', customPrefixCls ?? groupPrefixCls);

  if (groupContext) {
    radioProps.checked = props.value === groupContext.value;
    radioProps.disabled = props.disabled || groupContext.disabled;
  }

  return <Radio prefixCls={prefixCls} {...radioProps} type="radio" ref={ref} />;
};

interface CompoundedRadioButton
  extends React.ForwardRefExoticComponent<IRadioButtonProps & React.RefAttributes<HTMLElement>> {
  componentType: string;
}

const RadioButton = React.forwardRef<unknown, IRadioButtonProps>(RadioButtonInner) as CompoundedRadioButton;

RadioButton.componentType = 'GIO_RADIO_BUTTON';

export default RadioButton;
