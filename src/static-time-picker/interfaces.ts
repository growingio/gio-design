import { PanelMode, Locale } from 'rc-picker/lib/interface';
import { CommonProps } from '@gio-design/utils';

export type StaticTimePickerLocale = Omit<Locale, 'locale'>;

export interface StaticTimePickerProps extends CommonProps {
  /**
   * 自定义 CSS 样式名
   */
  className?: string;
  /**
   * 默认选择的时间
   */
  defaultValue?: Date;
  /**
   * 国际化配置
   */
  locale?: StaticTimePickerLocale;
  /**
   * 日历面板切换的回调
   *
   * @param value - 当前时间 `Date`
   * @param mode - 当前模式，目前只会是 `date` 模式
   */
  onPanelChange?: (value: Date, mode: PanelMode) => void;
  /**
   * 时间发生变化时的回调
   *
   * @param value - 选择的时间 `Date`
   */
  onSelect?: (value: Date) => void;
  /**
   * 自定义面板底部
   */
  renderFooter?: (mode: PanelMode) => React.ReactNode;
  /**
   * 显示秒
   */
  showSecond?: boolean;
  /**
   * 选择的时间
   */
  value?: Date;
  /**
   * 可见日历中的时间
   */
  viewDate?: Date;
}
