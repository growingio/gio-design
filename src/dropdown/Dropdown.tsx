import React, { cloneElement, Children, forwardRef } from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { get, isFunction, isUndefined, noop } from 'lodash';
import DropdownProps from './interface';
import useControlledState from '../utils/hooks/useControlledState';
import Popover from '../popover';
import { BUTTON_DISPLAY_NAME } from '../button/Button';
import { ICON_BUTTON_DISPLAY_NAME } from '../button/IconButton';

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const {
    children,
    placement = 'bottomLeft',
    trigger = 'click',
    defaultVisible = false,
    visible,
    onVisibleChange,
    content,
    overlayClassName,
    disabled,
    ...rest
  } = props;

  const [controlledVisible, setControlledVisible] = useControlledState(visible, defaultVisible);
  const prefixCls = usePrefixCls('dropdown');

  const getDropdownTrigger = () => {
    const child = Children.only(children);
    const childProps: {
      className?: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick?: (...args: any) => void;
      active?: boolean;
    } = {
      className: classnames(
        {
          'dropdown-active': controlledVisible,
        },
        child.props.className
      ),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick: (...args: any) => {
        setControlledVisible(!controlledVisible);
        child.props.onClick?.(...args);
      },
    };
    if ([BUTTON_DISPLAY_NAME, ICON_BUTTON_DISPLAY_NAME].includes(get(child.type, 'displayName'))) {
      childProps.active = child.props.active ?? controlledVisible;
    }
    return cloneElement(child, childProps);
  };

  const withoutPadding = (contentNode: DropdownProps['content']) => {
    if (React.isValidElement(contentNode)) {
      return React.cloneElement(contentNode, {
        className: classnames(`${prefixCls}-p-0`, contentNode.props.className),
      });
    }
    return contentNode;
  };

  const withOnClick = (contentNode: DropdownProps['content']) => {
    const close = () => {
      setControlledVisible(false);
      if (isFunction(onVisibleChange)) {
        onVisibleChange(false);
      }
    };
    const onClick = close;

    return (
      <div role="none" ref={ref} onKeyDown={noop} onClick={isUndefined(visible) ? onClick : noop}>
        {contentNode}
      </div>
    );
  };

  return (
    <Popover
      disabled={disabled}
      trigger={trigger}
      arrowPointAtCenter
      placement={placement}
      visible={controlledVisible}
      content={withOnClick(withoutPadding(content))}
      overlayClassName={classnames(prefixCls, overlayClassName)}
      onVisibleChange={(changedVisible) => {
        setControlledVisible(changedVisible);
        if (isFunction(onVisibleChange)) {
          onVisibleChange(changedVisible);
        }
      }}
      data-testid="dropdown"
      {...rest}
    >
      {getDropdownTrigger()}
    </Popover>
  );
});

export default Dropdown;
