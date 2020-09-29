import { TooltipProps } from '../tooltip/interface';

export interface DropdownProps extends Omit<TooltipProps, 'title' | 'tooltipLink' | 'arrowPointAtCenter' | 'overlay'> {
  overlay: (() => React.ReactElement) | React.ReactElement;
}
