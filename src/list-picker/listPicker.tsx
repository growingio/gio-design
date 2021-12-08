import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { isEqual, isNil } from 'lodash';
import { useLocale } from '@gio-design/utils';
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
    renderTrigger: propsRenderTrigger,
    prefixCls = 'list-picker',
    getContainer,
    placement = 'bottomLeft',
    children,
    onConfim,
    confimText = localeTextObject?.confirm,
    separator = '',
    style,
    overlayStyle,
    contentStyle,
    className,
    overlayClassName,
    contentClassName,
    model = 'single',
    needConfim = model === 'multiple',

    allowClear,
    title,
    triggerPrefix,
    triggerSuffix,
    hidePrefix = false,
    maxWidth,
    recentId: propsRecentId,
    ...rest
  } = props;
  const defaultPrefix = usePrefixCls(prefixCls);
  const [visible, setVisible] = useControlledState(controlledVisible, false);
  const [value, setValue] = useState(controlledValue || defaultValue);
  const { options, setOptions, getOptionByValue, getLabelByValue, getOptionsByValue } = useCacheOptions();

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
        size={size}
        value={controlledValue}
        style={style}
        className={className}
        maxWidth={maxWidth}
        disabled={disabled}
        placeholder={placeholder}
        suffix={triggerSuffix}
        prefix={triggerPrefix}
        allowClear={allowClear}
        onClear={clearInput}
        separator={separator}
        onClick={triggerClick}
        title={title}
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
      style={contentStyle}
    >
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
    <ListContext.Provider
      value={{
        value,
        model,
        onChange: handleChange,
        options,
        setOptions,
        getOptionByValue,
        getOptionsByValue,
        getLabelByValue,
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
        strategy="fixed"
        {...rest}
      >
        {renderTrigger()}
      </Popover>
    </ListContext.Provider>
  );
};

export default ListPicker;
