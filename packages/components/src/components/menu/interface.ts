import {
  MenuProps, MenuItemProps, SubMenuProps, MenuItemGroupProps,
} from 'rc-menu';
/**
 * 当前 gio-design 中设计的 menu 不需要用到所有 rc-menu 的能力，因此只使用 rc-menu 的部分接口
 * 未来视设计及规划情况开放或增加
 * 完整 rc-menu props 查看：https://github.com/react-component/menu/blob/master/README.md
 *
 * 覆写过的 rc-menu props:
 * mode, selectedKeys, defaultSelectedKeys, onClick
 */
type TOmitRcMenuProps =
  // 需要支持多选 menu 的情况下开放下面三个 props， 并取代 selectedKey, defaultSelectedKey
  | 'multiple'
  | 'selectedKeys'
  | 'defaultSelectedKeys'
  | 'activeKey'
  | 'defaultActiveFirst'
  | 'defaultOpenKeys'
  | 'onSelect'
  | 'onOpenChange'
  | 'triggerSubMenuAction'
  | 'openTransition'
  | 'subMenuOpenDelay'
  | 'subMenuCloseDelay'
  | 'forceSubMenuRender'
  | 'getPopupContainer'
  | 'builtinPlacements'
  | 'expandIcon'
  | 'direction';

export type TMenuMode = 'vertical' | 'horizontal';

export interface IMenuTitle {
  icon?: React.ReactNode | ((props: any) => React.ReactNode);
  title?: React.ReactNode;
}

export interface IMenuItemProps extends MenuItemProps {
  icon?: React.ReactNode | ((props: any) => React.ReactNode);
}

export interface ISubMenuProps extends SubMenuProps {
  //  rc 中 key 为可选，gio-design 中限制为必填
  key: string;
  icon?: React.ReactNode | ((props: any) => React.ReactNode);
}

export interface IMenuItemGroupProps extends MenuItemGroupProps {
  title?: React.ReactNode;
}

export interface IMenuProps extends Omit<MenuProps, TOmitRcMenuProps> {
  mode?: TMenuMode;
  selectedKey?: string;
  defaultSelectedKey?: string;
}
