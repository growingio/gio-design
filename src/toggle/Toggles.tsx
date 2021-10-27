/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { isUndefined } from 'lodash';
import useControlledState from '../utils/hooks/useControlledState';
import { TogglesProps } from './interface';
import WithRef from '../utils/withRef';

const InnerToggle: React.ForwardRefRenderFunction<HTMLInputElement, TogglesProps> = (props, ref) => {
  const { defaultOn = false, on, disabled, className, checkedChildren, uncheckedChildren, onChange } = props;
  const prefixCls = usePrefixCls('toggle-new');

  const [status, setStatus] = useControlledState<boolean>(on, defaultOn);

  useEffect(() => {
    if (!isUndefined(on)) {
      setStatus(on);
    }
  }, [on]);

  const onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      setStatus(e.target.checked);
      onChange?.(e);
    }
  };

  const wrapperCls = classnames({ [`${prefixCls}-disabled`]: disabled }, `${prefixCls}-normal`, className);

  return (
    <label aria-hidden="true" className={wrapperCls}>
      <input
        disabled={disabled}
        type="checkbox"
        className={classnames(`${prefixCls}`)}
        onChange={onChangeStatus}
        ref={ref}
      />
      <span className={classnames(`${prefixCls}-suffixContent`)}>{status ? checkedChildren : uncheckedChildren}</span>
    </label>
  );
};

const Toggle = WithRef<HTMLInputElement, TogglesProps>(InnerToggle);

Toggle.displayName = 'Toggle';

export default Toggle;
