import React, { useContext } from 'react';
import { Item as RcMenuItem } from 'rc-menu';
import { IMenuItemProps } from './interface';
import MenuTitle from './MenuTitle';
import { MenuContext, SubMenuContext, getInlineIndent } from './MenuContext';
import Tooltip from '../tooltip';

export const MenuItem = (props: IMenuItemProps) => {
  const { icon, children, ...restProps } = props;
  const { verticalIndent, inlineCollapsed } = useContext(MenuContext);
  const { inSubMenu, inIconSubMenu } = useContext(SubMenuContext);
  const inlineIndent = getInlineIndent(verticalIndent, inSubMenu, inIconSubMenu);

  if (!inlineCollapsed || inSubMenu) {
    return (
      <RcMenuItem data-testid="menu-item" {...restProps} inlineIndent={inlineIndent}>
        <MenuTitle title={children} icon={icon} />
      </RcMenuItem>
    );
  }

  return (
    <Tooltip title={children} placement="right">
      {/* 新的 Tooltip 组件的定位方式需要 trigger 支持转发 ref，而 RcMenuItem 不支持转发 ref */}
      <span>
        <RcMenuItem data-testid="menu-item" {...restProps} inlineIndent={inlineIndent}>
          <MenuTitle title={children} icon={icon} />
        </RcMenuItem>
      </span>
    </Tooltip>
  );
};

export default MenuItem;
