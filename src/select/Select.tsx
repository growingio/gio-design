import React from 'react';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { SelectProps } from './interfance';
import Popover from '../popover';
import Trigger from './Trigger';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import List from '../list';
import { useCacheOptions } from './utils';
import useControlledState from '../utils/hooks/useControlledState';
import './style/index';
import { OptionProps } from '../components/select';

const Select: React.FC<SelectProps> = (props) => {
  const {
    prefixCls = 'select-new',
    value: controlledValue,
    defaultValue = '',
    options = [],
    size,
    triggerOption = {},
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
  const defaultPrefixCls = usePrefixCls(prefixCls);
  const { setCacheOptions, getOptionByValue } = useCacheOptions();
  setCacheOptions(options);
  const prefixIcon = value ? prefix?.(getOptionByValue(value)) : undefined;
  const suffixIcon = value ? suffix?.(getOptionByValue(value)) : undefined;

  const handVisibleChange = (vis: boolean) => {
    setVisible(vis);
    onVisibleChange?.(vis);
  };
  const handleChange = (val?: string | number) => {
    onChange?.(val, getOptionByValue(val));
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
        value={getOptionByValue(value)?.label as string}
        size={size}
        prefix={prefixIcon}
        suffix={suffixIcon}
        disabled={disabled}
        onClear={handleOnClear}
        onInputChange={(val) => {
          isEmpty(val) && handleChange('');
        }}
        {...triggerOption}
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
      {...rest}
      onChange={(val) => handleChange(val as string | number)}
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
