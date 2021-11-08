export type StatusCodeType = 'noResource'|'noAuth'|'noShared'| 304 | 404 | 500;

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
   /**
   * Size have two types
   */
  size?:'normal'| 'small'
}
