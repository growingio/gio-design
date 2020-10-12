import { Moment } from 'moment';

export interface DatePickerProps {
  className?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
  format?: string;
  value: Moment;
  defaultValue?: Moment;
  onChange: (v: Moment | null) => void;
  onSelect: (v: Moment) => void;
  showFooter: boolean;
  disabledDate?: (current: Moment) => boolean;
}

export interface DateRangePickerProps {
  className?: string;
  showFooter?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  format?: string;
  value: Array<Moment>;
  onChange: (v: Array<Moment> | null) => void;
  onSelect: (v: Array<Moment>) => void;
  defaultValue?: Array<Moment>;
  renderExtraFooter?: () => React.ReactNode;
}
