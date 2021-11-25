import Steps from './Steps';
import Tab from '../tabs/Tab';
import withSubComponent from '../utils/withSubComponent';
import { TabProps as StepProps } from '../tabs/interface';
import { StepsProps } from './interface';

export { Tab as Step, StepsProps, StepProps };
export default withSubComponent(Steps, { Step: Tab });
