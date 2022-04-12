import RcForm, { FormInstance, useForm } from 'rc-field-form';
import * as React from 'react';
import classNames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { FormProps, ForwardRefFn } from './interface';
import { FormContext } from './context';
import { SizeContextProvider, SizeType } from '../config-provider/SizeContext';

export function Form<Values = unknown>(
  props: FormProps<Values>,
  ref: React.ForwardedRef<FormInstance<Values>>
): React.ReactElement {
  const {
    name,
    prefixCls: customizePrefixCls,
    className,
    style,
    layout = 'horizontal',
    labelWidth,
    inputWidth,
    labelAlign,
    size,
    form,
    colon = false,
    requiredMark = true,
    ...restProps
  } = props;

  const prefixCls = usePrefixCls('form', customizePrefixCls);
  const cls = classNames(prefixCls, className, `${prefixCls}-${size || 'middle'}`, `${prefixCls}-${layout}`);
  // @TODO: wrap form with custom functions
  const [wrapForm] = useForm(form);
  const formContextValues = {
    name,
    layout,
    labelWidth,
    inputWidth,
    labelAlign,
    requiredMark,
    colon,
  };

  React.useImperativeHandle(ref, () => wrapForm);

  return (
    <FormContext.Provider value={formContextValues}>
      <SizeContextProvider size={size as SizeType}>
        <RcForm {...restProps} id={name} name={name} className={cls} form={wrapForm} style={style} />
      </SizeContextProvider>
    </FormContext.Provider>
  );
}

export default React.forwardRef(Form) as ForwardRefFn;
export { FormInstance, List, useForm, FormProvider } from 'rc-field-form';
