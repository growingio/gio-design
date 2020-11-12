import React, { useState, useContext, useMemo, useRef, useEffect, useCallback } from 'react';
import classnames from 'classnames';

import { DownFilled, BoxFilled } from '@gio-design/icons';
import { filter, isNil, without, uniqueId, uniqBy, findIndex } from 'lodash';
import { SizeContext } from '../config-provider/SizeContext';
import Dropdown from '../dropdown';
import Tag from '../tag';
import List from '../list';
import { ConfigContext } from '../config-provider';

import { SelectProps, Option, MaybeArray } from './interface';

const defaultArrowComponent = <DownFilled />;

const defaultListRowHeight = 44;

const customOptionKeyPrefix = 'select_custom_option_';
const customOptionKey = uniqueId(customOptionKeyPrefix);

export const CustomOption = (value: string, withGroup = false, id = customOptionKeyPrefix): Option =>
  withGroup
    ? {
        value,
        label: value,
        groupValue: id,
        groupLabel: '自由输入',
      }
    : {
        value,
        label: value,
      };

// provide search matching hightlight;
export const defaultLabelRenderer = (input: string, prefix: string) => (
  option: Option,
  isGroup: boolean
): React.ReactNode => {
  if (isGroup) return option.label;
  const index = option.label.indexOf(input);
  return (
    <div>
      {option.label.slice(0, index)}
      <span className={`${prefix}-search-highlight`}>{option.label.slice(index, index + input.length)}</span>
      {option.label.slice(index + input.length)}
    </div>
  );
};

const defaultSearchPredicate = (input: string) => (o: Option) => o.label.includes(input);

const defaultMatchPredicate = (input: string) => (o: Option) => o.label === input;

const defaultNotFoundContent = (
  <div
    style={{
      width: '100%',
      textAlign: 'center',
      color: '#a3adc8',
      padding: '68px 0',
    }}
  >
    <BoxFilled size="48px" style={{ marginBottom: 24 }} />
    <div style={{ fontSize: 12 }}>暂无选项...</div>
  </div>
);

const defaultOptionLabelRenderer = (value: string, option?: Option) => option?.label || value;

