import { PopoverProps } from '../popover/interface';

export interface PopConfirmProps extends Omit<PopoverProps, 'title'> {
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
  onConfirm?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => boolean | undefined;
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

  /**
   * 阻止点击 Popconfirm 子元素时弹出确认框
   * @default false
   */
  disabled?: boolean;
}
