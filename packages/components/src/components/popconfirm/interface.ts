import { TooltipProps } from '../tooltip/interface';

export interface PopconfirmProps extends Omit<TooltipProps, 'title' | 'tooltipLink'> {
  title: string;
  desc?: string;
  onCancel?: Function;
  onConfirm?: Function;
  okText?: string;
  cancelText?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}