const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const sizeContext = useContext(SizeContext);
  const { getPrefixCls } = useContext(ConfigContext);
  const {
    size = sizeContext || 'middle',
    options = [],
    multiple = false,
    placeholder,
    searchable = false,
    disabled = false,
    allowCustomOption = false,
    notFoundContent = defaultNotFoundContent,
    customizePrefixCls,
    className,
    style,
    bordered = true,
    arrowComponent = defaultArrowComponent,
    autoWidth = true,
    listHeight,
    listRowHeight = defaultListRowHeight,
    labelRenderer = defaultLabelRenderer,
    searchPredicate = defaultSearchPredicate,
    matchPredicate = defaultMatchPredicate,
    optionLabelRenderer = defaultOptionLabelRenderer,
    defaultValue,
    value: controlledValue,
    onChange,
    onSearch,
    onSelect,
    onDeselect,
    getContainer,
    dropDownVisible,
    onDropDownVisibleChange,
    dropDownClassName,
    dropDownStyle,
  } = props;

  const prefix = getPrefixCls('select', customizePrefixCls);

  const [unControlledValue, setUnControlledValue] = useState(defaultValue);
  const isControlled = !isNil(controlledValue);
  const value = isControlled ? controlledValue : unControlledValue;
  const [isFocused, setFocused] = useState(false);
  const [_visible, _setVisible] = useState(false);
  const visible = isNil(dropDownVisible) ? _visible : dropDownVisible;
  const setVisbile = isNil(onDropDownVisibleChange) ? _setVisible : onDropDownVisibleChange;
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputWidth, setInputWidth] = useState(2);
  const inputWidthRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  const clearInput = () => {
    setInput('');
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onSearch?.(e.target.value);
    setInput(e.target.value);
  };

  const onInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (input) e.stopPropagation();
  };

  const [valueToOptionMap, hasGroup] = useMemo(() => {
    let group = false;
    const map = options.reduce((m, option) => {
      if (option.groupLabel) group = true;
      m.set(option.value, option);
      return m;
    }, new Map());
    return [map, group];
  }, [options]);

  useEffect(() => {
    if (!disabled) {
      setFocused(visible);
      if (visible) {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    }
  }, [visible, disabled]);

  const onVisibleChange = (optVisible: boolean) => {
    if (!disabled) {
      setVisbile(optVisible);
      if (!optVisible) {
        setTimeout(clearInput, 0);
        inputRef.current?.blur();
      }
    }
  };

  const getOptionByValue = useCallback(
    (optValue: string): Option | undefined => {
      return valueToOptionMap.get(optValue);
    },
    [valueToOptionMap]
  );

  const getOptionsByValue = (optValue: MaybeArray<string>): MaybeArray<Option> | undefined => {
    return Array.isArray(optValue)
      ? optValue.reduce((prev: Option[], v) => {
          const op = getOptionByValue(v);
          if (op) {
            prev.push(op);
          }
          return prev;
        }, [])
      : getOptionByValue(optValue);
  };

  useEffect(() => {
    if (inputWidthRef.current) {
      setInputWidth(inputWidthRef.current?.getBoundingClientRect().width + 4);
    }
  }, [input]);

  const extendedOptions = useMemo(() => {
    const result: Option[] = [];
    if (Array.isArray(value) && allowCustomOption) {
      value.forEach((v) => {
        const op = getOptionByValue(v);
        if (!op) {
          result.push(CustomOption(v, hasGroup, customOptionKey));
        }
      });
    }
    return [...options, ...result];
  }, [options, value, getOptionByValue, allowCustomOption, hasGroup]);

  const filteredOptions = useMemo(() => filter(extendedOptions, searchPredicate(input)), [
    searchPredicate,
    extendedOptions,
    input,
  ]);

  const hasExactMatch = useMemo(() => findIndex(filteredOptions, matchPredicate(input)) > -1, [
    matchPredicate,
    filteredOptions,
    input,
  ]);

  const completeOptions = useMemo(
    () =>
      !!input && !hasExactMatch && allowCustomOption
        ? [CustomOption(input, hasGroup, customOptionKey), ...filteredOptions]
        : filteredOptions,
    [hasExactMatch, allowCustomOption, filteredOptions, input, hasGroup]
  );

  const groupCount = useMemo(() => (hasGroup ? uniqBy(completeOptions, 'groupValue').length : 0), [
    completeOptions,
    hasGroup,
  ]);

  const onValueChange = (optValue: MaybeArray<string>) => {
    if (!isControlled) {
      setUnControlledValue(optValue);
    }
    onChange?.(optValue, getOptionsByValue(optValue));
  };

  const onSelectionKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // delete key
      case 8:
      case 46:
        if (!input.length && value) {
          if (Array.isArray(value)) {
            value.pop();
            onValueChange([...value]);
          } else {
            onValueChange('');
          }
        }
        break;
      // enter key
      case 13:
        if (!hasExactMatch && allowCustomOption && input) {
          if (Array.isArray(value)) {
            value.push(input);
            onValueChange([...(value as Array<string>)]);
          }
        }
        clearInput();
        break;
      default:
        break;
    }
  };

  const onListSelect = (selectedValue: string, _: string[], option: Option) => {
    if (!multiple) {
      onVisibleChange(false);
    }
    if (multiple) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
    clearInput();
    onSelect?.(selectedValue, option);
  };

  const onListDeselect = (selectedValue: string, _: string[], option: Option) => {
    if (!multiple) {
      onVisibleChange(false);
    }
    if (multiple) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
    onDeselect?.(selectedValue, option);
  };

  const onTagCloseClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, v: string) => {
    e.stopPropagation();
    onValueChange(without(value || [], v));
  };

  const renderSingleValue = () =>
    !input && typeof value === 'string' ? (
      <div className={`${prefix}-item`}>
        <span className={`${prefix}-item-text`}>{optionLabelRenderer(value, getOptionByValue(value))}</span>
      </div>
    ) : null;

  const renderMultipleValue = () =>
    (value as Array<string>)?.map((v) => (
      <Tag
        key={v}
        className={`${prefix}-item`}
        persistCloseIcon
        closable
        onClose={(e) => onTagCloseClick(e, v)}
        disabled={disabled}
      >
        {optionLabelRenderer(v, getOptionByValue(v))}
      </Tag>
    ));

  const renderSearchInput = () => (
    <>
      <div ref={inputWidthRef} className={classnames(`${prefix}-input-reference`, `${prefix}-item`)}>
        {input}
      </div>
      <input
        ref={inputRef}
        style={{ width: inputWidth }}
        className={classnames(`${prefix}-input`, `${prefix}-item`)}
        value={input}
        onChange={onInputChange}
        tabIndex={-1}
        onKeyDown={onSelectionKeyDown}
        onClick={onInputClick}
      />
    </>
  );

  const renderPlaceHolder = () => {
    return (!value || !value.length) && !input && placeholder ? (
      <div className={`${prefix}-item ${prefix}-placeholder`}>{placeholder}</div>
    ) : null;
  };

  const trigger = (
    <div
      role={disabled ? undefined : 'combobox'}
      aria-expanded={visible}
      aria-controls="expandable"
      className={classnames(`${prefix}`, `${prefix}-${size}`, {
        [`${prefix}-single`]: !multiple,
        [`${prefix}-focused`]: isFocused,
        [`${prefix}-disabled`]: disabled,
        [`${prefix}-bordered`]: bordered,
        className,
      })}
      aria-disabled={disabled}
      style={style}
      ref={selectorRef}
    >
      <div className={`${prefix}-selector`}>
        <div className={classnames(`${prefix}-values-wrapper`)}>
          {multiple ? renderMultipleValue() : renderSingleValue()}
          {searchable && !disabled && renderSearchInput()}
          {renderPlaceHolder()}
        </div>
      </div>
      <div className={`${prefix}-arrow`}>{arrowComponent}</div>
    </div>
  );

  const list = (
    <div style={{ width: autoWidth ? Math.max(selectorRef.current?.clientWidth || 0, 160) : undefined }}>
      {completeOptions.length > 0 ? (
        <List
          value={value}
          width={autoWidth ? Math.max(selectorRef.current?.clientWidth || 0, 160) : undefined}
          dataSource={completeOptions}
          onChange={onValueChange}
          isMultiple={multiple}
          labelRenderer={labelRenderer(input, prefix)}
          onSelect={onListSelect}
          onDeselect={onListDeselect}
          height={listHeight || (completeOptions.length + groupCount) * listRowHeight}
          rowHeight={listRowHeight}
        />
      ) : (
        notFoundContent
      )}
    </div>
  );

  return (
    <Dropdown
      visible={visible}
      onVisibleChange={onVisibleChange}
      trigger={['click']}
      placement="bottomLeft"
      overlay={list}
      overlayClassName={classnames(`${prefix}-dropdown`, dropDownClassName)}
      overlayInnerStyle={dropDownStyle}
      getTooltipContainer={getContainer}
    >
      {trigger}
    </Dropdown>
  );
};

export default Select;
