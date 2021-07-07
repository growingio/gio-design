export type StatusCodeType = 403 | 404 | 500;

export interface PageProps {
  className?: string;
  style?: React.CSSProperties;
  /**
   * HTTP 响应状态码
   */
  statusCode: StatusCodeType;
  /**
   * 自定义描述内容
   */
  description: React.ReactNode;
  /**
   * Call to action
   */
  cta?: {
    text: string;
    onClick: React.MouseEventHandler<HTMLElement>;
  };
}
