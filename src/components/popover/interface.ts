import { TooltipProps } from '../../tooltip/interface';

export type ReactRender = () => React.ReactNode;
export interface PopoverProps extends Omit<TooltipProps, 'title' | 'tooltipLink'> {
  /**
   	卡片内容区域
   */
  contentArea: React.ReactNode | ReactRender;
  /**
   	卡片按钮区域
   */
  footerArea?: React.ReactNode | ReactRender;
}
