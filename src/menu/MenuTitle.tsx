import { isString } from 'lodash';
import React, { useContext } from 'react';
import { IMenuTitle } from './interface';
import { MenuContext } from './MenuContext';

const MenuTitle: React.FC<IMenuTitle> = ({ icon, title }: IMenuTitle) => {
  const { prefixCls } = useContext(MenuContext);
  return (
    <>
      {icon && <span className={`${prefixCls}__icon`}>{icon}</span>}
      <span className={`${prefixCls}__name`} title={isString(title) ? title : undefined}>
        {title}
      </span>
    </>
  );
};

export default MenuTitle;
