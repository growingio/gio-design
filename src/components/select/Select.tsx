import React, { useState, useContext, useMemo, useRef, useEffect, ReactText } from 'react';
import classnames from 'classnames';
import { filter, isNil, without, findIndex } from 'lodash';
import { SizeContext } from '../config-provider/SizeContext';
import Dropdown from '../dropdown';
import Selector from './Selector';
import OptionsList from './OptionsList';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import Options from './OptionsList/Options';
import { SelectProps, Option, MaybeArray, OptionProps } from './interface';
import OptGroup from './OptionsList/OptGroup';
import {
  convertChildrenToData,
  handleOptions,
  defaultLabelRenderer,
  defaultSearchPredicate,
  defaultMatchPredicate,
  defaultOptionLabelRenderer,
  CustomOption,
  customOptionKey,
  getFlattenOptions,
} from './utils';
import useCacheOptions from './hooks/useCacheOption';
import Empty from '../empty';
import useControlledState from '../../utils/hooks/useControlledState';

interface CompoundedSelect extends React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLElement>> {
  Group: typeof OptGroup;
  Option: typeof Options;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (props: SelectProps, ref: React.MutableRefObject<HTMLDivElement>) => {
    const contextSize = useContext(SizeContext);
    const {
      size = contextSize || 'middle',
      options = [],
      defaultValue = null,
      value: controlledValue,
      multiple = false,
      mode = multiple ? 'tags' : undefined,
      useAll = false,
      useFooter = false,
      allowClear = false,
      placeholder,
      innerInputPlaceHolder,
      searchType = 'no-search',
      disabled = false,
      bordered = true,
      allowCustomOption = false,
      autoWidth = true,
      allowDeselect = multiple,
      triggerComponent,
      notFoundContent,
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
    const [value,setSelectValue] = useControlledState(controlledValue,defaultValue);
    const [tempValue, setTempValue] = useState<React.ReactText[]>([]);
    const [isFocused, setFocused] = useState<boolean>(false);
    const [_visible, _setVisible] = useState<boolean>(false);
    const visible = isNil(dropDownVisible) ? _visible : dropDownVisible;
    const setVisbile = isNil(onDropDownVisibleChange) ? _setVisible : onDropDownVisibleChange;
    const [input, setInput] = useState('');
    const selectRef = useRef<HTMLDivElement>(null);
    const optionListRef = useRef<any>(null);
    const selectorRef = ref || selectRef;
    const isFooter: boolean = useMemo(() => multiple && useFooter, [multiple, useFooter]);
    const isMode: boolean = useMemo(() => multiple && !!mode, [multiple, mode]);
    const isUseAll: boolean = useMemo(() => multiple && !!useAll, [multiple, useAll]);
    // empty

    const emptyElement = (
      <div className={`${prefix}-empty`}>
        <Empty description="暂无选项" size="small" />
      </div>
    );
    const controllednotFoundContent = notFoundContent || emptyElement;
    // keydown
    const [activeIndex, setActiveIndex] = useState<number>(-1);

    // Exhibition value (tempvalue + value);
    const selectorValue = useMemo(() => {
      if (Array.isArray(value)) {
        // filter: if v in value and tempValue   no Exhibition
        return value.concat(tempValue).filter((v) => !value.includes(v) || !tempValue.includes(v));
      }
      if (multiple) {
        return tempValue;
      }
      return value;
    }, [value, multiple, tempValue]);

    useEffect(() => {
      if (!disabled) {
        if (visible) {
          selectorRef?.current?.focus();
          setFocused(visible);
        } else {
          setActiveIndex(-1);
          setFocused(visible);
          optionListRef?.current?.onBlur();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible, disabled]);
    /** merge Option & nodeOption & mergedOptionsMap */
    const nodesToOptions = useMemo<OptionProps[]>(() => convertChildrenToData(children), [children]);
    const { setCacheOptions, getOptionByValue, getOptionsByValue, updateGroup, hasGroup } = useCacheOptions();
    const { flattenOptions: mergedFlattenOPtions } = useMemo(
      () => handleOptions([...options, ...nodesToOptions], setCacheOptions, updateGroup),
      [nodesToOptions, options, setCacheOptions, updateGroup]
    );

    // input change
    const onInputChange = (_value: string) => {
      onSearch?.(_value);
      setInput(_value);
    };
    // clear
    const clearInput = () => setInput('');

    // dropdown visible
    const onVisibleChange = (optVisible: boolean) => {
      if (!disabled) {
        setVisbile(optVisible);
        if (!optVisible) {
          setTimeout(clearInput, 0);
          selectorRef.current?.blur();
        }
      }
    };

    // selector focus 失去焦点 清空temValue 且 关闭dropdown
    const onFocusChange = (focus: boolean) => {
      if (!disabled) {
        setFocused(focus);
      }
    };

    // value other methods
    const onValueChange = (optValue: MaybeArray<string | number> | null) => {
      setSelectValue(optValue);
      if (isNil(optValue)) {
        onChange?.(null, null);
      } else {
        onChange?.(optValue, getOptionsByValue(optValue));
      }
    };

    // tempValue change methods
    const onTempValueChange = (values: React.ReactText[]) => {
      // value is array
      const concatValue = isNil(value)
        ? values
        : values.concat(value).filter((v) => !(value as React.ReactText[])?.includes(v) || !values?.includes(v));
      onChange?.(concatValue, getOptionsByValue(concatValue));
      onVisibleChange(false);
      setSelectValue(concatValue);
      // clear tempValue
      setTempValue([]);
    };
    const deleteValue = (optValue: React.ReactText[], v: React.ReactText) =>
      tempValue.includes(v)
        ? onTempValueChange(without((optValue as MaybeArray<string>) || [], v))
        : onValueChange(without((optValue as MaybeArray<string>) || [], v));
    const setTempValueFC = (tempvalues: React.ReactText[]) => {
      setTempValue(tempvalues);
    };

    const onListSelect = (selectedValue: React.ReactText, option: Option) => {
      if (!multiple) {
        selectorRef.current?.blur();
      } else {
        selectorRef.current?.focus();
      }
      clearInput();
      onSelect?.(selectedValue, option);
    };
    const onListDeselect = (selectedValue: React.ReactText, option: Option) => {
      if (!multiple) {
        selectorRef.current?.blur();
      } else {
        selectorRef.current?.focus();
      }

      onDeselect?.(selectedValue, option);
    };

    const onAllowClearClick = () => {
      if (useFooter) {
        setTempValueFC([]);
      }
      if (input) {
        clearInput();
      }
      onValueChange(!multiple ? null : []);
      onClear?.();
    };

    const onOptionClick = (selectValue: React.ReactText) => {
      const selectedOption = getOptionByValue(selectValue) as Option;
      const isTempSelected = tempValue.includes(selectValue);
      const isSelected = !Array.isArray(value) ? value === selectValue : value.includes(selectValue);
      if (!multiple) {
        onVisibleChange(false);
      }
      if (isTempSelected) {
        if (allowDeselect) {
          onListDeselect(selectValue, selectedOption);
          setTempValue((tempvalues) => (without(tempvalues, selectValue) as unknown) as [ReactText]);
        }
        return;
      }
      if (isFooter) {
        onListSelect(selectValue, selectedOption);
        setTempValue((tempvalues) => ([...tempvalues, selectValue] as unknown) as [ReactText]);
        return;
      }
      if (isSelected) {
        if (allowDeselect) {
          onListDeselect(selectValue, selectedOption);
          onValueChange(Array.isArray(value) ? without((value as MaybeArray<string>) || [], selectValue) : null);
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

    // options  extended: multiple values need extended Options
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

    // search filter InputValue // match input(label === input)
    const [filteredOptions, hasExactMatch]: [Option[], boolean] = useMemo(() => [
      filter(extendedOptions, searchPredicate(input)),
      findIndex(mergedFlattenOPtions, matchPredicate(input)) > -1,
    ], [extendedOptions, searchPredicate, input, matchPredicate, mergedFlattenOPtions]);
    // input created customOption
    const completeOptions = useMemo(
      () =>
        !!input && !hasExactMatch && allowCustomOption && filteredOptions.every((val) => val.label !== input && val.value !== input)
          ? [CustomOption(input, hasGroup, customOptionKey), ...filteredOptions]
          : filteredOptions,
      [input, hasExactMatch, allowCustomOption, hasGroup, filteredOptions]
    );
    const flattenOptions = useMemo(() => getFlattenOptions(completeOptions, hasGroup), [completeOptions, hasGroup]);

    const getArrowDownItemIndex = (nowIndex: number, usefooter: boolean) => {
      const maxLength = usefooter ? flattenOptions.length + 1 : flattenOptions.length - 1;
      let nextIndex = nowIndex < maxLength ? nowIndex + 1 : nowIndex;
      while (nextIndex < maxLength) {
        if ((flattenOptions[nextIndex] as any)?.isSelectOptGroup) {
          nextIndex += 1;
        } else {
          return nextIndex;
        }
      }
      return nextIndex;
    };
    // arrowDown
    const arrowDownKeyDown = () => {
      const nextItemIndex = getArrowDownItemIndex(activeIndex, isFooter);
      setActiveIndex(nextItemIndex);
      optionListRef?.current?.scrollIntoView(nextItemIndex);
    };
    const getArrowUpItemIndex = (nowIndex: number) => {
      let nextIndex = nowIndex > 1 ? nowIndex - 1 : nowIndex;
      while (nextIndex > 0) {
        if ((flattenOptions[nextIndex] as any)?.isSelectOptGroup) {
          nextIndex -= 1;
        } else {
          return nextIndex;
        }
      }
      return nextIndex;
    };
    // // arrowUp
    const arrowUpKeyDown = () => {
      const nextItemIndex = getArrowUpItemIndex(activeIndex);
      setActiveIndex(nextItemIndex);
      optionListRef?.current?.scrollIntoView(nextItemIndex);
    };
    // // enter
    const enterKeyDown = () => {
      const length = flattenOptions?.length || 0;
      if (activeIndex <= length && !flattenOptions[activeIndex]?.disabled) {
        onOptionClick?.(flattenOptions[activeIndex]?.value);
      }
      if (activeIndex === length) {
        // cancel
        optionListRef?.current?.onCancel();
      }
      if (activeIndex === length + 1) {
        // confirm
        optionListRef?.current?.onConfirm();
      }
    };
    // selector keyDown
    const onSelectorKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      // event.preventDefault();
      if (event.keyCode === 40) {
        if (!visible) {
          setTimeout(() => {optionListRef?.current?.onFocus()}, 80);
          onVisibleChange(true);
          if (activeIndex === -1) {
            setActiveIndex(getArrowDownItemIndex(activeIndex, isFooter));
          }
        }
      }
      // tab close dropDown
      if (event.keyCode === 9) {
        (selectorRef as React.MutableRefObject<any>)?.current?.onBlur();
        visible && onVisibleChange(!visible);
      }
      // esc close dropDown
      if (event.keyCode === 27) {
        (selectorRef as React.MutableRefObject<any>)?.current?.onBlur();
        visible && onVisibleChange(!visible);
      }
    };
    // optionList keydown
    const onOptionListKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      // event.preventDefault();
      // arrowDown
      if (event.keyCode === 40) arrowDownKeyDown();
      // arrowUp
      if (event.keyCode === 38) arrowUpKeyDown();
      // enter
      if (event.keyCode === 13) enterKeyDown();
      // Tab,Esc close dropDown;
      if (event.keyCode === 9 || event.keyCode === 27) {
        optionListRef?.current?.onBlur();
        // list render in body, when close, should trenfer focus in selectorRef
        (selectorRef as React.MutableRefObject<any>)?.current?.onFocus();
        (selectorRef as React.MutableRefObject<any>)?.current?.onBlur();
        visible && onVisibleChange(!visible);
      }
    };
    const trigger = triggerComponent || (
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
        onFocusChange={onFocusChange}
        onSelectorKeyDown={onSelectorKeyDown}
        mode={mode}
        value={selectorValue}
        searchType={searchType}
        placeholder={placeholder}
        innerInputPlaceHolder={innerInputPlaceHolder}
        deleteValue={deleteValue}
        onAllowClear={onAllowClearClick}
        optionLabelRenderer={optionLabelRenderer}
        getOptionByValue={getOptionByValue}
        onInputChange={onInputChange}
        arrowComponent={arrowComponent}
        closeComponent={closeComponent}
      />
    );

    const list = (
      <>
        <OptionsList
          ref={optionListRef}
          multiple={multiple}
          prefixCls={prefix}
          selected={selectorValue}
          isMode={isMode}
          isUseAll={isUseAll}
          hasGroup={hasGroup}
          style={{ minWidth: autoWidth ? Math.max(selectorRef?.current?.clientWidth || 0, 160) : undefined }}
          groupStyle={groupStyle}
          optionStyle={optionStyle}
          searchType={searchType}
          placeholder={placeholder}
          notFoundContent={controllednotFoundContent}
          data={flattenOptions as Option[]}
          labelRenderer={labelRenderer(input, prefix)}
          value={value}
          tempValue={tempValue}
          onOptionClick={onOptionClick}
          isFooter={isFooter}
          onValueChange={onValueChange}
          onTempValueChange={onTempValueChange}
          setTempValue={setTempValueFC}
          onInputChange={onInputChange}
          input={input}
          height={listHeight}
          getContainer={getContainer}
          itemHeight={listRowHeight}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onOptionListKeyDown={onOptionListKeyDown}
        />
      </>
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
        afterVisibleChange={(show: boolean) => {
          if (show !== visible && isFooter) {
            setTempValueFC([]);
          }
        }}
      >
        {trigger}
      </Dropdown>
    );
  }
) as CompoundedSelect;

export default Select;
