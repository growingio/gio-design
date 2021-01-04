import { TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip';

type ReactRender = () => React.ReactNode;
export interface TooltipLink {
  name?: string;
  link: string;
}
export interface TooltipProps extends Partial<RcTooltipProps> {
  subPrefixCls?: string;
  title?: React.ReactNode | ReactRender;
  /**
   当 `disabled` 为 `true` 时，触发行为不会显示气泡框
   */
  disabled?: boolean;
  /**
   设置头像的链接以及链接的文字
   */
  tooltipLink?: TooltipLink;
  /**
   箭头是否指向目标元素中心
   */
  arrowPointAtCenter?: boolean;
  /**
   气泡被遮挡时自动调整位置
   */
  autoAdjustOverflow?: boolean;
  /**
   被包裹的元素
   */
  children: React.ReactElement;
}
