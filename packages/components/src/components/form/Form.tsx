import { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import RcForm, { FormInstance, useForm } from 'rc-field-form';
import React, { useContext } from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import { FormContext, WidthProperty, FormLabelAlign } from './context';

export type FormLayout = 'horizon' | 'vertical' | 'inline';

export interface Props<Values = any> extends Omit<RcFormProps<Values>, 'form'> {
  prefixCls?: string;
  className?: string;
  name?: string;
  labelWidth?: WidthProperty;
  controlWidth?: WidthProperty;
  labelAlign?: FormLabelAlign;
  form?: FormInstance<Values>;
  layout?: FormLayout;
}

const Form: React.ForwardRefRenderFunction<FormInstance, Props> = (props: Props, ref) => {
  const {
    name,
    prefixCls: customizePrefixCls,
    className,
    layout = 'vertical',
    labelWidth,
    controlWidth,
    labelAlign,
    form,
    ...restProps
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('form', customizePrefixCls);
  const cls = classNames(
    prefixCls,
    className,
    `${prefixCls}-${layout}`,
    !!labelAlign && `${prefixCls}-label-${labelAlign}`
  );
  // @TODO: wrap form with custom functions
  const [wrapForm] = useForm(form);
  const formContextValues = {
    name,
    layout,
    labelWidth,
    controlWidth,
    labelAlign,
  };

  React.useImperativeHandle(ref, () => wrapForm);

  return (
    <FormContext.Provider value={formContextValues}>
      <RcForm {...restProps} id={name} className={cls} form={wrapForm} />
    </FormContext.Provider>
  );
};

export default Form;
export { FormInstance, List, useForm, FormProvider } from 'rc-field-form';
