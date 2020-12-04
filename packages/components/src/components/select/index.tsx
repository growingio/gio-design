import GIOSelect from './Select';
import { Option } from './interface';

export { SelectProps, Option as SelectOption } from './interface';

type TSelect = typeof GIOSelect & {
  Option: typeof Option;
};

const Select = GIOSelect as TSelect;
Select.Option = Option;

export { Option as SelectOptions };
export default Select;
