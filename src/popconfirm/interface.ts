import { TooltipProps } from '../components/tooltip/interface';

export interface PopconfirmProps extends Omit<TooltipProps, 'title' | 'tooltipLink'> {
  /**
   	确认框的主题
   */
  title: string;
  /**
   	确认框的描述
   */
  desc?: string;
  /**
   	点击取消的回调
   */
  onCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /**
   	点击确认的回调
   */
  onConfirm?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /**
   	确认按钮文字
   */
  okText?: string;
  /**
   		取消按钮文字
   */
  cancelText?: string;
  /**
   	替换 title 前的 icon
   */
  icon?: React.ReactNode;
}
