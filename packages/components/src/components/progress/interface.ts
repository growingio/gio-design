export enum ProgressStatus {
  active,
  success,
  exception,
}

export interface ProgressProps {
  percent?: number;
  status?: keyof typeof ProgressStatus | string;
  format?: (percent?: number) => React.ReactNode;
  customizePrefixCls?: string;
}
