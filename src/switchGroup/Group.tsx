import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { isUndefined } from 'lodash';
import usePrevious from '../utils/hooks/usePrevious';
import filterChildren from '../utils/filterChildren';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import SwitchItem from './SwitchItem';
import SwitchGroupContext from './context';
import { ISwitchGroupProps, SwitchItemValueType } from './interface';
import WithRef from '../utils/withRef';

const InnerGroup: React.ForwardRefRenderFunction<HTMLDivElement, ISwitchGroupProps> = (
  props: ISwitchGroupProps,
  ref
) => {
  const { className, style, disabled, defaultValue, value, onChange, children, options, size = 'normal' } = props;

  const prefixCls = usePrefixCls('switch');
  const [selectedValue, setSelectedValue] = useState(() => (!isUndefined(value) ? value : defaultValue));
  const prevSelectedValue = usePrevious(value);

  useEffect(() => {
    if (!isUndefined(value) || value !== prevSelectedValue) {
      setSelectedValue(value);
    }
  }, [value, prevSelectedValue]);

  const getChildrenItems = () =>
    filterChildren(children, (child) => {
      if (React.isValidElement(child)) {
        if (typeof child.type !== 'object' || (child.type as typeof SwitchItem).displayName !== 'Switch') {
          return false;
        }
        if (!Reflect.has(child.props, 'value')) {
          return false;
        }
        return true;
      }
      return false;
    });

  const renderItems = () => {
    let renderedChildren: React.ReactNodeArray = [];
    if (options && options.length > 0) {
      renderedChildren = options
        .filter((_) => !!_)
        .map((opt) => {
          if (typeof opt === 'string') {
            return (
              <SwitchItem
                key={`${prefixCls}-option-${opt}`}
                disabled={disabled}
                value={opt}
                checked={selectedValue === opt}
              >
                {opt}
              </SwitchItem>
            );
          }

          return (
            <SwitchItem
              key={`${prefixCls}-option-${opt.value}`}
              disabled={disabled || opt.disabled}
              value={opt.value}
              checked={selectedValue === opt.value}
            >
              {opt.label}
            </SwitchItem>
          );
        });
    }

    if (children) {
      renderedChildren = [...renderedChildren, ...getChildrenItems()];
    }

    return renderedChildren;
  };

  const wrapperCls = classnames(className, `${prefixCls}__group`, {
    [`${prefixCls}__group__disabled`]: disabled,
    [`${prefixCls}__group_${size}`]: size,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!value) {
      setSelectedValue(e.target.value);
    }
    if (onChange && e.target.value !== prevSelectedValue) {
      onChange(e);
    }
  };

  return (
    <div style={style} className={wrapperCls} ref={ref}>
      <SwitchGroupContext.Provider
        value={{
          disabled,
          value: selectedValue as SwitchItemValueType,
          onChange: handleChange,
        }}
      >
        {renderItems()}
      </SwitchGroupContext.Provider>
    </div>
  );
};

export const SwitchGroup = WithRef<HTMLDivElement, ISwitchGroupProps>(InnerGroup);

export default SwitchGroup;
