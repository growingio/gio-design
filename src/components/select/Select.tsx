import React, { useState, useContext, useMemo, useRef, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import { DownFilled, CloseCircleFilled } from '@gio-design/icons';
import { filter, isNil, without, uniqueId, findIndex, isEmpty, isNull } from 'lodash';
import { SizeContext } from '../config-provider/SizeContext';
import Dropdown from '../dropdown';
import Tag from '../tag';
import OptionsList from './OptionsList';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import Options from './Options';
import { SelectProps, Option, MaybeArray, OptionProps } from './interface';
import OptGroup from './OptGroup';
import BoxFilled from './Empty';
import { convertChildrenToData } from './utils';

const defaultArrowComponent = (prefix: string) => {
  return <DownFilled className={`${prefix}-icon-arrow`} />;
};
const defaultCloseComponent = (prefix: string) => {
  return <CloseCircleFilled className={`${prefix}-icon-close`} />;
};

const defaultListRowHeight = 32;
const defaultListHeight = 240;
const customOptionKeyPrefix = 'select_custom_option_';
const ungroupedOptionKeyPrefix = 'select_isungrouped_option_';
const customOptionKey = uniqueId(customOptionKeyPrefix);
const ungroupedOptionKey = uniqueId(ungroupedOptionKeyPrefix);
const ungroupedOptionLabel = '未分组';

export const CustomOption = (value: string | number, withGroup = false, id = customOptionKeyPrefix): Option => {
  return withGroup
    ? {
        value,
        label: value.toString(),
        groupValue: id,
        groupLabel: '自由输入',
      }
    : {
        value,
        label: value.toString(),
      };
};
// provide search matching hightlight;
export const defaultLabelRenderer = (input: string, prefix: string) => (
  option: Option,
  isGroup: boolean
): React.ReactNode => {
  if (isGroup || typeof option.label !== 'string') return option.title || option.label;
  const index = option.label.indexOf(input);
  return (
    <div>
      {option.label.slice(0, index)}
      <span className={`${prefix}-search-highlight`}>{option.label.slice(index, index + input.length)}</span>
      {option.label.slice(index + input.length)}
    </div>
  );
};
const defaultOptionLabelRenderer = (value: string | number, option?: Option) => option?.title || option?.label || value;
const defaultSearchPredicate = (input: string) => (o: Option) =>
  typeof o.label === 'string' ? o.label.includes(input) : true;
const defaultMatchPredicate = (input: string) => (o: Option) => o.label === input;
const defaultNotFoundContent = (
  <div
    className="not-found-context"
    style={{
      width: '100%',
      textAlign: 'center',
      color: '#a3adc8',
      padding: '68px 0',
    }}
  >
    <div style={{ marginBottom: 24 }}>
      <BoxFilled />
    </div>
    <div style={{ fontSize: 12 }}>暂无选项</div>
  </div>
);

interface CompoundedSelect extends React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLElement>> {
  Group: typeof OptGroup;
  Option: typeof Options;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (props: SelectProps, ref: React.MutableRefObject<HTMLDivElement>) => {
    const contextSize = useContext(SizeContext);
    const {
      size = contextSize || 'middle',
      options = [],
      defaultValue = null,
      value: controlledValue,
      multiple = false,
      allowClear = false,
      placeholder,
      searchable = false,
      disabled = false,
      bordered = true,
      allowCustomOption = false,
      autoWidth = true,
      allowDeselect = false || multiple,
      notFoundContent = defaultNotFoundContent,
      customizePrefixCls,
      className,
      style,
      optionStyle,
      groupStyle,
      arrowComponent,
      closeComponent,
      listHeight = defaultListHeight,
      listRowHeight = defaultListRowHeight,
      labelRenderer = defaultLabelRenderer,
      searchPredicate = defaultSearchPredicate,
      matchPredicate = defaultMatchPredicate,
      optionLabelRenderer = defaultOptionLabelRenderer,
      onChange,
      onSearch,
      onSelect,
      onDeselect,
      onClear,
      getContainer,
      dropDownVisible,
      onDropDownVisibleChange,
      dropDownClassName,
      dropDownStyle,
      children,
    } = props;

    const prefix = usePrefixCls('select', customizePrefixCls);
    const [unControlledValue, setUnControlledValue] = useState(defaultValue);
    const isControlled = !isNil(controlledValue);
    const value = isControlled ? controlledValue : unControlledValue;
    const [isFocused, setFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [_visible, _setVisible] = useState(false);
    const visible = isNil(dropDownVisible) ? _visible : dropDownVisible;
    const setVisbile = isNil(onDropDownVisibleChange) ? _setVisible : onDropDownVisibleChange;
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputWidth, setInputWidth] = useState(2);
    const inputWidthRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);
    const selectorRef = ref || selectRef;

    const clearInput = () => {
      setInput('');
    };
    /** merge Option & nodeOption & mergedOptionsMap */
    const nodesToOptions = useMemo<OptionProps[]>(() => convertChildrenToData(children), [children]);

    const [flattenOptionsMap, mergedFlattenOPtions, hasGroup] = useMemo(() => {
      const group = !![...options, ...nodesToOptions].find((v) =>
        Object.prototype.hasOwnProperty.call(v, 'groupValue')
      );
      const flattenOptions: Option[] = [];
      const optionsMap = [...options, ...nodesToOptions].reduce((m, option: Option) => {
        const { groupLabel: optionGroupLabel, groupValue: optionGroupValue, value: optionValue } = option;
        if (group && !optionGroupValue && !optionGroupLabel) {
          const ungroupedOption = {
            groupLabel: ungroupedOptionLabel,
            groupValue: ungroupedOptionKey,
            ...option,
          };
          m.set(optionValue, ungroupedOption);
          flattenOptions.push(ungroupedOption);
        } else {
          m.set(optionValue, option);
          flattenOptions.push(option);
        }
        return m;
      }, new Map());
      return [optionsMap, flattenOptions, group];
    }, [options, nodesToOptions]);

    // input
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      onSearch?.(e.target.value);
      setInput(e.target.value);
    };
    const onInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
      if (input) e.stopPropagation();
    };

    useEffect(() => {
      if (inputWidthRef.current) {
        setInputWidth(inputWidthRef.current?.getBoundingClientRect().width + 4);
      }
    }, [input]);

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
    // value to option || options
    const getOptionByValue = useCallback(
      (optValue: string | number): Option => {
        return flattenOptionsMap.get(optValue);
      },
      [flattenOptionsMap]
    );

    const getOptionsByValue = (optValue: MaybeArray<string | number>): MaybeArray<Option> => {
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

    // options  extended  filtered
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
      return [...mergedFlattenOPtions, ...result];
    }, [mergedFlattenOPtions, value, getOptionByValue, allowCustomOption, hasGroup]);

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
    // flartten options
    const completeOptions = useMemo(
      () =>
        !!input && !hasExactMatch && allowCustomOption
          ? [CustomOption(input, hasGroup, customOptionKey), ...filteredOptions]
          : filteredOptions,
      [hasExactMatch, allowCustomOption, filteredOptions, input, hasGroup]
    );

    // value other methods
    const isEmptyValue = useMemo(() => !isEmpty(value), [value]);

    const onValueChange = (optValue: MaybeArray<string | number> | null) => {
      if (!isControlled) {
        setUnControlledValue(optValue);
      }
      if (isNil(optValue)) {
        onChange?.(null, null);
      } else {
        onChange?.(optValue, getOptionsByValue(optValue));
      }
    };
    const onListSelect = (selectedValue: string | number, option: Option) => {
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
    const onListDeselect = (selectedValue: string | number, option: Option) => {
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
    const onOptionClick = (selectValue: string | number) => {
      const selectedOption = getOptionByValue(selectValue) as Option;
      const isSelected =
        typeof value === 'string' || typeof value === 'number' || isNull(value) || typeof value === 'undefined'
          ? value === selectValue
          : value.includes(selectValue);
      if (isSelected) {
        if (!allowDeselect) {
          return;
        }
        onListDeselect(selectValue, selectedOption);
        if (Array.isArray(value)) {
          onValueChange(without((value as MaybeArray<string>) || [], selectValue));
        } else {
          onValueChange(null);
        }
      } else {
        onListSelect(selectValue, selectedOption);

        if (Array.isArray(value)) {
          onValueChange([...value, selectValue]);
        } else {
          onValueChange(!multiple ? selectValue : [selectValue]);
        }
      }
    };
    const onAllowClear = (e: React.MouseEvent<Element, MouseEvent>) => {
      e.stopPropagation();
      if (allowClear) {
        if (input) {
          clearInput();
        }
        onValueChange(!multiple ? null : []);
        onClear?.();
      }
    };
    const onTagCloseClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, v: string | number) => {
      e.stopPropagation();
      onValueChange(without((value as MaybeArray<string>) || [], v));
    };
    // keyDown
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
              onValueChange(null);
            }
          }
          break;
        // enter key
        case 13:
          if (!hasExactMatch && allowCustomOption && input) {
            if (Array.isArray(value)) {
              value.push(input);
              onValueChange([...(value as Array<string | number>)]);
            }
          }
          clearInput();
          break;
        default:
          break;
      }
    };
    // render
    const renderSingleValue = () => {
      return !input && (typeof value === 'string' || typeof value === 'number') ? (
        <div className={`${prefix}-item`}>
          <span className={`${prefix}-item-text`}>
            {optionLabelRenderer(value as string | number, getOptionByValue(value as string | number))}
          </span>
        </div>
      ) : null;
    };

    const renderMultipleValue = () => {
      return (value as Array<string | number>)?.map((v) => (
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
    };

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
      if (
        (!value ||
          (typeof value === ('string' || 'number') && !value.toString().length) ||
          (typeof value === 'object' && !value.length)) &&
        !input &&
        placeholder
      ) {
        return <div className={`${prefix}-item ${prefix}-placeholder`}>{placeholder}</div>;
      }
      return null;
    };

    const onMouseEnter = () => {
      if (allowClear) {
        setIsHovered(true);
      }
    };
    const onMouseLeave = () => {
      if (allowClear) {
        setIsHovered(false);
      }
    };
    const showClose = allowClear && (isEmptyValue || input) && isHovered;
    const trigger = (
      <div
        role={disabled ? undefined : 'combobox'}
        aria-expanded={visible}
        aria-controls="expandable"
        className={classnames(`${prefix}`, `${prefix}-${size}`, {
          [`${prefix}-single`]: !multiple,
          [`${prefix}-bordered`]: bordered,
          [`${prefix}-focused`]: isFocused,
          [`${prefix}-disabled`]: disabled,
          className,
        })}
        aria-disabled={disabled}
        style={style}
        ref={selectorRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className={`${prefix}-selector`}>
          <div className={classnames(`${prefix}-values-wrapper`)}>
            {multiple ? renderMultipleValue() : renderSingleValue()}
            {searchable && !disabled && renderSearchInput()}
            {renderPlaceHolder()}
          </div>
        </div>
        <div
          aria-hidden="true"
          className={classnames(`${prefix}-arrow`, {
            [`${prefix}-arrow-focused`]: isFocused,
          })}
          onClick={showClose ? onAllowClear : undefined}
        >
          {showClose
            ? closeComponent || defaultCloseComponent(prefix)
            : arrowComponent || defaultArrowComponent(prefix)}
        </div>
      </div>
    );
    const list = (
      <div
        className={`${prefix}-list`}
        style={{ width: autoWidth ? Math.max(selectorRef?.current?.clientWidth || 0, 160) : undefined }}
      >
        {completeOptions.length > 0 ? (
          <OptionsList
            multiple={multiple}
            prefixCls={prefix}
            selected={value}
            hasGroup={hasGroup}
            groupStyle={groupStyle}
            optionStyle={optionStyle}
            data={(completeOptions as unknown) as Option[]}
            labelRenderer={labelRenderer(input, prefix)}
            onOptionClick={onOptionClick}
            height={listHeight}
            getContainer={getContainer}
            itemHeight={listRowHeight}
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
  }
) as CompoundedSelect;

export default Select;
