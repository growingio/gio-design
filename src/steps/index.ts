import Steps from './Steps';
import Step from './Step';
import withSubComponent from '../utils/withSubComponent';
import { StepsProps, StepProps } from './interface';

export { Step, StepsProps, StepProps };
export default withSubComponent(Steps, { Step });
