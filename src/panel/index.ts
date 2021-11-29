import InnerPanel from './Panel';
import Table from './Table';
import TabPanel from './TabPanel';
import ToolBar from './ToolBar';
import BatchActions from './BatchActions';
import { PanelProps } from './interfaces';
import WithSubComponent from '../utils/withSubComponent';

const Panel = WithSubComponent(InnerPanel, {
  BatchActions,
  Table,
  ToolBar,
  TabPanel,
});

export { PanelProps };
export { Table, TabPanel, ToolBar, BatchActions };
export default Panel;
