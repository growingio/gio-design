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
import { convertChildrenToData } from '../list/util';
import useChacheOptions from '../list/hooks/useCacheOptions';

const Select: React.FC<SelectProps> = (props) => {
  const {
    prefixCls = 'select--new',
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
    // list props
    ...rest
  } = props;

  const defaultPrefixCls = usePrefixCls(prefixCls);
  const [value, setValue] = useControlledState(controlledValue, defaultValue);
  const [visible, setVisible] = useControlledState(controlledVisible, false);
  const [title, setTitle] = useState<string | React.ReactNode | undefined>(undefined);
  const cache = useChacheOptions();

  // options
  const nodesToOptions = useMemo<OptionProps[]>(() => convertChildrenToData(children), [children]);
  const mergedOptions = useMemo(() => [...nodesToOptions, ...options], [nodesToOptions, options]);
  cache.setOptions(mergedOptions);
  const activeOption = useMemo(() => cache.getOptionByValue(value), [cache, value]);

  // update trigger value
  useEffect(() => {
    setTitle(activeOption?.label);
  }, [activeOption?.label]);

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
        style={triggerStyle}
        {...omit(triggerProps, 'style')}
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
