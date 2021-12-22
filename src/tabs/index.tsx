import Tabs from './Tabs';
import Tab from './Tab';
import withSubComponent from '../utils/withSubComponent';

export { TabProps, TabsProps } from './interface';

export default withSubComponent(Tabs, { Tab });
export { Tab };
  