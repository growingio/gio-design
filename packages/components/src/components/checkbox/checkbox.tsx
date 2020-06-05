import * as React from 'react';
import classNames from 'classnames';
import RcCheckbox from 'rc-checkbox';
import { ConfigContext } from '../config-provider';
import CheckboxGroupContext from './CheckboxGroupContext';

type CheckboxChangeEvent = React.ChangeEvent<HTMLInputElement>;
export interface CheckboxProps {
  /**
   * 是否部分选中
   */
  indeterminate?: boolean;
  prefixCls?: string;
  /**
   * 自定义 className
   */
  className?: string;
  /**
   * 初始是否选中
   */
  defaultChecked?: boolean;
  /**
   * 指定当前是否选中	
   */
  checked?: boolean;
  /**
   * 是否禁止
   */
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  value?: any;
  children?: React.ReactNode;
  id?: string;
  name?: string;
  style?: React.CSSProperties;
}

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

  const handleChange = React.useCallback((e: CheckboxChangeEvent) => {
    if (onChange) onChange(e);
    checkGroup && checkGroup.toggleOption && checkGroup.toggleOption({ label: children, value: restProps.value })
  }, [onChange]);

  const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
  const checkProps: CheckboxProps = { ...restProps };
  
  if (checkGroup) {
    checkProps.name = checkGroup.name;
    checkProps.onChange = handleChange;
    checkProps.checked = !!checkGroup.selectedValues.find(_ => _ === restProps.value);
    checkProps.disabled = checkProps.disabled || checkGroup.disabled;
  }

  React.useEffect(() => {
    (checkGroup) && checkGroup.registerValue(restProps.value);
    return () => {
      checkGroup && checkGroup.unRegisterValue(restProps.value);
    }
  }, [restProps.value]);

  const checkboxCls = classNames(className, {
    [`${prefixCls}-wrapper`]: true,
  });

  const checkboxClass = classNames({
    [`${prefixCls}-indeterminate`]: indeterminate,
  });

  return (
    <label
      className={checkboxCls}
      style={style}
    >
      <RcCheckbox 
        {...checkProps as any}
        prefixCls={prefixCls}
        ref={rcCheckbox}
        type='checkbox'
        className={checkboxClass} 
        onChange={handleChange}
      />
      {children !== undefined ? <span>{children}</span> : null}
    </label>
  );
};

export default React.memo(Checkbox);