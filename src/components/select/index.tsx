import GIOSelect from './Select';
import { Option, SelectProps, OptGroupProps, OptionProps } from './interface';
import Options from './OptionsList/Options';
import OptGroup from './OptionsList/OptGroup';

export type TSelect = typeof GIOSelect & {
  Group: typeof OptGroup;
  Option: typeof Options;
};
const Select = GIOSelect as TSelect;

Select.Option = Options;
Select.Group = OptGroup;

export {
  Options as Option,
  OptGroup as Group,
  SelectProps,
  OptionProps,
  Option as SelectOptions,
  OptGroupProps as GroupProps,
};
export default Select;
