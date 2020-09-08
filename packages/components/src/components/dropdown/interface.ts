import { TooltipProps } from '../tooltip/interface';

export type DropdownProps = Omit<TooltipProps, 'title' | 'tooltipLink' | 'arrowPointAtCenter'>;
