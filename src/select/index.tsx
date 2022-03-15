import Select from './Select';
import Option from './Option';
import WithSubComponent from '../utils/withSubComponent';

export type { SelectProps, TriggerProps } from './interface';
export type { OptionProps } from '../list/interface';
export { Select, Option };

export default WithSubComponent(Select, { Option });
