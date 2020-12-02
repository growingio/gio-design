import GIOMenu from './Menu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

export { IMenuProps, ISubMenuProps, IMenuItemProps, TMenuMode } from './interface';

export type TMenu = typeof GIOMenu & {
  MenuItem: typeof MenuItem;
  SubMenu: typeof SubMenu;
};

const Menu = GIOMenu as TMenu;
Menu.MenuItem = MenuItem;
Menu.SubMenu = SubMenu;

export default Menu;
export { MenuItem, SubMenu };
