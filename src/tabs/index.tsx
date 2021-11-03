import Tabs from './Tabs';
import Tab from './Tab';
import withSubComponent from '../utils/withSubComponent';
import { TabProps, TabsProps } from './interface';

export { Tab, TabsProps, TabProps };
export default withSubComponent(Tabs, { Tab });
