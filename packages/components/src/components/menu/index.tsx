import * as React from 'react';
import { Menu as AntMenu } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import 'antd/lib/menu/style/index.css';

export interface GioMenuProps {
  [key: string]: any;
}

const { Divider, Item, ItemGroup, SubMenu } = AntMenu;

class Menu extends React.Component<GioMenuProps & MenuProps> {
  public static Divider = Divider;
  public static Item = Item;
  public static SubMenu = SubMenu;
  public static ItemGroup = ItemGroup;
  public render() {
    return <AntMenu {...this.props} />;
  }
}

export default Menu;
