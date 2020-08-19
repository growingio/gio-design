export interface PaginationProps {
  disabled?: boolean;
  prefixCls?: string;
  defaultCurrent?: number;
  current?: number;
  total?: number;
  pageSize?: number;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (page: number, pageSize: number) => void;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  showQuickJumper?: boolean;
  hideOnSinglePage?: boolean;
}
