import React, { useState, useContext, useMemo, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { filter, isNil, without, findIndex, isNull } from 'lodash';
import { SizeContext } from '../config-provider/SizeContext';
import Dropdown from '../dropdown';
import Selector from './Selector';
import OptionsList from './OptionsList';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import Options from './Options';
import { SelectProps, Option, MaybeArray, OptionProps } from './interface';
import OptGroup from './OptGroup';
import {
  convertChildrenToData,
  handleOptions,
  defaultLabelRenderer,
  defaultSearchPredicate,
  defaultMatchPredicate,
  defaultOptionLabelRenderer,
  CustomOption,
  customOptionKey,
} from './utils';
import useCacheOptions from './hooks/useCacheOption';
import DefaultNotFoundContent from './components/NotFoundContent';

const defaultNotFoundContent = <DefaultNotFoundContent />;

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
      listHeight,
      listRowHeight,
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
    const [_visible, _setVisible] = useState(false);
    const visible = isNil(dropDownVisible) ? _visible : dropDownVisible;
    const setVisbile = isNil(onDropDownVisibleChange) ? _setVisible : onDropDownVisibleChange;
    const [input, setInput] = useState('');
    const selectRef = useRef<HTMLDivElement>(null);
    const selectorRef = ref || selectRef;
    /** merge Option & nodeOption & mergedOptionsMap */
    const nodesToOptions = useMemo<OptionProps[]>(() => convertChildrenToData(children), [children]);
    const { setCacheOptions, getOptionByValue, getOptionsByValue, updateGroup, hasGroup } = useCacheOptions();
    const { flattenOptions: mergedFlattenOPtions } = useMemo(
      () => handleOptions([...options, ...nodesToOptions], setCacheOptions, updateGroup),
      [nodesToOptions, options, setCacheOptions, updateGroup]
    );

    const clearInput = () => {
      setInput('');
    };
    useEffect(() => {
      if (!disabled) {
        setFocused(visible);
        if (visible) {
          if (selectorRef.current) {
            selectorRef.current.focus();
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible, disabled]);

    const onVisibleChange = (optVisible: boolean) => {
      if (!disabled) {
        setVisbile(optVisible);
        if (!optVisible) {
          setTimeout(clearInput, 0);
          selectorRef.current?.blur();
        }
      }
    };
    // value other methods
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
    const onAllChange = (optionValue: MaybeArray<string | number> | null) => {
      onValueChange?.(optionValue);
    };

    const onListSelect = (selectedValue: string | number, option: Option) => {
      if (!multiple) {
        onVisibleChange(false);
      }
      if (multiple) {
        selectorRef.current?.focus();
      } else {
        selectorRef.current?.blur();
      }
      clearInput();
      onSelect?.(selectedValue, option);
    };
    const onListDeselect = (selectedValue: string | number, option: Option) => {
      if (!multiple) {
        onVisibleChange(false);
      }
      if (multiple) {
        selectorRef.current?.focus();
      } else {
        selectorRef.current?.blur();
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

    const trigger = (
      <Selector
        size={size}
        input={input}
        disabled={disabled}
        prefix={prefix}
        multiple={multiple}
        bordered={bordered}
        isFocused={isFocused}
        className={className}
        visible={visible}
        ref={selectorRef}
        style={style}
        allowClear={allowClear}
        mode="tags"
        value={value}
        searchable={searchable}
        hasExactMatch={hasExactMatch}
        allowCustomOption={allowCustomOption}
        placeholder={placeholder}
        onValueChange={onValueChange}
        optionLabelRenderer={optionLabelRenderer}
        getOptionByValue={getOptionByValue}
        onSearch={onSearch}
        setInput={setInput}
        clearInput={clearInput}
        onClear={onClear}
        arrowComponent={arrowComponent}
        closeComponent={closeComponent}
      />
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
            mode="tags"
            hasGroup={hasGroup}
            groupStyle={groupStyle}
            optionStyle={optionStyle}
            data={(completeOptions as unknown) as Option[]}
            labelRenderer={labelRenderer(input, prefix)}
            onOptionClick={onOptionClick}
            onAllChange={onAllChange}
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
        <div className={`${prefix}-trigger`}>{trigger}</div>
      </Dropdown>
    );
  }
) as CompoundedSelect;

export default Select;
