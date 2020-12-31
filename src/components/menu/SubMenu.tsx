import React, { useContext } from 'react';
import { SubMenu as RcSubMenu } from 'rc-menu';
import { ISubMenuProps } from './interface';
import MenuTitle from './MenuTitle';
import { MenuContext, SubMenuContext } from './MenuContext';

const SubMenu: React.FC<ISubMenuProps> = (props: ISubMenuProps) => {
  const { icon, title, ...restProps } = props;
  const { verticalIndent } = useContext(MenuContext);

  const renderTitle = (): React.ReactElement => <MenuTitle title={title} icon={icon} />;

  return (
    <SubMenuContext.Provider value={{ inSubMenu: true, inIconSubMenu: !!icon }}>
      <RcSubMenu {...restProps} title={renderTitle()} inlineIndent={verticalIndent} disabled />
    </SubMenuContext.Provider>
  );
};

SubMenu.displayName = 'GIODesignSubMenu';

export default SubMenu;
