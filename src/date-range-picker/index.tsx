import DateRangePicker from './DateRangePicker';
import WithSubComponent from '../utils/withSubComponent';
import StaticDateRangePicker from '../static-date-range-picker';

export type { StaticDateRangePickerProps } from '../static-date-range-picker/interfaces';

export type { DateRangePickerProps } from './interfaces';
export default WithSubComponent(DateRangePicker, { Static: StaticDateRangePicker });

export { formatDates } from './DateRangePicker';
