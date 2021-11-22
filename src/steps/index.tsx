import Steps from './Steps';
import Tab from '../tabs/Tab';
import withSubComponent from '../utils/withSubComponent';
import { TabProps } from '../tabs/interface';
import { StepsProps } from './interface'

export { Tab, StepsProps, TabProps };
export default withSubComponent(Steps, { Tab });