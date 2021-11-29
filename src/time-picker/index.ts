import TimePicker from './TimePicker';
import StaticTimePicker from '../static-time-picker';
import WithSubComponent from '../utils/withSubComponent';

export type { StaticTimePickerProps } from '../static-time-picker/interfaces';
export type { TimePickerProps } from './interfaces';

export default WithSubComponent(TimePicker, { Static: StaticTimePicker });
