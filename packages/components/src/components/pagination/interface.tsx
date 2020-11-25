export interface PaginationProps {
  /**
   禁用分页组件
   */
  disabled?: boolean;
  /**
   设置组件 CSS 类前缀
   */
  prefixCls?: string;
  /**
   设置默认页
   */
  defaultCurrent?: number;
  /**
   	设置当前页
   */
  current?: number;
  /**
   	数据总数
   */
  total?: number;
  /**
   	每页条数
   */
  pageSize?: number;
  /**
   自定义 `className`
   */
  className?: string;
  /**
   自定义样式
   */
  style?: React.CSSProperties;
  /**
   页码改变的回调，参数是改变后的页码及每页条数
   */
  onChange?: (page: number, pageSize: number) => void;
  /**
   用于显示数据总量和当前数据顺序
   */
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  /**
   用于快速跳转
   */
  showQuickJumper?: boolean;
  /**
   只有一页时是否隐藏分页器
   */
  hideOnSinglePage?: boolean;
}
