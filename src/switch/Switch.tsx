import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { get, isUndefined } from 'lodash';
import { usePrefixCls } from '@gio-design/utils';
import usePrevious from '../utils/hooks/usePrevious';
import filterChildren from '../utils/filterChildren';
import SwitchItem from './SwitchItem';
import SwitchContext from './context';
import { SwitchProps, SwitchItemValueType } from './interface';
import WithSubComponent from '../utils/withSubComponent';

const Switch = React.forwardRef<HTMLDivElement, SwitchProps>((props: SwitchProps, ref) => {
  const {
    className,
    style,
    disabled,
    defaultValue,
    value,
    onChange,
    children,
    options,
    size = 'normal',
    dataTestId = 'switch',
  } = props;

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
        if (typeof child.type !== 'object' || get(child, 'type.displayName') !== SwitchItem.displayName) {
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
    let renderedChildren: React.ReactNode[] = [];
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
    <div style={style} className={wrapperCls} ref={ref} data-testid={dataTestId}>
      <SwitchContext.Provider
        value={{
          disabled,
          value: selectedValue as SwitchItemValueType,
          onChange: handleChange,
        }}
      >
        {renderItems()}
      </SwitchContext.Provider>
    </div>
  );
});

// Switch.displayName = 'Switch';

export default WithSubComponent(Switch, {
  Item: SwitchItem,
});
