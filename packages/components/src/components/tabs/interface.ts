export interface TabProps {
  /**
   标签页样式
   */
  type?: 'line' | 'block';
  /**
   设置尺寸
   */
  size?: 'small' | 'middle' | 'large';
  /**
   `tab` 被点击的回调
   */
  onTabClick?: (key: string | number) => void;
  /**
   切换面板的回调
   */
  onChange?: (key: string | number) => void;
  /**
   开启受控模式，当前激活 `tab` 面板的 `key`
   */
  activeKey?: string;
  /**
   	初始化选中面板的 `key`
   */
  defaultActiveKey?: string;
  /**
   	标签面板组件
   */
  children?: React.ReactNode;
  /**
   	替代组件的类前缀
   */
  prefixCls?: string;
  /**
   自定义`className`
   */
  className?: string;
  /**
   自定义样式
   */
  style?: React.CSSProperties;
}

export interface TabPaneProps {
  /**
   选项卡头显示文字
   */
  tab?: React.ReactNode;
  /**
   选项卡禁用
   */
  disabled?: boolean;
  /**
   标签面板组件
   */
  children?: React.ReactNode;
  /**
   替代组件的类前缀
   */
  prefixCls?: string;
  /**
   自定义`className`
   */
  className?: string;
  /**
   自定义样式
   */
  style?: React.CSSProperties;
}
