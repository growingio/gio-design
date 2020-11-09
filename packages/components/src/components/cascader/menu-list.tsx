import React, { useEffect } from 'react';
import classNames from 'classnames';

import { Value } from './menu-item';
import { withPrefix } from './helper';
import Menu, { Props as MenuProps } from './menu';

export interface Props extends Omit<MenuProps, 'onClick'> {
  value?: Value;
  header?: React.ReactElement;
  footer?: React.ReactElement;
  origintOnClick?: MenuProps['onClick']; // 未被劫持的原始事件
  onClick?: (e: MouseEvent) => void; // 被 dropdown 劫持的 onClick 事件
}

const MenuList = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, dataSource, header, footer, onClick, origintOnClick, ...others } = props;
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
      <div className={withMenuCls('header')}>{header}</div>
      <div className={withMenuCls('group')}>
        <Menu dataSource={dataSource} {...others} onClick={origintOnClick} />
      </div>
      <div className={withMenuCls('footer')}>{footer}</div>
    </div>
  );
});

export default React.memo(MenuList);
