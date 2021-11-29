import GIOTabs from './Tabs';
import TabPane from './TabPane';

export { TabProps, TabPaneProps } from './interface';

type TTabs = typeof GIOTabs & {
  Pane: typeof TabPane;
};

const Tabs = GIOTabs as TTabs;
Tabs.Pane = TabPane;

export { TabPane };
export default Tabs;
