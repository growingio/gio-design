export interface OverridableTypeMap {
  props: {};
  defaultComponent: React.ElementType;
}

/**
 * 基本的合法的组件 props
 */
// prettier-ignore
export interface CommonProps<M extends OverridableTypeMap> {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 大部分组件都会有的 props 类型
 */
// prettier-ignore
export type BaseProps<M extends OverridableTypeMap> =
& M['props']
& CommonProps<M>;

/**
 * Props if `component={Component}` is NOT used.
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
  & Omit<React.ComponentPropsWithRef<C>, keyof CommonProps<M>>
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
  ): React.Element;
  (props: DefaultComponentProps<M>): React.Element;
}
