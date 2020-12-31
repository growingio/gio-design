import React, { useContext } from 'react';
import { IMenuTitle } from './interface';
import { MenuContext } from './MenuContext';

const MenuTitle: React.FC<IMenuTitle> = ({ icon, title }: IMenuTitle) => {
  const { prefixCls } = useContext(MenuContext);
  return (
    <>
      {icon && <span className={`${prefixCls}__icon`}>{icon}</span>}
      {icon ? <span>{title}</span> : title}
    </>
  );
};

export default MenuTitle;
