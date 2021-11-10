import classNames from 'classnames';
import { isEmpty } from 'lodash';
import React from 'react';
import List from '../list';
import CascaderItem from '../list/inner/CascaderItem';
import Popover from '../popover';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import useControlledState from '../utils/hooks/useControlledState';
import { CascaderProps, CascaderItemProps } from './interfance';
import Trigger from './Trigger';
import { useCacheOptions } from './utils';

const Cascader: React.FC<CascaderProps> = (props) => {
  const {
    options,
    value: controlledValue,
    defaultValue = '',
    visible: controlledVisible,
    onChange,
    prefixCls = 'cascader-new',
    getContainer,
    onVisibleChange,
    triggerProps,
    className,
    style,
    prefix,
    suffix,
    disabled,
    size,
    overlayStyle,
    separator = '',
    placement = 'bottomLeft',
    ...rest
  } = props;
  const [value, setSelectValue] = useControlledState(controlledValue, defaultValue);
  const [visible, setVisible] = useControlledState(controlledVisible, false);
  const defaultPrefixCls = usePrefixCls(prefixCls);
  const prefixIcon = prefix?.(undefined);
  const suffixIcon = suffix?.(undefined);
  const { setCacheOptions, getOptionByValue } = useCacheOptions();
  setCacheOptions(options);

  const handVisibleChange = (vis: boolean) => {
    setVisible(vis);
    onVisibleChange?.(vis);
  };

  const handleChange = (val?: string | number | (string | number)[]) => {
    onChange?.(val as string);
    setSelectValue((val as string) ?? '');
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
      onClick={() => setVisible(!visible)}
    >
      <Trigger
        value={value}
        size={size}
        prefix={prefixIcon}
        suffix={suffixIcon}
        disabled={disabled}
        separator={separator}
        onClear={handleOnClear}
        onInputChange={(val) => {
          isEmpty(val) && handleChange('');
        }}
        getOptionByValue={getOptionByValue}
        {...triggerProps}
      />
    </div>
  );
  const renderItems = () =>
    options?.map((option: CascaderItemProps) => {
      const { childrens = [], ...optionRest } = option;
      if (!isEmpty(childrens)) {
        return (
          <CascaderItem {...optionRest}>
            <List isCascader className={`${defaultPrefixCls}--list`} isMultiple={false}>
              {childrens.map((child) => (
                <CascaderItem {...child} />
              ))}
            </List>
          </CascaderItem>
        );
      }
      return <CascaderItem {...optionRest} />;
    });
  const renderOverlay = () => (
    <List
      {...rest}
      className={`${defaultPrefixCls}--list`}
      isCascader
      isMultiple={false}
      value={value}
      onChange={handleChange}
    >
      {renderItems()}
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
      overlayStyle={overlayStyle}
    >
      {renderTrigger()}
    </Popover>
  );
};

export default Cascader;
