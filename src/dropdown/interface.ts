import { TooltipProps } from '../legacy/tooltip/interface';

export interface DropdownProps extends Omit<TooltipProps, 'title' | 'tooltipLink' | 'arrowPointAtCenter' | 'overlay'> {
  /**
   下拉区域
   */
  overlay: (() => React.ReactElement) | React.ReactElement;
}
