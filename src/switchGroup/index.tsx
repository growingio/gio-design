import SwitchItem from './SwitchItem';
import SwitchGroup from './Group';
import WithSubComponent from '../utils/withSubComponent';

export {
  ISwitchProps as SwitchProps,
  ISwitchGroupProps as SwitchGroupOption,
  ISwitchGroupProps as SwitchGroupProps,
} from './interface';

export default WithSubComponent(SwitchGroup, { Item: SwitchItem });
