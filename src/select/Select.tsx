import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
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
    prefixCls = 'select',
    value: controlledValue,
    defaultValue = undefined,
    options = [],
    size,
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
    placeholder,
    triggerPrefix,
    triggerSuffix,
    maxWidth,
    hidePrefix = false,
    title: controlledTitle,
    allowClear,
    onClear,
    renderTrigger: propsRenderTrigger,
    autoWidth = true,
    // list props
    ...rest
  } = props;

  const defaultPrefixCls = usePrefixCls(prefixCls);
  const [value, setValue] = useControlledState(controlledValue, defaultValue);
  const [visible, setVisible] = useControlledState(controlledVisible, false);
  const [title, setTitle] = useState<string | React.ReactNode | undefined>(undefined);
  const [titlePrefix, setTitlePrefix] = useState<string | React.ReactNode>(undefined);
  const cache = useChacheOptions();
  const triggerRef = useRef<HTMLInputElement | undefined>(undefined);
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
      setTitlePrefix(activeOption?.prefix ?? triggerPrefix);
    }
  }, [activeOption?.prefix, controlledValue, hidePrefix, triggerPrefix]);

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
    onClear?.();
    handVisibleChange(false);
    e.stopPropagation();
  };

  const renderTrigger = () => {
    if (typeof propsRenderTrigger === 'function') {
      return propsRenderTrigger?.();
    }
    return (
      <Trigger
        size={size}
        value={controlledTitle ?? title}
        disabled={disabled}
        placeholder={placeholder}
        onInputChange={(val) => {
          isEmpty(val) && handleChange();
        }}
        ref={triggerRef as React.RefObject<HTMLInputElement>}
        style={style}
        className={className}
        prefix={titlePrefix}
        suffix={triggerSuffix}
        allowClear={allowClear}
        onClear={handleOnClear}
        maxWidth={maxWidth}
        onClick={() => !disabled && setVisible(!visible)}
      />
    );
  };
  const renderOverlay = () => (
    <List
      className={classNames(`${defaultPrefixCls}--list`, contentClassName)}
      style={{
        width: autoWidth ? Math.max(120, triggerRef?.current?.clientWidth || 0) : undefined,
        ...contentStyle,
      }}
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
        overlayStyle={overlayStyle}
        overlayClassName={classNames(`${defaultPrefixCls}--content`, overlayClassName)}
        placement={placement}
      >
        {renderTrigger()}
      </Popover>
    </ListContext.Provider>
  );
};

export default Select;
