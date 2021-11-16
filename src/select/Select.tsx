import React, { useState } from 'react';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { SelectProps } from './interface';
import Popover from '../popover';
import Trigger from './Trigger';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import List, { OptionProps } from '../list';
import useControlledState from '../utils/hooks/useControlledState';
import './style/index';

const Select: React.FC<SelectProps> = (props) => {
  const {
    prefixCls = 'select-new',
    value: controlledValue,
    defaultValue = '',
    options = [],
    size,
    triggerProps = {},
    visible: controlledVisible,
    onVisibleChange,
    getContainer,
    onChange,
    prefix,
    suffix,
    overlayClassName,
    overlayStyle,
    className,
    style,
    placement = 'bottomLeft',
    disabled,
    // list props
    ...rest
  } = props;
  const [value, setSelectValue] = useControlledState(controlledValue, defaultValue);
  const [visible, setVisible] = useControlledState(controlledVisible, false);
  const [selectedOption, setSelectedOption] = useState<OptionProps | undefined>(undefined);
  const defaultPrefixCls = usePrefixCls(prefixCls);
  const handVisibleChange = (vis: boolean) => {
    setVisible(vis);
    onVisibleChange?.(vis);
  };
  const handleChange = (val?: string, opts?: OptionProps) => {
    onChange?.(val, opts);
    setSelectedOption(opts);
    setSelectValue(val ?? '');
    setVisible(false);
  };

  const handleOnClear = (e: React.MouseEvent<Element, MouseEvent>) => {
    handVisibleChange(false);
    e.stopPropagation();
  };

  const renderTrigger = () => (
    <div
      className={classNames(`${prefixCls}-trigger`, className)}
      style={style}
      aria-hidden="true"
      onClick={() => setVisible(!visible)}
    >
      <Trigger
        value={selectedOption?.label ?? ''}
        size={size}
        prefix={prefix?.(selectedOption)}
        suffix={suffix?.(selectedOption)}
        disabled={disabled}
        onClear={handleOnClear}
        onInputChange={(val) => {
          isEmpty(val) && handleChange('');
        }}
        {...triggerProps}
      />
    </div>
  );

  const renderOverlay = () => (
    <List
      value={value}
      className={classNames(`${defaultPrefixCls}--list`, overlayClassName)}
      style={overlayStyle}
      prefix={prefix}
      suffix={suffix}
      options={options}
      disabled={disabled}
      onChange={(val?: string | string[], o?: OptionProps | OptionProps[]) =>
        handleChange(val as string, o as OptionProps)
      }
      {...rest}
    >
      {options?.map((option: OptionProps) => (
        <List.Item {...option} />
      ))}
    </List>
  );

  return (
    <Popover
      content={renderOverlay()}
      trigger="click"
      visible={visible}
      onVisibleChange={handVisibleChange}
      getContainer={getContainer}
      overlayClassName={`${defaultPrefixCls}--content`}
      placement={placement}
    >
      {renderTrigger()}
    </Popover>
  );
};

export default Select;
