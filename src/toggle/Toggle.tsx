import React, { useEffect } from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { isUndefined, omit } from 'lodash';
import useControlledState from '../utils/hooks/useControlledState';
import { ToggleProps } from './interface';
import WithRef from '../utils/withRef';

const InnerToggle: React.ForwardRefRenderFunction<HTMLInputElement, ToggleProps> = (props, ref) => {
  const {
    defaultOn = false,
    on,
    disabled,
    className,
    checkedChildren,
    uncheckedChildren,
    onChange,
    style,
    dataTestId: legacyDataTestId = 'toggle',
    'data-testid': dataTestId = 'toggle',
    children,
    ...otherProps
  } = props;
  const prefixCls = usePrefixCls('toggle');

  const [status, setStatus] = useControlledState<boolean>(on, defaultOn);

  useEffect(() => {
    if (!isUndefined(on)) {
      setStatus(on);
    }
  }, [on, setStatus]);

  const onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      setStatus(e.target.checked);
      onChange?.(e);
    }
  };

  const wrapperCls = classnames({ [`${prefixCls}-disabled`]: disabled }, `${prefixCls}-normal`, className);

  return (
    <label aria-hidden="true" className={wrapperCls} style={style} data-testid={legacyDataTestId ?? dataTestId}>
      <input
        disabled={disabled}
        type="checkbox"
        className={classnames(`${prefixCls}`)}
        onChange={onChangeStatus}
        ref={ref}
        checked={status}
        {...omit(otherProps, 'size')}
      />
      <span className={classnames(`${prefixCls}-suffixContent`)}>
        {(status ? checkedChildren : uncheckedChildren) ?? children}
      </span>
    </label>
  );
};

export const Toggle = WithRef<HTMLInputElement, ToggleProps>(InnerToggle);

Toggle.displayName = 'Toggle';

export default Toggle;
