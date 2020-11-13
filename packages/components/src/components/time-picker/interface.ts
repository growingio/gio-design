import { Moment } from 'moment';
import { AlignType } from 'rc-trigger/lib/interface';
import Panel from './Panel';

export interface TimePickerProps {
  prefixCls?: string;
  clearText?: string;
  disabled?: boolean;
  allowEmpty?: boolean;
  open?: boolean;
  defaultValue?: Moment;
  defaultOpenValue?: Moment;
  defaultOpen: boolean;
  value?: Moment;
  placeholder?: string;
  className?: string;
  id?: string;
  popupClassName?: string;
  showHour?: boolean;
  showMinute?: boolean;
  showSecond?: boolean;
  format?: string;
  disabledHours?: () => number[];
  disabledMinutes?: (hour?: number) => number[];
  disabledSeconds?: (hour?: number, minute?: number) => number[];
  use12Hours?: boolean;
  hideDisabledOptions?: boolean;
  onChange?: (newValue?: Moment) => void;
  addon?: (instance: typeof Panel) => React.ReactNode;
  placement?: string;
  transitionName?: string;
  name?: string;
  onOpen?: (newState: { open: boolean }) => void;
  onClose?: (newState: { open: boolean }) => void;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  focusOnOpen?: boolean;
  inputReadOnly?: boolean;
  inputIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  onKeyDown: any;
  onAmPmChange: any;
  inputClassName?: string;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  autoComplete?: string;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  style?: React.CSSProperties;
  align?: AlignType;
  popupStyle?: React.CSSProperties;
}

export interface PanelProps {
  ref?: any;
  onAmPmChange?: any;
  onEsc?: any;
  addon?: any;
  onKeyDown?: any;
  clearText?: TimePickerProps['clearText'];
  prefixCls?: TimePickerProps['prefixCls'];
  className?: string;
  value?: TimePickerProps['value'];
  inputReadOnly?: TimePickerProps['inputReadOnly'];
  onChange?: TimePickerProps['onChange'];
  defaultOpenValue?: TimePickerProps['defaultOpenValue'];
  showHour?: TimePickerProps['showHour'];
  showMinute?: TimePickerProps['showMinute'];
  showSecond?: TimePickerProps['showSecond'];
  format?: TimePickerProps['format'];
  placeholder?: TimePickerProps['placeholder'];
  disabledHours?: TimePickerProps['disabledHours'];
  disabledMinutes?: TimePickerProps['disabledMinutes'];
  disabledSeconds?: TimePickerProps['disabledSeconds'];
  hideDisabledOptions?: TimePickerProps['hideDisabledOptions'];
  use12Hours?: TimePickerProps['use12Hours'];
  hourStep?: TimePickerProps['hourStep'];
  minuteStep?: TimePickerProps['minuteStep'];
  secondStep?: TimePickerProps['secondStep'];
  focusOnOpen?: TimePickerProps['focusOnOpen'];
  clearIcon?: TimePickerProps['clearIcon'];
}

export interface ComboboxProps {
  value?: TimePickerProps['value'];
  prefixCls?: TimePickerProps['prefixCls'];
  defaultOpenValue?: TimePickerProps['defaultOpenValue'];
  onAmPmChange: (ampm: any) => void;
  showHour?: boolean;
  format?: string;
  onChange: TimePickerProps['onChange'];
  showMinute: TimePickerProps['showMinute'];
  showSecond: TimePickerProps['showSecond'];
  hourOptions: number[];
  minuteOptions: number[];
  secondOptions: number[];
  disabledHours: any;
  disabledMinutes: any;
  disabledSeconds: any;
  onCurrentSelectPanelChange?: any;
  use12Hours?: boolean;
  onEsc?: any;
  isAM?: boolean;
}

export interface SelectProps {
  prefixCls?: TimePickerProps['prefixCls'];
  options: any[];
  selectedIndex: number;
  type: string;
  onSelect: (type: any, value: any) => void;
  onMouseEnter: any;
  onEsc: any;
}
