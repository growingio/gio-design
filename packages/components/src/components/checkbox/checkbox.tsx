/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import classNames from 'classnames';
import RcCheckbox from 'rc-checkbox';
import CheckOutlined from '@gio-design/icons/es/CheckOutlined';
import CheckboxGroupContext from './CheckboxGroupContext';
import { CheckboxProps } from './interface';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

const Checkbox: React.FC<CheckboxProps> = ({
  prefixCls: customizePrefixCls,
  className,
  children,
  style,
  indeterminate,
  onChange,
  ...restProps
}) => {
  const rcCheckbox = React.useRef(null);

  const checkGroup = React.useContext(CheckboxGroupContext);

  const handleChange = React.useCallback(
    (e) => {
      if (onChange) onChange(e);
      checkGroup?.toggleOption?.({ label: children, value: restProps.value });
    },
    [onChange]
  );

  const prefixCls = usePrefixCls('checkbox', customizePrefixCls);
  const checkProps: CheckboxProps = { ...restProps };

  if (checkGroup) {
    checkProps.name = checkGroup.name;
    checkProps.onChange = handleChange;
    checkProps.checked = !!checkGroup.selectedValues.find((_) => _ === restProps.value);
    checkProps.disabled = checkProps.disabled || checkGroup.disabled;
  }

  React.useEffect(() => {
    checkGroup?.registerValue(restProps.value);
    return () => {
      checkGroup?.unRegisterValue(restProps.value);
    };
  }, [restProps.value]);

  const checkboxCls = classNames(className, {
    [`${prefixCls}-wrapper`]: true,
    [`${prefixCls}-wrapper-disabled`]: checkProps.disabled,
  });

  const checkboxClass = classNames({
    [`${prefixCls}-indeterminate`]: indeterminate,
    [`${prefixCls}-cool`]: !(checkProps.disabled || checkProps.checked || checkProps.indeterminate),
  });

  const checkboxIconClass = classNames({
    [`${prefixCls}-icon`]: true,
    [`${prefixCls}-icon-indeterminate`]: indeterminate,
    [`${prefixCls}-icon-cool`]: !(checkProps.disabled || checkProps.checked || checkProps.indeterminate),
    [`${prefixCls}-icon-disabled`]: checkProps.disabled,
    [`${prefixCls}-icon-checked`]: checkProps.checked,
  });

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={checkboxCls} style={style}>
      <CheckOutlined className={checkboxIconClass} />
      <RcCheckbox
        {...(checkProps as any)}
        prefixCls={prefixCls}
        ref={rcCheckbox}
        type="checkbox"
        className={checkboxClass}
        onChange={handleChange}
      />
      {children !== undefined ? <span>{children}</span> : null}
    </label>
  );
};

export default React.memo(Checkbox);
