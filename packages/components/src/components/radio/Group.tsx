import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import usePrevious from '../../utils/hooks/usePrevious';
import filterChildren from '../../utils/filterChildren';
import Radio from './Radio';
import { RadioGroupProvider } from './context';
import { IRadioGroupProps, IRadioChangeEvent } from './interface';

const Group: React.FC<IRadioGroupProps> = (props) => {
  const {
    className,
    name,
    direction = 'horizontal',
    disabled,
    defaultValue,
    value,
    onChange,
    children,
    options,
  } = props;
  /**
   * 首次渲染完成前 defaultValue 会默认覆盖 value
   */
  let initValue;
  if (value !== undefined) {
    initValue = value;
  } else if (defaultValue !== undefined) {
    initValue = defaultValue;
  }

  const [selectedValue, setSelectedValue] = useState(initValue);
  const prevSelectedValue = usePrevious(value);

  /**
   * （包括初次渲染）render 阶段结束后会检查 props.value 与 prevValue 的差异，并进行真实值的覆盖
   */
  useEffect(() => {
    if (value !== undefined || value !== prevSelectedValue) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleChange = (e: IRadioChangeEvent) => {
    if (!Reflect.has(props, 'value')) {
      setSelectedValue(e.target.value);
    }

    if (!!onChange && e.target.value !== prevSelectedValue) {
      onChange(e);
    }
  };

  const getChildrenRadios = () => filterChildren(children, (child) => {
    if (React.isValidElement(child)) {
      if (typeof child.type !== 'object' || (child.type as typeof Radio).componentType !== 'GIO_RADIO') {
        console.error(
          'Warning: Children wrapped by RadioGroup component should be a Radio. Please check the Radio Component in your RadioGroup.',
        );
        return false;
      }
      if (!Reflect.has(child.props, 'value')) {
        console.error(
          'Warning: Radio wrapped by RadioGroup component which has no "value" prop will not be rendered. Please check the Radio Component in your RadioGroup.',
        );
        return false;
      }
      return true;
    }
    return false;
  });

  const radioRender = () => {
    let renderedChildren: React.ReactNodeArray = [];
    if (options && options.length > 0) {
      renderedChildren = options
        .filter((_) => !!_)
        .map((opt) => {
          if (typeof opt === 'string') {
            return (
              <Radio key={`gio-radio-option-${opt}`} disabled={disabled} value={opt} checked={selectedValue === opt}>
                {opt}
              </Radio>
            );
          }

          return (
            <Radio
              key={`gio-radio-option-${opt.value}`}
              disabled={disabled || opt.disabled}
              value={opt.value}
              checked={selectedValue === opt.value}
            >
              {opt.label}
            </Radio>
          );
        });
    }

    if (children) {
      renderedChildren = [...renderedChildren, ...getChildrenRadios()];
    }

    return renderedChildren;
  };

  const wrapperCls = classnames(className, 'gio-radio__group', `gio-radio__group--${direction}`, {
    'gio-radio__group--disabled': disabled,
  });

  return (
    <div className={wrapperCls}>
      <RadioGroupProvider
        value={{
          disabled,
          name,
          value: selectedValue,
          onChange: handleChange,
        }}
      >
        {radioRender()}
      </RadioGroupProvider>
    </div>
  );
};

export default Group;
