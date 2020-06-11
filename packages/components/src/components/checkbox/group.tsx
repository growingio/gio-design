import * as React from 'react';
import Checkbox, { CheckboxProps } from './checkbox';
import { ConfigContext } from '../config-provider';
import CheckboxGroupContext from './CheckboxGroupContext';

type CheckboxValueType = string | number | boolean;

export interface CheckboxOptionType {
  label: React.ReactNode;
  value: CheckboxValueType;
  disabled?: boolean;
  onChange?: CheckboxProps['onChange'];
}

export interface CheckboxGroupProps {
  defaultValue: CheckboxValueType[];
  disabled?: boolean;
  name: string;
  value?: CheckboxValueType[];
  onChange: (value: CheckboxValueType[]) => void;
  options?: Array<CheckboxOptionType>;
  style?: React.CSSProperties;
}

function merge(
  selected: CheckboxValueType[],
  option: CheckboxOptionType,
  registeredValues: CheckboxValueType[]
): CheckboxValueType[] {
  const optionIndex = selected.indexOf(option.value);
  const newSelected = [...selected].filter((val) => registeredValues.indexOf(val) !== -1);
  if (optionIndex === -1) {
    newSelected.push(option.value);
  } else {
    newSelected.splice(optionIndex, 1);
  }
  return newSelected;
}

const emptyValue: CheckboxValueType[] = [];
const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options = [],
  defaultValue,
  value,
  onChange,
  disabled = false,
  name,
  children,
}) => {
  const registeredValuesRef = React.useRef<CheckboxValueType[]>([]);

  const registerValue = React.useCallback((value: CheckboxValueType) => {
    registeredValuesRef.current.push(value);
  }, []);

  const unRegisterValue = React.useCallback((value: CheckboxValueType) => {
    registeredValuesRef.current = registeredValuesRef.current.filter((_) => _ !== value);
  }, []);

  const [selected, updateSelected] = React.useState(() => defaultValue || emptyValue);

  const refValue = React.useRef(value);
  // update outside maintained state
  if (refValue.current !== value && value) {
    refValue.current = value;
  }

  const toggleOption = React.useCallback(
    (option: CheckboxOptionType) => {
      if (value === undefined) {
        // self maintained state
        updateSelected((selected) => {
          const newSelected = merge(selected, option, registeredValuesRef.current);
          onChange?.(newSelected);
          return newSelected;
        });
      } else {
        const newSelected = merge(refValue.current || emptyValue, option, registeredValuesRef.current);
        onChange(newSelected);
      }
    },
    [onChange]
  );

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('checkbox');
  const selectedValues = refValue.current || selected || emptyValue;
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
          prefixCls={prefixCls}
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

  return (
    <CheckboxGroupContext.Provider value={{ toggleOption, selectedValues, name, registerValue, unRegisterValue }}>
      <div className={`${prefixCls}-group`}>{customChildren}</div>
    </CheckboxGroupContext.Provider>
  );
};

export default React.memo(CheckboxGroup);
