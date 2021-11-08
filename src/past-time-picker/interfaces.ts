import { CommonProps } from '@gio-design/utils';
import { StaticPastTimePickerProps } from '../static-past-time-picker/interfaces';
import { PopoverProps } from '../popover';
import { InputButtonProps } from '../input';

export interface PastTimePickerProps
  extends CommonProps,
    Omit<InputButtonProps, 'value' | 'onSelect' | 'defaultValue'>,
    Omit<PopoverProps, 'trigger' | 'placement' | 'prefixCls' | 'children' | 'content'>,
    Pick<
      StaticPastTimePickerProps,
      'disabledDate' | 'experimental' | 'modes' | 'onCancel' | 'onSelect' | 'quickOptionsFilter'
    > {
  /**
   *  选择的时间范围
   */
  value?: string;
}
