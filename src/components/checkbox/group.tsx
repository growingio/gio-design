/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import classNames from 'classnames';
import Checkbox from './checkbox';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import CheckboxGroupContext from './CheckboxGroupContext';
import { CheckboxOptionType, CheckboxValueType, CheckboxGroupProps } from './interface';

function merge<T>(selected: T[], option: CheckboxOptionType<T>, registeredValues: T[]): T[] {
  const optionIndex = selected.indexOf(option.value);
  const newSelected = [...selected].filter((val) => registeredValues.indexOf(val) !== -1);
  if (optionIndex === -1) {
    newSelected.push(option.value);
  } else {
    newSelected.splice(optionIndex, 1);
  }
  return newSelected;
}

const emptyValue: any[] = [];

function CheckboxGroup<T extends CheckboxValueType>({
  options = [],
  prefixCls: customizePrefixCls,
  defaultValue,
  value,
  onChange,
  disabled = false,
  name,
  direction = 'horizontal',
  children,
}: CheckboxGroupProps<T>) {
  const registeredValuesRef = React.useRef<T[]>([]);

  const registerValue = React.useCallback((values: T) => {
    registeredValuesRef.current.push(values);
  }, []);

  const unRegisterValue = React.useCallback((values: T) => {
    registeredValuesRef.current = registeredValuesRef.current.filter((_) => _ !== values);
  }, []);

  // self maintained state
  const [selected, updateSelected] = React.useState<T[]>(() => defaultValue || emptyValue);

  const refValue = React.useRef(value);

  // update outside maintained state
  if (refValue.current !== value && value) {
    refValue.current = value;
  }

  const toggleOption = React.useCallback(
    (option: CheckboxOptionType<T>) => {
      if (value === undefined) {
        // self maintained state
        updateSelected((selecting) => {
          const newSelected = merge(selecting, option, registeredValuesRef.current);
          onChange?.(newSelected);
          return newSelected;
        });
      } else {
        const newSelected = merge(refValue.current || emptyValue, option, registeredValuesRef.current);
        onChange?.(newSelected);
      }
    },
    [onChange]
  );

  const prefixCls = usePrefixCls('checkbox', customizePrefixCls);
  const selectedValues = refValue.current || selected || (emptyValue as T[]);
  let customChildren = children;
  if (options.length > 0) {
    customChildren = options
      .map((option) => {
        if (typeof option === 'string') {
          return {
            label: option,
            value: option,
          };
        }
        return option;
      })
      .map((option) => (
        <Checkbox
          prefixCls={customizePrefixCls}
          key={option.value.toString()}
          disabled={'disabled' in option ? option.disabled : disabled}
          value={option.value}
          checked={selectedValues.indexOf(option.value) !== -1}
          onChange={option.onChange}
        >
          {option.label}
        </Checkbox>
      ));
  }

  const cls = classNames(`${prefixCls}-group`, `${prefixCls}-group--${direction}`);

  return (
    <CheckboxGroupContext.Provider
      value={{
        toggleOption,
        selectedValues,
        name,
        registerValue,
        unRegisterValue,
      }}
    >
      <div className={cls}>{customChildren}</div>
    </CheckboxGroupContext.Provider>
  );
}

export default CheckboxGroup;
