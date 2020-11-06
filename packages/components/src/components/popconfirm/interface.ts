import { TooltipProps } from '../tooltip/interface';

export interface PopconfirmProps extends Omit<TooltipProps, 'title' | 'tooltipLink'> {
  title: string;
  desc?: string;
  onCancel?: (e:React.MouseEvent<HTMLElement, MouseEvent>)=>void;
  onConfirm?: (e:React.MouseEvent<HTMLElement, MouseEvent>)=>void;
  okText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
}
