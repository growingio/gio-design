import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { ListPickerProps } from './interfance';
import Popover from '../popover';
import Trigger from './Trigger';
import useControlledState from '../utils/hooks/useControlledState';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import StaticListPicker from './StaticListPicker';
import { OptionProps } from '../list/interfance';
import { getFlattenOptions, getLabelByValue } from './util';
import Button from '../button';
import { useCacheOptions } from '../list/util';
import Page from '../page';

const defaultEmpty = () => <Page type="noData" size="small" style={{ margin: '0 auto', padding: '40px 0px' }} />;

const ListPicker: React.FC<ListPickerProps> = (props) => {
  const {
    disabled,
    size,
    placeholder,
    onClear,
    value: controlledValue,
    model = 'simple',
    options = [],
    trigger = 'click',
    visible: controlledVisible,
    onVisibleChange,
    onChange,
    triggerProps,
    renderTrigger: propsRenderTrigger,
    prefixCls = 'list-picker--new',
    getContainer,
    placement = 'bottomLeft',
    overlayStyle,
    children,
    onConfim,
    needConfim = model === 'multiple',
    confimText = '确定',
    separator,
    empty = defaultEmpty,
    className,
    style,

    ...otherProps // list props
  } = props;
  const defaultPrefix = usePrefixCls(prefixCls);
  const [visible, setVisible] = useControlledState(controlledVisible, false);
  const [value, setValue] = useState(controlledValue);
  const [title, setTitle] = useState(getLabelByValue(value, options as OptionProps[]));
  const { setCacheOptions, getOptionByValue, getOptionsByValue } = useCacheOptions();
  setCacheOptions(options);
  const isSelection = useMemo(() => options?.every((val) => 'selectionValue' in val), [options]);
  const selections = useMemo(() => getFlattenOptions(options, isSelection), [isSelection, options]);

  useEffect(() => {
    if (!needConfim) {
      console.log('setValue');
      setValue(controlledValue);
    }
  }, [controlledValue, needConfim]);
  // methods
  const handVisibleChange = (vis: boolean) => {
    setVisible(vis);
    onVisibleChange?.(vis);
  };
  const handleConfim = () => {
    handVisibleChange(false);
    onConfim?.(value, getOptionsByValue(value));
  };

  useEffect(() => {
    setTitle(getLabelByValue(value, options as OptionProps[], separator, getOptionByValue));
  }, [getOptionByValue, options, separator, value]);

  const handleChange = (val?: string | string[], opts?: OptionProps | OptionProps[]) => {
    setValue(val);
    if (!needConfim) {
      onChange?.(val, opts);
    }
    if (model !== 'multiple') {
      handVisibleChange(false);
    }
  };
  const clearInput = () => {
    setValue(undefined);
    onClear?.();
  };
  // trigger
  const renderTrigger = (): React.ReactElement => {
    const triggerProp = { size, placeholder, onClear, separator, ...triggerProps };
    if (typeof propsRenderTrigger === 'function') {
      return propsRenderTrigger?.();
    }
    return (
      <Trigger
        value={title}
        {...triggerProp}
        disabled={disabled}
        size={size}
        placeholder={placeholder}
        onClear={clearInput}
        separator={separator}
      />
    );
  };

  // render
  const renderOverlay = () => (
    <div className={classNames(defaultPrefix, className)} style={style}>
      <StaticListPicker
        value={value}
        onChange={handleChange}
        options={selections}
        isSelection={isSelection}
        model={model}
        disabled={disabled}
        empty={empty}
        {...otherProps}
      >
        {children}
      </StaticListPicker>
      {model === 'multiple' && (
        <Button style={{ width: '100%' }} onClick={() => handleConfim()}>
          {confimText}
        </Button>
      )}
    </div>
  );

  return (
    <Popover
      content={renderOverlay()}
      trigger={trigger}
      visible={visible}
      onVisibleChange={handVisibleChange}
      getContainer={getContainer}
      overlayClassName={`${defaultPrefix}--content`}
      placement={placement}
      overlayStyle={overlayStyle}
    >
      {renderTrigger()}
    </Popover>
  );
};

export default ListPicker;
