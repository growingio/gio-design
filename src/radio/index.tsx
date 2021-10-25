import Radio from './Radio';
import RadioGroup from './Group';
import WithSubComponent from '../utils/withSubComponent';

export { RadioGroup };

export {
  IRadioProps as RadioProps,
  TRadioGroupOption as RadioGroupOption,
  IRadioGroupProps as RadioGroupProps,
} from './interface';

export default WithSubComponent(Radio, { Group: RadioGroup });
