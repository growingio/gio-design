import React, { useContext } from 'react';
import { IMenuTitle } from './interface';
import { MenuPrefixClsContext } from './MenuContext';

const MenuTitle: React.FC<IMenuTitle> = ({ icon, title }) => {
  const prefixCls = useContext(MenuPrefixClsContext);
  return (
    <>
      {icon && <span className={`${prefixCls}__icon`}>{icon}</span>}
      <span>{title}</span>
    </>
  );
};

export default MenuTitle;
