import React from 'react';
import { OptGroupProps } from '../interface';

export interface OptionGroupFC extends React.FC<OptGroupProps> {
  isSelectOptGroup: boolean;
}
export const OptGroup: OptionGroupFC = () => null;

OptGroup.isSelectOptGroup = true;

export default OptGroup;
