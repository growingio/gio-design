import React, { cloneElement } from 'react';
import { isFunction, isUndefined } from 'lodash';
import Tooltip from '../tooltip';
import { DropdownProps } from './interface';
import useControlledState from '../../utils/hooks/useControlledState';

const Dropdown = (props: DropdownProps) => {
  const placementList = ['top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
  const {
    children,
    prefixCls,
    subPrefixCls = 'dropdown',
    placement = 'bottom',
    trigger = 'click',
    visible,
    onVisibleChange,
    overlay,
    ...rest
  } = props;
  const [controlledVisible, setControlledVisible] = useControlledState(visible, false);

  const getOverlay = () => {
    const _overlay: React.ReactElement = isFunction(overlay) ? overlay() : overlay;
    const onOverlayClick = (e: React.MouseEvent) => {
      setControlledVisible(false, true);
      onVisibleChange?.(false);
      _overlay.props.onClick?.(e);
    };
    return isUndefined(visible) ? cloneElement(_overlay, { onClick: onOverlayClick }) : _overlay;
  };

  return (
    <Tooltip
      prefixCls={prefixCls}
      subPrefixCls={subPrefixCls}
      trigger={trigger}
      placement={placementList.includes(placement) ? placement : 'bottom'}
      visible={controlledVisible}
      overlay={getOverlay()}
      onVisibleChange={(_visible) => {
        setControlledVisible(_visible);
        onVisibleChange?.(_visible);
      }}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

export default Dropdown;
