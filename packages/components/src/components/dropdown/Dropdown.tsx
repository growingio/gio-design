import React, { useContext, cloneElement } from 'react';
import Tooltip from '../tooltip';
import { DropdownProps } from './interface';
import { ConfigContext } from '../config-provider';
import useControlledState from '../../utils/hooks/useControlledState';
import { isFunction } from 'lodash';

const Dropdown = (props: DropdownProps) => {
  const {
    children,
    prefixCls: customizePrefixCls,
    placement = 'bottom',
    trigger = 'click',
    visible,
    onVisibleChange,
    overlay,
    ...rest
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('dropdown', customizePrefixCls);
  const [controlledVisible, setControlledVisible] = useControlledState(visible, false);

  const getOverlay = () => {
    const _overlay: React.ReactElement = isFunction(overlay) ? overlay() : overlay;
    const onOverlayClick = (e: React.MouseEvent) => {
      setControlledVisible(false, true);
      _overlay.props.onClick?.(e);
    };
    return cloneElement(_overlay, { onClick: onOverlayClick });
  };

  return (
    <Tooltip
      prefixCls={prefixCls}
      trigger={trigger}
      placement={placement}
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
