import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { isEqual, isNil } from 'lodash';
import { ListPickerProps } from './interfance';
import Popover from '../popover';
import Trigger from './Trigger';
import useControlledState from '../utils/hooks/useControlledState';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { OptionProps } from '../list/interfance';
import Button from '../button';
import { ListContext } from '../list/context';
import useCacheOptions from '../list/hooks/useCacheOptions';
import { ITEM_KEY } from './Recent';
// import CheckboxItem from '../list/inner/ChckboxItem';

// const defaultEmpty = () => <Page type="noData" size="small" style={{ margin: '0 auto', padding: '40px 0px' }} />;

const ListPicker: React.FC<ListPickerProps> = (props) => {
  const {
    size,
    placeholder,
    disabled,
    onClear,
    value: controlledValue,
    defaultValue,
    trigger = 'click',
    visible: controlledVisible,
    onVisibleChange,
    onChange,
    triggerProps,
    renderTrigger: propsRenderTrigger,
    prefixCls = 'list-picker-',
    getContainer,
    placement = 'bottomLeft',
    overlayStyle,
    overlayClassName,
    children,
    onConfim,
    confimText = '确定',
    separator = '',
    className,
    style,
    model = 'single',
    needConfim = model === 'multiple',
  } = props;
  const defaultPrefix = usePrefixCls(prefixCls);
  const [visible, setVisible] = useControlledState(controlledVisible, false);
  const [value, setValue] = useState(controlledValue || defaultValue);
  const [title, setTitle] = useState<string | React.ReactNode>(undefined);

  const { options, setOptions, getLabelByValue, getOptionsByValue } = useCacheOptions();

  // title仅跟随controlledValue变动
  useEffect(() => {
    setTitle(getLabelByValue(controlledValue, separator));
  }, [controlledValue, getLabelByValue, separator, options]);

  useEffect(() => {
    setValue(controlledValue);
  }, [controlledValue, setValue]);
  useEffect(() => {
    if (needConfim && !visible && !isEqual(controlledValue, value)) {
      setValue(controlledValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);
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
    if (model !== 'multiple') {
      const localStorageValue = localStorage?.getItem(ITEM_KEY);
      const recentKey: string[] = (JSON.parse(isNil(localStorageValue) ? '[]' : localStorageValue) || []).filter(
        (v: string) => v !== val
      );
      localStorage?.setItem(ITEM_KEY, JSON.stringify([val, ...recentKey].slice(0, 20)));
      onChange?.(val, opts);
      handVisibleChange(false);
    } else {
      setValue(val);
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
        onClick={() => setVisible(!visible)}
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
      {/* {model === 'multiple' && selectAll && renderSelectAll()} */}
      {children}
      {model === 'multiple' && needConfim && (
        <Button style={{ width: '100%' }} onClick={() => handleConfim()}>
          {confimText}
        </Button>
      )}
    </div>
  );

  return (
    <ListContext.Provider value={{ value, model, onChange: handleChange, options, setOptions }}>
      <Popover
        distoryOnHide={false}
        disabled={disabled}
        content={renderOverlay()}
        trigger={trigger}
        visible={visible}
        onVisibleChange={handVisibleChange}
        getContainer={getContainer}
        overlayClassName={classNames(`${defaultPrefix}--content`, overlayClassName)}
        placement={placement}
        overlayStyle={overlayStyle}
      >
        {renderTrigger()}
      </Popover>
    </ListContext.Provider>
  );
};

export default ListPicker;
