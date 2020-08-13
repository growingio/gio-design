import React from 'react';
import { Item as RcMenuItem } from 'rc-menu';
import { IMenuItemProps } from './interface';
import MenuTitle from './MenuTitle';

const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const { icon, children, ...restProps } = props;

  return (
    <RcMenuItem {...restProps} inlineIndent={16}>
      <MenuTitle title={children} icon={icon} />
    </RcMenuItem>
  );
};

export default MenuItem;
