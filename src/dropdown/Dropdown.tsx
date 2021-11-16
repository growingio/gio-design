import React, { cloneElement, Children, forwardRef } from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { isFunction, isUndefined } from 'lodash';
import DropdownProps from './interface';
import useControlledState from '../utils/hooks/useControlledState';
import Popover from '../popover';

export function Dropdown<T = HTMLElement>(props: DropdownProps, ref: React.ForwardedRef<T>): React.ReactElement {
  const {
    children,
    placement = 'bottomLeft',
    trigger = 'click',
    defaultVisible = false,
    visible,
    onVisibleChange,
    content,
    overlayClassName,
    ...rest
  } = props;

  const [controlledVisible, setControlledVisible] = useControlledState(visible, defaultVisible);
  const prefixCls = usePrefixCls('dropdown-new');

  const getDropdownTrigger = () => {
    const child = Children.only(children);
    return cloneElement(child as React.ReactElement, {
      className: classnames(
        {
          'dropdown-active': controlledVisible,
        },
        (child as React.ReactElement).props.className,
        ref
      ),
    });
  };

  const withOnClick = (contentNode: DropdownProps['content']) => {
    const close = () => {
      setControlledVisible(false);
      if (isFunction(onVisibleChange)) {
        onVisibleChange(false);
      }
    };
    const onClick = close;
    const onKeyDown = ({ key }: React.KeyboardEvent<HTMLDivElement>) => {
      if ([' ', 'Enter', 'Escape'].includes(key)) {
        close();
      }
    };
    return (
      <div role="button" tabIndex={0} onClick={isUndefined(visible) ? onClick : undefined} onKeyDown={onKeyDown}>
        {contentNode}
      </div>
    );
  };

  return (
    <Popover
      trigger={trigger}
      arrowPointAtCenter
      placement={placement}
      visible={controlledVisible}
      content={withOnClick(content)}
      overlayClassName={classnames(prefixCls, overlayClassName)}
      onVisibleChange={(changedVisible) => {
        setControlledVisible(changedVisible);
        if (isFunction(onVisibleChange)) {
          onVisibleChange(changedVisible);
        }
      }}
      {...rest}
    >
      {getDropdownTrigger()}
    </Popover>
  );
}

// 支持 ForwardRef 传入泛型
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ForwardRefFn = <T = HTMLElement>(
  props: React.PropsWithChildren<DropdownProps> & React.RefAttributes<T>
) => React.ReactElement;

export default forwardRef(Dropdown) as ForwardRefFn;
