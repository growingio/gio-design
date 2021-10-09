import React, { cloneElement, Children } from 'react';
import { isFunction, isUndefined } from 'lodash';
import classnames from 'classnames';
import Tooltip from '../../tooltip';
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

  const getDropdownTrigger = () => {
    const child = Children.only(children);
    return cloneElement(child, {
      className: classnames(controlledVisible ? 'dropdown-active' : '', child.props.className),
    });
  };

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
      {getDropdownTrigger()}
    </Tooltip>
  );
};

export default Dropdown;
