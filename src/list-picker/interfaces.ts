export interface Option {
  label: string;
  value: string;
}

export interface ListPickerProps {
  /**
   * 默认选项值
   */
  defaultValue?: string;
  /**
   * 可选择的选项
   */
  options: Option[];
  /**
   * 选项值
   */
  value?: string;
  /**
   * 选择某一项时的回调
   */
  onSelect?: (value: string) => void;
}
