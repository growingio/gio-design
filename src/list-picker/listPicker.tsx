import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { isArray } from 'lodash';
import { ListPickerProps } from './interfance';
import Popover from '../popover';
import Trigger from './Trigger';
import useControlledState from '../utils/hooks/useControlledState';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { OptionProps } from '../list/interfance';
import Button from '../button';
// import Page from '../page';
import { ListContext } from '../list/context';
import useCacheOptions from '../list/hooks/useCacheOptions';

// const defaultEmpty = () => <Page type="noData" size="small" style={{ margin: '0 auto', padding: '40px 0px' }} />;

const ListPicker: React.FC<ListPickerProps> = (props) => {
  const {
    size,
    placeholder,
    onClear,
    value: controlledValue,
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
    needConfim = false,
    confimText = '确定',
    separator = '',
    className,
    style,
    model,
  } = props;
  const defaultPrefix = usePrefixCls(prefixCls);
  const [visible, setVisible] = useControlledState(controlledVisible, false);
  const [value, setValue] = useState(controlledValue);
  const [title, setTitle] = useState<string | React.ReactNode>('');

  const { options, setOptions, getLabelByValue, getOptionsByValue } = useCacheOptions();

  useEffect(() => {
    setValue(controlledValue);
  }, [controlledValue]);

  useEffect(() => {
    console.log('getLabelByValue(value, separator)', getLabelByValue(value, separator));
    setTitle(getLabelByValue(value, separator));
  }, [value, getLabelByValue, separator]);

  useEffect(() => {
    if (!needConfim) {
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

  const handleChange = (val?: string | string[], opts?: OptionProps | OptionProps[]) => {
    setValue(val);
    setTitle(!isArray(opts) ? opts?.label : '');
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
        // disabled={disabled}
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
      {children}
      {model === 'multiple' && (
        <Button style={{ width: '100%' }} onClick={() => handleConfim()}>
          {confimText}
        </Button>
      )}
    </div>
  );

  return (
    <ListContext.Provider value={{ value, onChange: handleChange, options, setOptions }}>
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
    </ListContext.Provider>
  );
};

export default ListPicker;
