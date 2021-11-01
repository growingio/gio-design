import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { isUndefined } from 'lodash';
import usePrevious from '../utils/hooks/usePrevious';
import filterChildren from '../utils/filterChildren';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import Radio from './Radio';
import RadioGroupContext from './context';
import { IRadioGroupProps, RadioValueType } from './interface';
import WithRef from '../utils/withRef';

const InnerGroup: React.ForwardRefRenderFunction<HTMLDivElement, IRadioGroupProps> = (props: IRadioGroupProps, ref) => {
  const { className, style, layout = 'horizontal', disabled, defaultValue, value, onChange, children, options } = props;

  const prefixCls = usePrefixCls('radio-new');
  const [selectedValue, setSelectedValue] = useState(() => (!isUndefined(value) ? value : defaultValue));
  const prevSelectedValue = usePrevious(value);

  /**
   * （包括初次渲染）render 阶段结束后会检查 props.value 与 prevValue 的差异，并进行真实值的覆盖
   */
  useEffect(() => {
    if (!isUndefined(value) || value !== prevSelectedValue) {
      setSelectedValue(value);
    }
  }, [value, prevSelectedValue]);

  const getChildrenRadios = () =>
    filterChildren(children, (child) => {
      if (React.isValidElement(child)) {
        if (typeof child.type !== 'object' || (child.type as typeof Radio).displayName !== 'Radio') {
          console.error(
            'Warning: Children wrapped by RadioGroup component should be a Radio. Please check the Radio Component in your RadioGroup.'
          );
          return false;
        }
        if (!Reflect.has(child.props, 'value')) {
          console.error(
            'Warning: Radio wrapped by RadioGroup component which has no "value" prop will not be rendered. Please check the Radio Component in your RadioGroup.'
          );
          return false;
        }
        return true;
      }
      return false;
    });

  const renderRadio = () => {
    let renderedChildren: React.ReactNodeArray = [];
    if (options && options.length > 0) {
      renderedChildren = options
        .filter((_) => !!_)
        .map((opt) => {
          if (typeof opt === 'string') {
            return (
              <Radio key={`${prefixCls}-option-${opt}`} disabled={disabled} value={opt} checked={selectedValue === opt}>
                {opt}
              </Radio>
            );
          }

          return (
            <Radio
              key={`${prefixCls}-option-${opt.value}`}
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

  const wrapperCls = classnames(className, `${prefixCls}__group`, `${prefixCls}__group__${layout}`, {
    [`${prefixCls}__group__disabled`]: disabled,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.value) {
      setSelectedValue(e.target.value);
    }
    if (onChange && e.target.value !== prevSelectedValue) {
      onChange(e);
    }
  };

  return (
    <div style={style} className={wrapperCls} ref={ref}>
      <RadioGroupContext.Provider
        value={{
          disabled,
          value: selectedValue as RadioValueType,
          onChange: handleChange,
        }}
      >
        {renderRadio()}
      </RadioGroupContext.Provider>
    </div>
  );
};

export const RadioGroup = WithRef<HTMLDivElement, IRadioGroupProps>(InnerGroup);

export default RadioGroup;
