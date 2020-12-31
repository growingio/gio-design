import * as React from 'react';
import classNames from 'classnames';
import { CaretDownOutlined } from '@gio-design/icons';
import { GioTreeNodeProps } from './Tree';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function renderSwitcherIcon(
  prefixCls: string,
  switcherIcon: React.ReactNode | null | undefined,
  { isLeaf }: GioTreeNodeProps,
) {
  if (isLeaf) {
    return null;
  }
  const switcherCls = `${prefixCls}-switcher-icon`;
  if (React.isValidElement(switcherIcon)) {
    return React.cloneElement(switcherIcon, { className: classNames(switcherIcon.props.className || '', switcherCls) });
  }

  if (switcherIcon) {
    return switcherIcon;
  }

  return <CaretDownOutlined className={switcherCls} />;
}
