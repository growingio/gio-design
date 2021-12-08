import * as React from 'react';
import classNames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import Checkbox from './Checkbox';
import WithRef from '../utils/withRef';
import CheckboxGroupContext from './CheckboxGroupContext';
import { CheckboxOptionType, CheckboxValueType, CheckboxGroupProps } from './interface';

const InternalCheckboxGroup: React.ForwardRefRenderFunction<HTMLDivElement, CheckboxGroupProps<CheckboxValueType>> = (
  {
    options = [],
    prefixCls: customizePrefixCls,
    defaultValue,
    onChange,
    disabled = false,
    name,
    layout = 'horizontal',
    children,
    ...restProps
  },
  ref
) => {
  const [value, setValue] = React.useState<CheckboxValueType[]>(restProps.value || defaultValue || []);
  const [registeredValues, setRegisteredValues] = React.useState<CheckboxValueType[]>([]);

  React.useEffect(() => {
    if ('value' in restProps) {
      setValue(restProps.value || []);
    }
  }, [restProps, restProps.value]);

  const getOptions = () =>
    options.map((option) => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
        };
      }
      return option;
    });

  const unRegisterValue = (val: string) => {
    setRegisteredValues((prevValues) => prevValues.filter((v) => v !== val));
  };

  const registerValue = (val: string) => {
    setRegisteredValues((prevValues) => [...prevValues, val]);
  };

  const toggleOption = (option: CheckboxOptionType<CheckboxValueType>) => {
    const optionIndex = value.indexOf(option.value);
    const newValue = [...value];
    if (optionIndex === -1) {
      newValue.push(option.value);
    } else {
      newValue.splice(optionIndex, 1);
    }
    if (!('value' in restProps)) {
      setValue(newValue);
    }
    const opts = getOptions();
    onChange?.(
      newValue
        .filter((val) => registeredValues.indexOf(val) !== -1)
        .sort((a, b) => {
          const indexA = opts.findIndex((opt) => opt.value === a);
          const indexB = opts.findIndex((opt) => opt.value === b);
          return indexA - indexB;
        })
    );
  };

  const prefixCls = usePrefixCls('checkbox', customizePrefixCls);
  let customChildren = children;

  if (options && options.length > 0) {
    customChildren = getOptions().map((option) => (
      <Checkbox
        onChange={option.onChange}
        key={option.value.toString()}
        disabled={'disabled' in option ? option.disabled : disabled}
        value={option.value}
        checked={value.indexOf(option.value) !== -1}
      >
        {option.label}
      </Checkbox>
    ));
  }

  const cls = classNames(`${prefixCls}-group`, `${prefixCls}-group__${layout}`);

  const context = {
    toggleOption,
    selectedValues: value,
    disabled,
    name,
    registerValue,
    unRegisterValue,
  };

  return (
    <div ref={ref} className={cls} data-testid="checkboxGroup" {...restProps}>
      <CheckboxGroupContext.Provider value={context}>{customChildren}</CheckboxGroupContext.Provider>
    </div>
  );
};

const CheckboxGroup = WithRef<HTMLDivElement, CheckboxGroupProps<CheckboxValueType>>(InternalCheckboxGroup);

export default React.memo(CheckboxGroup);
