import React, { useMemo, useRef } from 'react';
import classNames from 'classnames';
import { omit } from 'lodash';
import { usePrefixCls } from '@gio-design/utils';
import { SelectProps } from './interface';
import Popover from '../popover';
import Trigger from '../list-picker/Trigger';
import List, { OptionProps } from '../list';
import useControlledState from '../utils/hooks/useControlledState';
import { ListContext } from '../list/context';
import { convertChildrenToData, convertOptions } from '../list/util';
import useCacheOptions from '../list/hooks/useCacheOptions';

const Select: React.FC<SelectProps> & { isSelect?: boolean } = (props) => {
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
    disabled = false,
    children,
    placeholder,
    triggerPrefix,
    triggerSuffix,
    maxWidth,
    hidePrefix = false,
    allowClear,
    title,
    onClear,
    customTrigger: propsRenderTrigger,
    autoWidth = false,
    empty,
    needEmpty = true,
    // list props
    ...rest
  } = props;

  const defaultPrefixCls = usePrefixCls(prefixCls);
  const [value, setValue] = useControlledState(controlledValue, defaultValue);
  const [visible, setVisible] = useControlledState(controlledVisible, false);
  const { options: cacheOptions, setOptions, getOptionByValue, getLabelByValue, getOptionsByValue } = useCacheOptions();
  const triggerRef = useRef<HTMLInputElement | undefined>(undefined);
  // options
  const nodesToOptions = useMemo<OptionProps[]>(
    () => convertChildrenToData(children, { prefix, suffix }),
    [children, prefix, suffix]
  );
  const convertedOptions = useMemo(() => convertOptions(options, { prefix, suffix }), [options, prefix, suffix]);
  const mergedOptions = useMemo(() => [...nodesToOptions, ...convertedOptions], [nodesToOptions, convertedOptions]);
  // 如果不是children 的话 需要在这里进行收集
  setOptions(mergedOptions);
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
    onChange?.();
    setValue(undefined, true);
    handVisibleChange(false);
    e.stopPropagation();
  };
  const triggerClick = () => !disabled && setVisible(!visible);

  const renderTrigger = () => {
    if (typeof propsRenderTrigger === 'function') {
      const node = propsRenderTrigger?.();
      return React.cloneElement(node, {
        onClick: (e: MouseEvent) => {
          node?.props?.onClick?.(e);
          triggerClick();
        },
      });
    }
    return (
      <Trigger
        size={size}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        ref={triggerRef as React.RefObject<HTMLInputElement>}
        style={style}
        className={className}
        prefix={triggerPrefix}
        suffix={triggerSuffix}
        allowClear={allowClear}
        onClear={handleOnClear}
        visible={visible}
        maxWidth={maxWidth}
        hidePrefix={hidePrefix}
        title={title}
        onClick={triggerClick}
        data-testid={rest?.['data-testid'] ? rest?.['data-testid'] : 'select'}
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
      model="single"
      prefix={prefix}
      suffix={suffix}
      options={mergedOptions}
      disabled={disabled}
      empty={empty}
      needEmpty={needEmpty}
      {...omit({ ...rest }, 'data-testid')}
    />
  );

  return (
    <ListContext.Provider
      value={{
        value,
        options: cacheOptions,
        isEmpty: needEmpty,
        emptyNode: empty,
        isSelection: false,
        getLabelByValue,
        getOptionByValue,
        getOptionsByValue,
        onChange: handleChange,
        setOptions,
      }}
    >
      <Popover
        disabled={disabled}
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
Select.isSelect = true;
export default Select;
