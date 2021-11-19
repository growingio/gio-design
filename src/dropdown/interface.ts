import { Placement, TriggerAction } from '../popover/interface';

export default interface DropdownProps {
  prefixCls?: string;

  /**
   * 箭头是否指向目标元素中心
   * @default false
   */
  arrowPointAtCenter?: boolean;
  /**
   * 气泡被遮挡时自动调整位置
   * @default true
   */
  autoAdjustOverflow?: boolean;
  /**
   被包裹的元素
   */
  children: React.ReactNode;

  placement?: Placement;
  trigger?: TriggerAction | TriggerAction[];
  content?: React.ReactNode;

  /**
   * 气泡被遮挡时自动调整位置
   * @default false
   */
  allowArrow?: boolean;
  /**
   * 鼠标时候可以放入到气泡中
   * @default false
   */
  enterable?: boolean;
  /**
   * 是否禁用popover
   * @default undefined
   */
  disabled?: boolean;
  /**
   * 卡片类名
   */
  overlayClassName?: string;
  /**
   * 卡片样式
   */
  overlayStyle?: React.CSSProperties;
  /**
   * 卡片内容区域的样式对象
   */
  overlayInnerClassName?: string;
  /**
   * 卡片内容区域的样式对象
   */
  overlayInnerStyle?: React.CSSProperties;
  /**
   * position 布局方式
   * This can be useful if you want to position a tooltip inside an overflow: hidden container that you want to make overflow.
   * Please note that you can also try strategy: 'fixed' to obtain a similar effect with less hassle.
   */
  strategy?: 'fixed' | 'absolute';
  /**
   * 浮动显示的层
   */
  getContainer?: (node: HTMLElement) => HTMLElement;
  /**
   * 手动控制浮动，默认为false
   */
  visible?: boolean;
  /**
   * 默认是否显示，默认为false
   */
  defaultVisible?: boolean;
  /**
   * 显示隐藏的回掉
   */
  onVisibleChange?: (visible: boolean) => void;
}
