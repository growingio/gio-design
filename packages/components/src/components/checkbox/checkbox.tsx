import * as React from 'react';
import classNames from 'classnames';
import RcCheckbox from 'rc-checkbox';
import { ConfigContext } from '../config-provider';
import CheckboxGroupContext from './CheckboxGroupContext';
import { CheckboxProps } from './interface';

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

  const { getPrefixCls } = React.useContext(ConfigContext);
  const checkGroup = React.useContext(CheckboxGroupContext);

  const handleChange = React.useCallback(
    (e) => {
      if (onChange) onChange(e);
      checkGroup?.toggleOption?.({ label: children, value: restProps.value });
    },
    [onChange]
  );

  const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
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
    <label className={checkboxCls} style={style}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 7" className={checkboxIconClass}>
        <g>
          <g>
            <path d="M3.5,7a.47.47,0,0,1-.35-.15l-3-3a.48.48,0,0,1,0-.7.48.48,0,0,1,.7,0L3.5,5.79,9.15.15a.48.48,0,0,1,.7,0,.48.48,0,0,1,0,.7l-6,6A.47.47,0,0,1,3.5,7Z" />
          </g>
        </g>
      </svg>
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
