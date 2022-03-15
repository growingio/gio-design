import Collapse from './Collapse';
import CollapsePanel from './CollapsePanel';
import withSubComponent from '../utils/withSubComponent';

export { CollapseProps, CollapsePanelProps } from './interface';
export default withSubComponent(Collapse, { Panel: CollapsePanel });
export { CollapsePanel };
