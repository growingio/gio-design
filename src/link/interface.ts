
export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'prefix' | 'href'> {
  /**
   * 文本前的图标
   */
  prefix?: React.ReactNode;

  /**
   * 载入状态
   * @default false
   */
  loading?: boolean;

  /**
   * 禁用状态
   */
  disabled?: boolean

  /**
   * 包含超链接指向的 URL 或 URL 片段。`a` 标签的原生属性
   */
  href?: string
}

