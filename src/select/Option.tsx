import React from 'react';
import { OptionProps } from '../list/interface';

export interface OptionFC extends React.FC<OptionProps> {
  isSelectOption: boolean;
}
const Option: OptionFC = () => null;

Option.isSelectOption = true;

export default Option;
