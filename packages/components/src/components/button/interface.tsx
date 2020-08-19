import { SizeType } from '../config-provider/SizeContext';
import { TooltipProps } from '../tooltip/interface';

export type ButtonType = 'primary' | 'secondary' | 'assist' | 'text';
export type ButtonHTMLType = 'submit' | 'button' | 'reset';

export interface BaseButtonProps {
  type?: ButtonType;
  icon?: React.ReactNode;
  size?: SizeType;
  loading?: boolean;
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
  block?: boolean;
  children?: React.ReactNode;
  tooltipProps?: Omit<TooltipProps, 'children'>;
}

export type ButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;
