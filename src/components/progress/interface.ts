export enum ProgressStatus {
  active,
  success,
  exception,
}

export interface ProgressProps {
  /**
   * 百分比
   */
  percent?: number;
  /**
   * 可选 `active`, `success`, `expection`
   */
  status?: keyof typeof ProgressStatus | string;
  /**
   * 内容模版函数
   */
  format?: (percent?: number) => React.ReactNode;
  customizePrefixCls?: string;
}
