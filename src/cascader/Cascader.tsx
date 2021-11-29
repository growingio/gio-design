import classNames from 'classnames';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { List, OptionProps } from '../list';
import Popover from '../popover';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
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
  prefixCls = 'cascader-',
  getContainer,
  onVisibleChange,
  triggerProps,
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
  placement = 'bottomLeft',
  children,
  strategy = 'fixed',
  ...rest
}) => {
  const defaultPrefixCls = usePrefixCls(prefixCls);
  const [value, setValue] = useControlledState(controlledValue, defaultValue);
  const [visible, setVisible] = useControlledState(controlledVisible, false);
  const [title, setTitle] = useState('');
  const cache = useChacheOptions();

  const setOptions = (opts: OptionProps[]) => cache.setOptions(opts);

  useEffect(() => {
    setTitle(cache.getLabelByValue(value, separator));
  }, [cache, separator, value]);

  const handVisibleChange = (vis: boolean) => {
    setVisible(vis);
    onVisibleChange?.(vis);
  };

  const handleChange = (val?: string) => {
    onChange?.(val, cache?.getOptionTreeByValue(val));
    setValue(val as string);
    setVisible(false);
  };

  const handleOnClear = (e: React.MouseEvent<Element, MouseEvent>) => {
    handVisibleChange(false);
    e.stopPropagation();
  };

  const renderTrigger = () => (
    <div
      className={classNames(`${defaultPrefixCls}-trigger`, className)}
      style={style}
      aria-hidden="true"
      onClick={() => !disabled && setVisible(!visible)}
    >
      <Trigger
        value={title}
        size={size}
        disabled={disabled}
        onClear={handleOnClear}
        onInputChange={(val) => {
          isEmpty(val) && handleChange();
        }}
        {...triggerProps}
      />
    </div>
  );
  const renderOverlay = () => (
    <List
      {...rest}
      options={options}
      className={classNames(`${defaultPrefixCls}--list`, contentClassName)}
      prefix={prefix}
      suffix={suffix}
      style={contentStyle}
      model="cascader"
    >
      {children}
    </List>
  );

  return (
    <ListContext.Provider value={{ value, onChange: handleChange, setOptions }}>
      <Popover
        content={renderOverlay()}
        trigger="click"
        distoryOnHide={false}
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
