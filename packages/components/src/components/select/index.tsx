import Select from './Select';
import { Option } from './interface';
import Options from './Options';
import OptGroup from './OptGroup';

Select.Option = Options;
Select.Group = OptGroup;
export { Option as SelectOptions };

export { Options as Option, OptGroup as Group }
export default Select;