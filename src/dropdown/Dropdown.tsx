import React, { cloneElement, Children, forwardRef } from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { isFunction, isUndefined, noop } from 'lodash';
import DropdownProps from './interface';
import useControlledState from '../utils/hooks/useControlledState';
import Popover from '../popover';
import IconButton from '../button/IconButton';
import Button from '../button';

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
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
    },
    ref
  ) => {
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
      if (Object.is(child, Button) || Object.is(child, IconButton)) {
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
  }
);

export default Dropdown;
