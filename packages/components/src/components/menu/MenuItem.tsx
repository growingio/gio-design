import React, { useContext } from 'react';
import { Item as RcMenuItem } from 'rc-menu';
import { IMenuItemProps } from './interface';
import MenuTitle from './MenuTitle';
import { MenuContext, SubMenuContext } from './MenuContext';

const MenuItem: React.FC<IMenuItemProps> = (props: IMenuItemProps) => {
  const { icon, children, ...restProps } = props;
  const { verticalIndent } = useContext(MenuContext);
  const { inSubMenu, inIconSubMenu } = useContext(SubMenuContext);

  let inlineIndent = verticalIndent;
  if (inSubMenu && inIconSubMenu) {
    inlineIndent = verticalIndent + 6;
  }
  if (inSubMenu && !inIconSubMenu) {
    inlineIndent = verticalIndent / 2;
  }

  return (
    <RcMenuItem {...restProps} inlineIndent={inlineIndent}>
      <MenuTitle title={children} icon={icon} />
    </RcMenuItem>
  );
};

export default MenuItem;
