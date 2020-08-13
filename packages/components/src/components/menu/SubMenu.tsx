import React from 'react';
import { SubMenu as RcSubMenu } from 'rc-menu';
import { ISubMenuProps } from './interface';
import MenuTitle from './MenuTitle';

const SubMenu: React.FC<ISubMenuProps> = (props) => {
  const { icon, title, ...restProps } = props;

  const renderTitle = () => <MenuTitle title={title} icon={icon} />;

  return <RcSubMenu {...restProps} title={renderTitle()} inlineIndent={16} disabled />;
};

SubMenu.displayName = 'GIODesignSubMenu';

export default SubMenu;
