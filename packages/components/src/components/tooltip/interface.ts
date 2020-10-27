import { TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip';

type ReactRender = () => React.ReactNode;
export interface TooltipLink {
  name?: string;
  link: string;
}
export interface TooltipProps extends Partial<RcTooltipProps> {
  title?: React.ReactNode | ReactRender;
  disabled?: boolean;
  tooltipLink?: TooltipLink;
  arrowPointAtCenter?: boolean;
  children: React.ReactElement;
}
