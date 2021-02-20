import { CommonProps } from '../../utils/type';

export interface EmptyProps extends CommonProps {
  /**
   * 组件的尺寸
   */
  size?: 'small' | 'large';
  /**
   * 自定义图片，默认可用的图片有：`no-data` 和 `no-result`
   */
  image?: 'no-data' | 'no-result' | React.ReactNode;
  /**
   * 自定义描述内容
   */
  description?: React.ReactNode;
  cta?: {
    text: string;
    onClick: React.MouseEventHandler<HTMLElement>;
  };
}
