import GIOCheckbox from './Checkbox';
import CheckboxGroup from './group';

export type TCheckbox = typeof GIOCheckbox & {
  Group: typeof CheckboxGroup;
};

const Checkbox = GIOCheckbox as TCheckbox;
Checkbox.Group = CheckboxGroup;

export { CheckboxProps, CheckboxGroupProps, CheckboxOptionType } from './interface';
export { CheckboxGroup };
export default Checkbox;
