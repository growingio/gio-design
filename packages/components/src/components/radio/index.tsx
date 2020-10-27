import Radio from './Radio';
import RadioGroup from './Group';
import RadioButton from './RadioButton';

export {
  IRadioProps,
  IRadioGroupProps,
  TRadioGroupOption,
  IRadioChangeEvent,
  IRadioChangeEventTarget,
} from './interface';

Radio.Group = RadioGroup;

Radio.Button = RadioButton;

export { RadioGroup, RadioButton };

export default Radio;
