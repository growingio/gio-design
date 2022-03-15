import GIOCheckbox from './Checkbox';
import CheckboxGroup from './CheckboxGroup';
import WithSubComponent from '../utils/withSubComponent';

export type TCheckbox = typeof GIOCheckbox & {
  Group: typeof CheckboxGroup;
};

const Checkbox = GIOCheckbox as TCheckbox;

export { CheckboxProps, CheckboxGroupProps, CheckboxOptionType } from './interface';
export { CheckboxGroup };
export default WithSubComponent(Checkbox, { Group: CheckboxGroup });
