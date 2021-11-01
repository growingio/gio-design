import React from 'react';
import { ButtonProps } from '../index';

interface PaginationProps {
  /**
   * 组件不受控制时默认选择的页面
   * @default 1
   */
  defaultCurrent?: number;

  /**
   * 当前选择的页面（受控属性）
   */
  current?: number;

  /**
   * 总的数据数
   * @default 0
   */
  total?: number;

  /**
   * 每页条数（受控属性）
   */
  pageSize?: number;

  /**
   * 默认的每页条数
   * @default pageSizeOptions[0] || 10
   */
  defaultPageSize?: number;
  /**
   * 根组件的 `className`
   */
  className?: string;
  /**
   * 根组件的样式
   */
  style?: React.CSSProperties;
  /**
   * 页码改变的回调
   * @param page 改变后的页码
   * @param pageSize 每页条数
   */
  onChange?: (page: number, pageSize: number) => void;

  /**
   * 数据总量的自定义渲染函数
   * @param total 数据总量
   * @returns 渲染文本
   */
  totalTextRender?: (total: number) => React.ReactNode;
  /**
   * 是否显示快速跳转
   * @default true
   */
  showQuickJumper?: boolean;
  /**
   * 只有一页时是否隐藏分页器
   * @default false
   */
  hideOnSinglePage?: boolean;

  /**
   * 是否展示行数切换器
   */
  showSizeChanger?: boolean;

  /**
   * 指定每页可以显示多少条。尝试传入小数，会被自动转换成整数
   * @default [10, 20, 50]
   */
  pageSizeOptions?: Array<string | number>;

  /**
   * 行数变化的回调
   * @param currentPageSize 改变后的页大小
   * @param previousPageSize 改变前的页大小
   */
  onPageSizeChange?: (currentPageSize: number, previousPageSize: number) => void;

  /**
   * 如果为 `true`，则显示"跳到首页"按钮
   * @default false
   */
  hideFirstButton?: boolean;

  /**
   * 如果为 `true`，则显示"跳到尾页"按钮
   * @default false
   */
  hideLastButton?: boolean;
}

/**
 * 子元素的类型
 */
export enum PaginationItemType {
  /**
   * 行数选择器
   */
  RowsPerPage = 'rows-per-page',
  /**
   * 总数显示
   */
  DisplayTotal = 'display-total',
  /**
   * 首页
   */
  First = 'first',
  /**
   * 上一页
   */
  Previous = 'previous',
  /**
   * 页码
   */
  Page = 'page',
  /**
   * 下一页
   */
  Next = 'next',
  /**
   * 尾页
   */
  Last = 'last',
  /**
   * 页码跳转器
   */
  Jumper = 'jumper',
}

interface PaginationItemProps
  extends Pick<PaginationProps & ButtonProps, 'className' | 'style' | 'aria-current' | 'aria-label'> {
  /**
   * 点击事件的回调
   */
  onClick: (event: React.MouseEvent<unknown, unknown>) => void;

  /**
   * 快速跳转的回调（按下回车、上、下键会触发）
   * @param page 需要跳转的页码
   */
  onQuickGo?: (page: number) => void;

  /**
   * 每页行数改变的回调
   * @param rows 改变后的行数
   */
  onRowsChange?: (rows: number) => void;

  /**
   * 子元素的类型
   */
  type: PaginationItemType;

  /**
   * 是否被选择
   */
  selected?: boolean;

  /**
   * 是否被禁用
   */
  disabled?: boolean;

  /**
   * 页码
   */
  page?: number;
}

export { PaginationItemProps };

export default PaginationProps;
