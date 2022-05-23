import React from 'react';

import { FormContextProps } from './interface';

export type FormLabelAlign = 'left' | 'right';

export type RequiredMark = boolean | 'optional';

export const FormContext = React.createContext<FormContextProps>({
  labelAlign: 'left',
  layout: 'vertical',
});
