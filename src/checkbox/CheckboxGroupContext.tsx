import * as React from 'react';
import { CheckboxOptionType, CheckboxValueType } from './interface';

export interface CheckboxGroupContextProps {
  toggleOption?: (option: CheckboxOptionType<CheckboxValueType>) => void;
  name?: string;
  disabled?: boolean;
  selectedValues: CheckboxValueType[];
  registerValue: (value: CheckboxValueType) => void;
  unRegisterValue: (value: CheckboxValueType) => void;
}

const CheckboxGroupContext = React.createContext<CheckboxGroupContextProps | null>(null);
export default CheckboxGroupContext;
