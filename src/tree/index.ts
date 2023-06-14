import WithSubComponent from '../utils/withSubComponent';
import { TreeProps, TreeItemProps } from './interface';
import Tree from './Tree';
import TreeItem from './TreeItem';

export type { TreeProps, TreeItemProps };
export { Tree, TreeItem };

export default WithSubComponent(Tree, { TreeItem });
