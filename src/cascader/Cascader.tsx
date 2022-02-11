import classNames from 'classnames';
import { isArray, isEmpty } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { usePrefixCls } from '@gio-design/utils';
import { List, OptionProps } from '../list';
import Popover from '../popover';
import useControlledState from '../utils/hooks/useControlledState';
import { CascaderProps } from './interfance';
import Trigger from './Trigger';
import { ListContext } from '../list/context';
import useChacheOptions from '../list/hooks/useCacheOptions';

export const Cascader: React.FC<CascaderProps> = ({
  options,
  value: controlledValue,
  defaultValue = undefined,
  visible: controlledVisible,
  onChange,
  prefixCls = 'cascader',
  getContainer,
  onVisibleChange,
  className,
  style,
  prefix,
  suffix,
  disabled,
  size,
  overlayClassName,
  contentClassName,
  overlayStyle,
  contentStyle,
  separator = '',
  valueSeparator = '.',
  placement = 'bottomLeft',
  children,
  strategy = 'fixed',
  itemStrategy = 'fixed',
  onClear,
  allowClear,
  title: controlledTitle,
  placeholder,
  triggerPrefix,
  triggerSuffix,
  maxWidth,
  hidePrefix,
  renderTrigger: propsRenderTrigger,
  empty,
  needEmpty = true,
  ...rest
}) => {
  const defaultPrefixCls = usePrefixCls(prefixCls);
  const [value, setValue] = useControlledState(controlledValue, defaultValue);
  const [visible, setVisible] = useControlledState(controlledVisible, false);
  const [title, setTitle] = useState('');
  const cache = useChacheOptions();

  const setOptions = useCallback((opts: OptionProps[]) => isArray(opts)?cache.setOptions(opts):null,[cache]);

  useEffect(() => {
    setOptions(options);
  },[options, setOptions])

  useEffect(() => {
    setTitle(cache.getLabelByValue(value, separator, valueSeparator, 'cascader'));
  }, [cache, separator, value, valueSeparator]);

  const handVisibleChange = (vis: boolean) => {
    setVisible(vis);
    onVisibleChange?.(vis);
  };

  const handleChange = (val?: string) => {
    onChange?.(val, cache?.getOptionTreeByValue(val, valueSeparator, 'cascader'));
    setValue(val as string);
    setVisible(false);
  };

  const handleOnClear = (e: React.MouseEvent<Element, MouseEvent>) => {
    onClear?.();
    onChange?.();
    handVisibleChange(false);
    e.stopPropagation();
  };

  const triggerClick = () => !disabled && setVisible(!visible);
  // trigger
  const renderTrigger = (): React.ReactElement => {
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
        data-testid="cascader"
        value={controlledTitle ?? title}
        placeholder={placeholder}
        prefix={!hidePrefix ? triggerPrefix : undefined}
        suffix={triggerSuffix}
        maxWidth={maxWidth}
        size={size}
        style={style}
        visible={visible}
        className={className}
        disabled={disabled}
        allowClear={allowClear}
        {...rest}
        onClear={handleOnClear}
        onClick={triggerClick}
        onInputChange={(val) => {
          isEmpty(val) && handleChange();
        }}
      />
    );
  };
  const renderOverlay = () => (
    <List
      {...rest}
      options={options}
      className={classNames(`${defaultPrefixCls}--list`, contentClassName)}
      prefix={prefix}
      suffix={suffix}
      style={contentStyle}
      model="cascader"
      itemStrategy={itemStrategy}
      empty={empty}
      needEmpty={needEmpty}
    >
      {children}
    </List>
  );

  return (
    <ListContext.Provider value={{ value, onChange: handleChange, setOptions, emptyNode: empty, isEmpty: needEmpty }}>
      <Popover
        content={renderOverlay()}
        trigger="click"
        visible={visible}
        onVisibleChange={handVisibleChange}
        getContainer={getContainer}
        overlayClassName={classNames(`${defaultPrefixCls}--content`, overlayClassName)}
        overlayStyle={overlayStyle}
        placement={placement}
        strategy={strategy}
      >
        {renderTrigger()}
      </Popover>
    </ListContext.Provider>
  );
};

export default Cascader;
