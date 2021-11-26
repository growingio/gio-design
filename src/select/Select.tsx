import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { isEmpty, isObject, omit } from 'lodash';
import { SelectProps } from './interface';
import Popover from '../popover';
import Trigger from './Trigger';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import List, { OptionProps } from '../list';
import useControlledState from '../utils/hooks/useControlledState';
import './style/index';
import { ListContext } from '../list/context';
import { convertChildrenToData, convertOptions } from '../list/util';
import useChacheOptions from '../list/hooks/useCacheOptions';

const Select: React.FC<SelectProps> = (props) => {
  const {
    prefixCls = 'select-',
    value: controlledValue,
    defaultValue = undefined,
    options = [],
    size,
    triggerProps,
    visible: controlledVisible,
    onVisibleChange,
    getContainer,
    onChange,
    prefix,
    suffix,
    overlayClassName,
    contentClassName,
    overlayStyle,
    contentStyle,
    className,
    style,
    placement = 'bottomLeft',
    disabled,
    children,
    hidePrefix = false,
    // list props
    ...rest
  } = props;

  const defaultPrefixCls = usePrefixCls(prefixCls);
  const [value, setValue] = useControlledState(controlledValue, defaultValue);
  const [visible, setVisible] = useControlledState(controlledVisible, false);
  const [title, setTitle] = useState<string | React.ReactNode | undefined>(undefined);
  const [triggerPrefix, setTriggerPrefix] = useState<string | React.ReactNode>(undefined);
  const cache = useChacheOptions();

  // options
  const nodesToOptions = useMemo<OptionProps[]>(
    () => convertChildrenToData(children, { prefix, suffix }),
    [children, prefix, suffix]
  );
  const convertedOptions = useMemo(() => convertOptions(options, { prefix, suffix }), [options, prefix, suffix]);
  const mergedOptions = useMemo(() => [...nodesToOptions, ...convertedOptions], [nodesToOptions, convertedOptions]);
  cache.setOptions(mergedOptions);
  const activeOption = useMemo(() => cache.getOptionByValue(value), [cache, value]);

  // update trigger value
  useEffect(() => {
    setTitle(activeOption?.label);
  }, [activeOption?.label]);

  useEffect(() => {
    if (!hidePrefix) {
      setTriggerPrefix(activeOption?.prefix ?? triggerProps?.prefix);
    }
  }, [activeOption?.prefix, controlledValue, hidePrefix, triggerProps?.prefix]);

  const handVisibleChange = (vis: boolean) => {
    setVisible(vis);
    onVisibleChange?.(vis);
  };

  const handleChange = (val?: string, opts?: OptionProps) => {
    onChange?.(val, opts);
    setValue(val);
    setVisible(false);
  };

  const handleOnClear = (e: React.MouseEvent<Element, MouseEvent>) => {
    handVisibleChange(false);
    e.stopPropagation();
  };

  const triggerStyle: React.CSSProperties = isObject(triggerProps?.style)
    ? { width: '100%', ...triggerProps?.style }
    : { width: '100%' };

  const renderTrigger = () => (
    <div
      className={classNames(`${prefixCls}--trigger`, className)}
      style={style}
      aria-hidden="true"
      onClick={() => setVisible(!visible)}
    >
      <Trigger
        value={title}
        size={size}
        disabled={disabled}
        onClear={handleOnClear}
        onInputChange={(val) => {
          isEmpty(val) && handleChange();
        }}
        prefix={triggerPrefix}
        style={triggerStyle}
        {...omit(triggerProps, 'style', 'prefix')}
      />
    </div>
  );

  const renderOverlay = () => (
    <List
      className={classNames(`${defaultPrefixCls}--list`, contentClassName)}
      style={contentStyle}
      prefix={prefix}
      suffix={suffix}
      options={mergedOptions}
      disabled={disabled}
      {...rest}
    />
  );

  return (
    <ListContext.Provider value={{ value, onChange: handleChange }}>
      <Popover
        distoryOnHide={false}
        content={renderOverlay()}
        trigger="click"
        visible={visible}
        onVisibleChange={handVisibleChange}
        getContainer={getContainer}
        overlayClassName={classNames(`${defaultPrefixCls}--content`, overlayClassName)}
        overlayStyle={overlayStyle}
        placement={placement}
      >
        {renderTrigger()}
      </Popover>
    </ListContext.Provider>
  );
};

export default Select;
