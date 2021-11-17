import { FormProvider as RcFormProvider } from 'rc-field-form';
import { omit } from 'lodash';
import { FormProviderProps as RcFormProviderProps } from 'rc-field-form/lib/FormContext';
import React from 'react';

import { FormContextProps } from './interface';

export type FormLabelAlign = 'left' | 'right';

export type RequiredMark = boolean | 'optional';

export const FormContext = React.createContext<FormContextProps>({
  labelAlign: 'left',
  layout: 'vertical',
});

export type FormProviderProps = Omit<RcFormProviderProps, 'validateMessages'>;

export const FormProvider: React.FC<FormProviderProps> = (props) => {
  const providerProps = omit(props, 'prefixCls');

  return <RcFormProvider {...providerProps} />;
};
