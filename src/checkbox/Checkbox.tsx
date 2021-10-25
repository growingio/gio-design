/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import classNames from 'classnames';
import CheckboxGroupContext from './CheckboxGroupContext';
import { CheckboxProps, CheckboxValueType } from './interface';
import WithRef from '../utils/withRef';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import useControlledState from '../utils/hooks/useControlledState';

const Checkbox = WithRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    indeterminate = false,
    defaultChecked = false,
    checked,
    disabled = false,
    color = 'transparent',
    value = '',
    children,
    className,
    style,
    onChange,
    ...restProps
  } = props;

  const checkboxProps: CheckboxProps = { ...restProps };

  const prefixCls = usePrefixCls('checkbox');

  const classes = classNames([className, prefixCls], {
    [`${prefixCls}-${checked ? 'checked' : ''}`]: checked,
    [`${prefixCls}-${indeterminate ? 'indeterminate' : ''}`]: indeterminate,
    [`${prefixCls}-${disabled ? 'disabled' : ''}`]: disabled,
  });

  const checkboxCls = classNames(className, {
    [`${prefixCls}-wrapper`]: true,
    [`${prefixCls}-wrapper-disabled`]: checkboxProps.disabled,
  });

  const [checkedStatus, setChecked] = useControlledState(checked, defaultChecked);

  const checkboxGroup = React.useContext(CheckboxGroupContext);

  const prevValue = React.useRef<CheckboxValueType>(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChange?.(e);
  };

  React.useEffect(() => {
    checkboxGroup?.registerValue(value);
  }, []);

  React.useEffect(() => {
    if (value !== prevValue.current) {
      checkboxGroup?.unRegisterValue(prevValue.current);
      checkboxGroup?.registerValue(value);
    }
    return () => checkboxGroup?.unRegisterValue(value);
  }, [value]);

  if (checkboxGroup) {
    checkboxProps.onChange = (...args) => {
      if (onChange) {
        onChange(...args);
      }
      if (checkboxGroup.toggleOption) {
        checkboxGroup.toggleOption({ label: children, value });
      }
    };
    checkboxProps.name = checkboxGroup.name;
    checkboxProps.checked = checkboxGroup.selectedValues.indexOf(value) !== -1;
    checkboxProps.disabled = disabled || checkboxGroup.disabled;
  }

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={checkboxCls}>
      <input
        type="checkbox"
        ref={ref}
        disabled={disabled}
        className={classes}
        indeterminate={indeterminate}
        value={value}
        checked={checkedStatus}
        onChange={handleChange}
        style={style}
        color={color}
        defaultChecked={defaultChecked}
        {...checkboxProps}
      />
      <span>{children}</span>
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  indeterminate: false,
  defaultChecked: false,
  disabled: false,
  color: 'transparent',
};

export default Checkbox;
