import React, { useContext } from 'react';
import Tooltip from '../tooltip';
import { DropdownProps } from './interface';
import { ConfigContext } from '../config-provider';
import useControlledState from '../../utils/hooks/useControlledState';

const Dropdown = (props: DropdownProps) => {
  const {
    children,
    prefixCls: customizePrefixCls,
    placement = 'bottom',
    trigger = 'click',
    visible,
    onVisibleChange,
    ...rest
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('dropdown', customizePrefixCls);
  const [controlledVisible, setControlledVisible] = useControlledState(visible, false);

  return (
    <Tooltip
      prefixCls={prefixCls}
      trigger={trigger}
      placement={placement}
      visible={controlledVisible}
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
