import classNames from 'classnames';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import List, { OptionProps } from '../list';
import Popover from '../popover';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import useControlledState from '../utils/hooks/useControlledState';
import { CascaderProps } from './interfance';
import { getLabelByValue } from './util';
import Trigger from './Trigger';

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
  const [selectedTitle, setSelectedTitle] = useState(undefined);
  const defaultPrefixCls = usePrefixCls(prefixCls);
  const prefixIcon = prefix?.(undefined);
  const suffixIcon = suffix?.(undefined);
  // 这里实现的不好

  const handVisibleChange = (vis: boolean) => {
    setVisible(vis);
    onVisibleChange?.(vis);
  };

  const handleChange = (val?: string | string[], opts?: OptionProps | OptionProps[]) => {
    onChange?.(val);
    setSelectValue((val as string) ?? '');
    setSelectedTitle(getLabelByValue(val, opts, separator));

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
        value={selectedTitle}
        size={size}
        prefix={prefixIcon}
        suffix={suffixIcon}
        disabled={disabled}
        onClear={handleOnClear}
        onInputChange={(val) => {
          isEmpty(val) && handleChange('');
        }}
        {...triggerProps}
      />
    </div>
  );
  // const renderItems = () =>
  //   options?.map((option: CascaderItemProps) => {
  //     const { childrens = [], ...optionRest } = option;
  //     if (!isEmpty(childrens)) {
  //       return (
  //         <Item isCascader {...optionRest}>
  //           <List model="cascader" className={`${defaultPrefixCls}--list`}>
  //             {childrens.map((child) => (
  //               <Item isCascader {...child} />
  //             ))}
  //           </List>
  //         </Item>
  //       );
  //     }
  //     return <Item {...optionRest} />;
  //   });
  const renderOverlay = () => (
    <List
      {...rest}
      options={options}
      className={`${defaultPrefixCls}--list`}
      model="cascader"
      value={value}
      onChange={handleChange}
    />
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
