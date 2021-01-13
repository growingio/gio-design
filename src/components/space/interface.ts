export type SpaceSize = number;

export type AlignType = 'start' | 'center' | 'end' | 'baseline' | 'stretch';

export interface SpaceProps {
    /**
     * 自定义`className`前缀
     */
    prefixCls?: string;
    /**
     * 自定义`className`
     */
    className?: string;
    /**
     * 自定义样式
     */
    style?: React.CSSProperties;
    /**
     * `space`尺寸
     * @default 8
     */
    size?: SpaceSize | [SpaceSize, SpaceSize];
    /**
     * 排列方向
     * @default horizontal
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * 自定义分隔符
     */
    split?: React.ReactNode;
    /**
     * 是否开启自动换行
     * @default false
     */
    autoWrap?: boolean;
    /**
     * 对齐方式
     * @default center
     */
    align?: AlignType;
}

export interface ItemProps {
    /**
     * 自定义`className`
     */
    className: string;
    /**
     * 被包裹元素的下标
     */
    index: number;
    /**
     * 包裹的元素
     */
    children: React.ReactNode;
    /**
     * 排列方向
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * `space`所在方向
     */
    marginDirection?: 'marginLeft' | 'marginRight';
    /**
     * 自定义分隔符
     */
    split?: React.ReactNode;
    /**
     * 是否开启自动换行
     */
    autoWrap?: boolean;
}