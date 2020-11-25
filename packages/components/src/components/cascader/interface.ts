import { DropdownProps } from '../dropdown/interface';
import { SizeType } from '../config-provider/SizeContext';
import { Props as MenuProps } from './menu';

export interface Props extends MenuProps {
    /**
     自定义 `CSS` 类前缀
     */
    prefixCls?: string;
    /**
     控件尺寸
     */
    size?: SizeType;
    /**
     禁用
     */
    disabled?: boolean;
    /**
     显示的文本
     */
    title?: string;
    /**
     多级文本的连接字符
     */
    separator?: string;
    /**
     文本点位符
     */
    placeholder?: string;
    /**
     文本控件
     */
    input?: React.ReactElement;

    // search-bar
    /**
     搜索框点位符
     */
    searchPlaceholder?: string;
    /**
     懒搜索，回车触发
     */
    lazySearch?: boolean;
    /**
     搜索事件的回调
     */
    onSearch?: (keyword: string) => void;
  
    // dropdown props
    /**
     下拉面板显示与否
     */
    visible?: boolean;
    /**
     下拉面板显示位置
     */
    placement?: DropdownProps['placement'];
    /**
     下拉面板的 `className`
     */
    overlayClassName?: string;
    /**
     下拉面板的样式
     */
    overlayStyle?: React.CSSProperties;
    /**
     下拉面板的显隐回调
     */
    onVisibleChange?: DropdownProps['onVisibleChange'];
    /**
     触发下拉面板的方式
     */
    dropdownTrigger?: DropdownProps['trigger'];
    /**
     获取下拉面板渲染到的 `DOM` 节点
     */
    getDropdownContainer?: DropdownProps['getTooltipContainer'];
}