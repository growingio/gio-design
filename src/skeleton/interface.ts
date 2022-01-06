import { AvatarProps } from '../avatar';

export type SkeletonAvatarProps = Pick<AvatarProps, 'size'>;
export interface SkeletonParagraphProps {
  /**
   * 段落展位图行数
   * @default 3
   */
  row?: number;

  /**
   * 设置段落占位图的宽度，若为数组时则为对应的每行宽度
   * @default 100%
   */
  width?: string | number | (string | number)[];
}

export interface SkeletonImageProps {
  className?: string;
  style?: React.CSSProperties;
  /**
   替代组件的类前缀
   */
  prefixCls?: string;
  /**
   	延迟显示加载效果的时间（防止闪烁）
   */
  delay?: number;
  /**
   	是否为加载中状态
   */
  loading?: boolean;
  /**
   	设置骨架图片的宽度（高度会等比例变化）
   */
  width?: number;
  /**
   	设置被包裹的元素
   */
  children?: React.ReactNode;
  /**
   设置占位图的颜色
   */
  color?: string;
}

export interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   替代组件的类前缀
   */
  prefixCls?: string;
  /**
   延迟显示加载效果的时间（防止闪烁）
   */
  delay?: number;
  /**
   是否为加载中状态
   */
  loading?: boolean;
  /**
   是否显示标题占位图
   */
  title?: boolean;
  /**
   	是否显示头像占位图
   */
  avatar?: boolean | SkeletonAvatarProps;
  /**
   是否显示段落占位图
   */
  paragraph?: boolean | SkeletonParagraphProps;
  /**
   是否展示动画效果
   */
  active?: boolean;
  /**
   设置被包裹的元素
   */
  children?: React.ReactNode;
}
