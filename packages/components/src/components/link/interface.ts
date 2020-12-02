/* eslint-disable @typescript-eslint/ban-types */
import { OverrideProps } from '../../utils/type';

export type HtmlElement = keyof React.ReactHTML;

export interface ILinkProps {
  /**
   * 自定义 Link 根元素使用的组件
   */
  component: React.ElementType;
  /**
   * 跳转目标链接
   */
  to?: string;
  /**
   * 失效状态
   */
  disabled?: boolean;
  /**
   * 替代 Link 组件 class 的 gio-link 前缀
   */
  prefix?: string;
}

export interface LinkTypeMap<P = {}, D extends React.ElementType = 'a'> {
  props: P & ILinkProps;
  defaultComponent: D;
}

export type LinkProps<D extends React.ElementType = LinkTypeMap['defaultComponent'], P = {}> = OverrideProps<
  LinkTypeMap<P, D>,
  D
>;
