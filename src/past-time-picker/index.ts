import PastTimePicker from './PastTimePicker';
import { PastTimePickerProps } from './interfaces';
import WithSubComponent from '../utils/withSubComponent';
import StaticPastTimePicker from '../static-past-time-picker';

export { PastTimePicker, PastTimePickerProps };

export type { StaticPastTimePickerProps } from '../static-past-time-picker/interfaces';

export default WithSubComponent(PastTimePicker, { Static: StaticPastTimePicker });
