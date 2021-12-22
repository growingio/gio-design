import Collapse from './Collapse';
import Panel from './CollapsePanel';
import withSubComponent from '../utils/withSubComponent';

export { CollapseProps, CollapsePanelProps } from './interface';
export default withSubComponent(Collapse, { Panel });
export { Panel };
