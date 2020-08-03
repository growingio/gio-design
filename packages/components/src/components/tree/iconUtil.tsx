import * as React from 'react';
import classNames from 'classnames';
import { CaretDownFilled } from '@gio-design/icons';
import { GioTreeNodeProps } from '../Tree';
import { isValidElement, cloneElement } from 'React';

export default function renderSwitcherIcon(
  prefixCls: string,
  switcherIcon: React.ReactNode | null | undefined,
  { isLeaf }: GioTreeNodeProps
) {
  if (isLeaf) {
    return null;
  }
  const switcherCls = `${prefixCls}-switcher-icon`;
  if (isValidElement(switcherIcon)) {
    return cloneElement(switcherIcon, {
      className: classNames(switcherIcon.props.className || '', switcherCls),
    });
  }

  if (switcherIcon) {
    return switcherIcon;
  }

  return <CaretDownFilled className={switcherCls} />;
}
