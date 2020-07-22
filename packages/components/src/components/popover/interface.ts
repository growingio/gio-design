import { TooltipProps } from '../tooltip/interface';

export type ReactRender = () => React.ReactNode;
export interface PopoverProps extends Omit<TooltipProps, 'title' | 'tooltipLink'> {
  contentArea: React.ReactNode | ReactRender;
  footerArea?: React.ReactNode | ReactRender;
}
