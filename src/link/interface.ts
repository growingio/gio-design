import { OverrideProps } from '@gio-design/utils/dist/interfaces';

export interface LinkTypeMap<T extends React.ElementType = 'a'> {
  props: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'prefix' | 'type'> & {
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
     * @default false
     */
    disabled?: boolean;
  };
  defaultComponent: T;
}

// prettier-ignore
export type LinkProps<
  D extends React.ElementType = LinkTypeMap['defaultComponent']
> = OverrideProps<LinkTypeMap<D>, D>;
