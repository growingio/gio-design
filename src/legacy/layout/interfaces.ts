export interface LayoutProps {
  className?: string;
  prefixCls?: string;
  children?: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;
  fixed?: boolean;
}

export interface LayoutHeaderDividerProps {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
}

export interface LayoutHeaderProps extends LayoutProps {
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
}

export type LayoutHeaderSectionProps = LayoutHeaderProps;
export interface LayoutContentProps extends LayoutProps {
  /**
   Content 区域的最大宽度 
  */
  maxWidth?: number | string;
}

export interface LayoutSiderProps extends LayoutProps {
  /*
    收缩状态的宽度 
  */
  collapsedWidth?: number;
  /*
    展开状态的宽度
  */
  width?: number;
  /*
    默认的伸缩状态
  */
  defaultCollapsed?: boolean;
  /*  
    控制展开与收缩
  */
  collapsed?: boolean;
  /*
    当伸缩状态变化时的回调函数
  */
  onCollapse?: (collapsed: boolean) => void;
  /*
    悬浮式侧边栏的位置
  */
  suspendedPosition?: 'left' | 'right';
  /*
    收缩触发器，设置bottom时启用默认触发器，可以自定义，设置为null时隐藏
   */
  trigger?: React.ReactNode | 'bottom' | null;
}

export interface SiderState {
  id: string;
  width: number;
  collapsedWidth: number;
  suspendedPosition?: 'left' | 'right';
}

export interface ContentState {
  maxWidth: number;
  margin: number;
}

export interface LayoutState {
  fixed: boolean;
}

export interface LayoutContextType {
  layoutState: LayoutState;
  contentState: ContentState;
  setLayoutState: (layoutState: Partial<LayoutState> | (() => Partial<LayoutState>)) => void;
  setContentState: (contentState: Partial<ContentState> | (() => Partial<ContentState>)) => void;
  removeSider: (siderId: string) => void;
  updateSiders: (sider: SiderState) => void;
}
