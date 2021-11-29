import DatePicker from './Picker';
import WithSubComponent from '../utils/withSubComponent';
import StaticDatePicker from '../static-date-picker';

export type { StaticDatePickerProps } from '../static-date-picker/interfaces';

export type { DatePickerProps } from './interfaces';
export default WithSubComponent(DatePicker, { Static: StaticDatePicker });
