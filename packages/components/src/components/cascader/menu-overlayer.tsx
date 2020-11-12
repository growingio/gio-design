import React, { useEffect } from 'react';
import classNames from 'classnames';

import { withPrefix } from './helper';
import Menu, { Props as MenuProps } from './menu';

export interface Props extends Omit<MenuProps, 'depth' | 'onClick' | 'parentsData'> {
  originOnClick?: MenuProps['onClick']; // 未被劫持的原始事件
  onClick?: (e: MouseEvent) => void; // 被 dropdown 劫持的 onClick 事件
}

const MenuOverlayer = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, onClick, originOnClick, ...others } = props;
  const withMenuCls = withPrefix('cascader-menu');

  useEffect(() => {
    document.body.addEventListener('click', (e: MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains('gio-cascader-dropdown')) {
        onClick?.(e);
      }
    });
  }, [onClick]);

  return (
    <div className={classNames(className, withMenuCls('list'))} ref={ref}>
      <Menu {...others} onClick={originOnClick} />
    </div>
  );
});

export default React.memo(MenuOverlayer);
