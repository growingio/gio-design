import { CommonProps } from '@gio-design/utils';

type EmptyLocale = { description: string };

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
  /**
   * Call to action
   */
  cta?: {
    text: string;
    onClick: React.MouseEventHandler<HTMLElement>;
  };
  /**
   * 国际化
   */
  locale?: EmptyLocale;
}
