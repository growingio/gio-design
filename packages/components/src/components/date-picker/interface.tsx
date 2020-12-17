import { Moment } from 'moment';

export interface DatePickerProps {
  /**
   自定义 `className`
   */
  className?: string;
  /**
   自定义样式
   */
  style?: React.CSSProperties;
  /**
   自定义 `css` 类前缀
   */
  prefixCls?: string;
  /**
   日期显示格式
   */
  format?: string;
  /**
   此受控组件绑定的时间
   */
  value: Moment;
  /**
   默认显示的时间
   */
  defaultValue?: Moment;
  /**
   面板切换的回调
   */
  onChange?: (v: Moment | null) => void;
  /**
   是否显示footer
   */
  showFooter: boolean;
  /**
   禁止选择的时间
   */
  disabledDate?: (current: Moment) => boolean;
}

export interface DateRangePickerProps {
  /**
   自定义 `className`
   */
  className?: string;
  /**
   是否显示footer
   */
  showFooter?: boolean;
  /**
   自定义样式
   */
  style?: React.CSSProperties;
  /**
   自定义 `css` 类前缀
   */
  prefixCls?: string;
  /**
   日期显示格式
   */
  format?: string;
  /**
   	此受控组件绑定的时间
   */
  value: Array<Moment>;
  /**
   面板切换的回调
   */
  onChange?: (v: Array<Moment> | null) => void;
  /**
   默认显示的时间
   */
  defaultValue?: Array<Moment>;
  renderExtraFooter?: () => React.ReactNode;
  /**
   禁止选择的时间
   */
  disabledDate?: (current: Moment) => boolean;
}
