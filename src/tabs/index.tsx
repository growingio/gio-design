import GIOTabs from './Tabs';
import TabPanel from './TabPanel';

export { TabProps, TabPanelProps } from './interface';

type TTabs = typeof GIOTabs & {
  TabPanel: typeof TabPanel;
};

const Tabs = GIOTabs as TTabs;
Tabs.TabPanel = TabPanel;

export { TabPanel };
export default Tabs;
