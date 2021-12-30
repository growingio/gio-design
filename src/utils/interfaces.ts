import React, { CSSProperties } from 'react';

// https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead
export const tuple = <T extends string[]>(...args: T) => args;

export const tupleNum = <T extends number[]>(...args: T) => args;

/**
 * https://stackoverflow.com/a/59187769
 * Extract the type of an element of an array/tuple without performing indexing
 */
// eslint-disable-next-line no-shadow
// eslint-disable-next-line @typescript-eslint/no-shadow
export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer E)[] ? E : never;

/**
 * 原 OverridableComponent.d
 */
export interface OverridableTypeMap {
  // eslint-disable-next-line @typescript-eslint/ban-types
  props: {};
  defaultComponent: React.ElementType;
}

/**
 * 基本的合法的组件 props
 */
// prettier-ignore
export interface CommonProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 大部分组件都会有的 props 类型
 */
// prettier-ignore
export type BaseProps<M extends OverridableTypeMap> =
& M['props']
& CommonProps;

/**
 * 没有使用 `component={Component}` 时的 Props 定义
 */
// prettier-ignore
export type DefaultComponentProps<M extends OverridableTypeMap> =
  & BaseProps<M>
  & Omit<React.ComponentPropsWithRef<M['defaultComponent']>, keyof BaseProps<M>>;

/**
 * 使用 `component={Component}` 时的 Props 定义.
 */
// prettier-ignore
export type OverrideProps<
M extends OverridableTypeMap,
C extends React.ElementType
> = (
  & BaseProps<M>
  & Omit<React.ComponentPropsWithRef<C>, keyof CommonProps>
);

/**
 * 定义通过 'component' prop 可进行根组件组件类型控制的组件
 *
 * 根据 component 的类型来定义 props
 */
export interface OverridableComponent<M extends OverridableTypeMap> {
  <C extends React.ElementType>(
    props: {
      /**
       * 用于组件根节点的 component
       * 可以是一个 HTML 元素字符串或一个自定义的组件
       */
      component: C;
    } & OverrideProps<M, C>
  ): React.ElementType;
  (props: DefaultComponentProps<M>): React.ElementType;
}

export type PropsWithChildren<P> = P & { children?: React.ReactNode };

export type PropsWithStyle<P> = P & { style?: CSSProperties };

export type PropsWithClassName<P> = P & { className?: string };

export type WithCommonProps<P> = PropsWithChildren<PropsWithStyle<PropsWithClassName<P>>>;
