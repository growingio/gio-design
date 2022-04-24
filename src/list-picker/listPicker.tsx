import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { isArray, isEqual, isNil } from 'lodash';
import { useLocale, usePrefixCls } from '@gio-design/utils';
import { ListPickerProps } from './interfance';
import Popover from '../popover';
import Trigger from './Trigger';
import useControlledState from '../utils/hooks/useControlledState';
import { OptionProps } from '../list/interfance';
import Button from '../button';
import { ListContext } from '../list/context';
import useCacheOptions from '../list/hooks/useCacheOptions';
import { ITEM_KEY } from './Recent';
import defaultLocaleTextObject from './locales/zh-CN';

const DEFAULT_DATA_TESTID = 'list-picker';

export const ListPicker: React.FC<ListPickerProps> = (props) => {
  const localeTextObject: typeof defaultLocaleTextObject = useLocale('ListPicker') || defaultLocaleTextObject;
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
    onMultipleOverflow,
    renderTrigger: propsRenderTrigger,
    prefixCls = 'list-picker',
    getContainer,
    placement = 'bottomLeft',
    children,
    onConfirm,
    confirmText: confimText = localeTextObject?.confirm,
    separator = '',
    valueSeparator = '.',
    style,
    overlayStyle,
    contentStyle,
    className,
    overlayClassName,
    contentClassName,
    model = 'single',
    needConfirm = model === 'multiple',
    empty,
    needEmpty = true,
    allowClear,
    title,
    triggerPrefix,
    triggerSuffix,
    hidePrefix = false,
    maxWidth,
    recentId: propsRecentId,
    autoWidth = false,
    strategy = 'fixed',
    max,
    ...rest
  } = props;
  const defaultPrefix = usePrefixCls(prefixCls);
  const [visible, setVisible] = useControlledState(controlledVisible, false);
  const [value, setValue] = useState(controlledValue || defaultValue);
  const { options, setOptions, getOptionByValue, getLabelByValue, getOptionTreeByValue, getOptionsByValue } =
    useCacheOptions();
  const triggerRef = useRef<HTMLInputElement | undefined>(undefined);
  useEffect(() => {
    setValue(controlledValue);
  }, [controlledValue, setValue]);
  useEffect(() => {
    if (needConfirm && !visible && !isEqual(controlledValue, value)) {
      setValue(controlledValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if(model === 'multiple' && isArray(value)){
      if((value as string[])?.length >= (max ?? Infinity)){
        onMultipleOverflow?.(value as (string | number)[])
      }
    }
  }, [model,value, max, onMultipleOverflow])
  
  // methods
  const handVisibleChange = (vis: boolean) => {
    setVisible(vis);
    onVisibleChange?.(vis);
  };
  const handleConfim = () => {
    handVisibleChange(false);
    onConfirm?.(value, getOptionsByValue(value));
  };

  const handleChange = (val?: string | string[], opts?: OptionProps | OptionProps[]) => {
    if (model !== 'multiple') {
      const localKey = isNil(propsRecentId) ? ITEM_KEY : `${ITEM_KEY}_${propsRecentId}`;
      const localStorageValue = localStorage?.getItem(localKey);
      const recentKey: string[] = (JSON.parse(isNil(localStorageValue) ? '[]' : localStorageValue) || []).filter(
        (v: string) => v !== val
      );
      localStorage?.setItem(localKey, JSON.stringify([val, ...recentKey].slice(0, 50)));
      onChange?.(val, opts);
      handVisibleChange(false);
    } else {
      setValue(val);
    }
  };
  const clearInput = () => {
    setValue(undefined);
    onClear?.();
    onChange?.();
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
        model={model}
        size={size}
        value={controlledValue}
        style={style}
        className={className}
        maxWidth={maxWidth}
        disabled={disabled}
        ref={triggerRef as React.RefObject<HTMLInputElement>}
        placeholder={placeholder}
        suffix={triggerSuffix}
        prefix={triggerPrefix}
        allowClear={allowClear}
        onClear={clearInput}
        separator={separator}
        valueSeparator={valueSeparator}
        onClick={triggerClick}
        title={title}
        visible={visible}
        hidePrefix={hidePrefix}
        data-testid={isNil(rest['data-testid']) ? `${DEFAULT_DATA_TESTID}-trigger` : `${rest['data-testid']}-trigger`}
      >
        {children}
      </Trigger>
    );
  };
  // render
  const renderOverlay = () => (
    <div
      data-testid={isNil(rest['data-testid']) ? `${DEFAULT_DATA_TESTID}-overlay` : `${rest['data-testid']}-overlay`}
      className={classNames(defaultPrefix, contentClassName)}
      style={{
        width: autoWidth ? Math.max(120, triggerRef?.current?.clientWidth || 0) : undefined,
        ...contentStyle,
      }}
    >
      {/* {model === 'multiple' && selectAll && renderSelectAll()} */}
      {children}
      {model === 'multiple' && needConfirm && (
        <Button style={{ width: '100%' }} onClick={() => handleConfim()}>
          {confimText}
        </Button>
      )}
    </div>
  );

  return (
    <ListContext.Provider
      value={{
        value,
        model,
        max,
        onChange: handleChange,
        options,
        setOptions,
        getOptionByValue,
        getOptionsByValue,
        getLabelByValue,
        getOptionTreeByValue,
        emptyNode: empty,
        isEmpty: needEmpty,
        recentId: propsRecentId,
      }}
    >
      <Popover
        disabled={disabled}
        content={renderOverlay()}
        trigger={trigger}
        visible={visible}
        onVisibleChange={handVisibleChange}
        getContainer={getContainer}
        overlayClassName={classNames(`${defaultPrefix}--content`, overlayClassName)}
        placement={placement}
        overlayStyle={overlayStyle}
        strategy={strategy}
        {...rest}
      >
        {renderTrigger()}
      </Popover>
    </ListContext.Provider>
  );
};

export default ListPicker;
