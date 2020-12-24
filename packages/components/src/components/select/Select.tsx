import React, { useState, useContext, useMemo, useRef, useEffect, useCallback } from 'react';
import classnames from 'classnames';

import { DownFilled, CloseCircleFilled } from '@gio-design/icons';
import { filter, isNil, without, uniqueId, findIndex, concat, isEmpty } from 'lodash';
import { SizeContext } from '../config-provider/SizeContext';
import Dropdown from '../dropdown';
import Tag from '../tag';
import List from '../list';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import Options from './Options';
import { SelectProps, Option, MaybeArray, OptionProps } from './interface';
import OptGroup from './OptGroup';
import BoxFilled from './Empty';

const defaultArrowComponent = <DownFilled />;
const defaultListRowHeight = 44;

const customOptionKeyPrefix = 'select_custom_option_';
const customOptionKey = uniqueId(customOptionKeyPrefix);

interface CompoundedSelect extends React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLElement>> {
  Group: typeof OptGroup;
  Option: typeof Options;
}

interface group {
  key?: string | React.Key;
  groupLabel?: string;
  groupValue?: string | number;
}

// ReactNode To Options
function convertNodeToOption(node: React.ReactElement, group: group): OptionProps {
  const {
    props: { value, label, children, ...restProps },
  } = node as React.ReactElement;
  const { groupValue, groupLabel } = group;
  return { value, label: children !== undefined ? children : label, groupValue, groupLabel, ...restProps };
}

export function convertChildrenToData(nodes: React.ReactNode, group = {}): OptionProps[] {
  let nodeOptions: OptionProps[] = [];
  React.Children.forEach(nodes, (node: React.ReactElement) => {
    if (!React.isValidElement(node)) {
      return;
    }
    const {
      type: { isSelectOptGroup },
      props: { children, label, value },
    } = node as React.ReactElement & { type: { isSelectOptGroup?: boolean } }; // 联合类型
    if (!isSelectOptGroup) {
      // option
      nodeOptions.push(convertNodeToOption(node, group));
    } else {
      // Group
      nodeOptions = concat(nodeOptions, convertChildrenToData(children, { groupLabel: label, groupValue: value }));
    }
  });
  return nodeOptions;
}

export const CustomOption = (value: string | number, withGroup = false, id = customOptionKeyPrefix): OptionProps =>
  withGroup
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

// provide search matching hightlight;
export const defaultLabelRenderer = (input: string, prefix: string) => (
  option: OptionProps,
  isGroup: boolean
): React.ReactNode => {
  if (isGroup || typeof option.label !== 'string') return option.label;
  const index = option.label.indexOf(input);
  return (
    <div>
      {option.label.slice(0, index)}
      <span className={`${prefix}-search-highlight`}>{option.label.slice(index, index + input.length)}</span>
      {option.label.slice(index + input.length)}
    </div>
  );
};

const defaultSearchPredicate = (input: string) => (o: OptionProps) => {
  return typeof o.label === 'string' ? o.label.includes(input) : true;
};

const defaultMatchPredicate = (input: string) => (o: OptionProps) => o.label === input;

const defaultNotFoundContent = (
  <div
    style={{
      width: '100%',
      textAlign: 'center',
      color: '#a3adc8',
      padding: '68px 0',
    }}
  >
    <div style={{ marginBottom: 24}}>
      <BoxFilled />
    </div>
    <div style={{ fontSize: 12 }}>暂无选项</div>
  </div>
);

const defaultOptionLabelRenderer = (value: string | number, option?: OptionProps) => option?.label || value;

const Select = React.forwardRef<HTMLDivElement,SelectProps>((props: SelectProps, ref: React.MutableRefObject<HTMLDivElement>) => {
  const sizeContext = useContext(SizeContext);
  const {
    size = sizeContext || 'middle',
    options = [],
    multiple = false,
    allowClear = false,
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
    children,
    onClear,
    allowDeselect = false || multiple,
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
  const nodesToOptions = useMemo<OptionProps[]>(() => convertChildrenToData(children), [children]);
  const [valueToOptionMap, hasGroup] = useMemo(() => {
    let group = false;
    const map = [...options, ...nodesToOptions].reduce((m, option) => {
      if (option.groupLabel) group = true;
      m.set(option.value, option);
      return m;
    }, new Map());
    return [map, group];
  }, [options, nodesToOptions]);

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
    (optValue: string | number): OptionProps | undefined => {
      return valueToOptionMap.get(optValue);
    },
    [valueToOptionMap]
  );

  const getOptionsByValue = (optValue: MaybeArray<string | number>): MaybeArray<OptionProps> | undefined => {
    return Array.isArray(optValue)
      ? optValue.reduce((prev: OptionProps[], v) => {
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
    const result: OptionProps[] = [];
    if (Array.isArray(value) && allowCustomOption) {
      value.forEach((v) => {
        const op = getOptionByValue(v);
        if (!op) {
          result.push(CustomOption(v, hasGroup, customOptionKey));
        }
      });
    }
    return [...[...options, ...nodesToOptions], ...result];
  }, [options, nodesToOptions, value, getOptionByValue, allowCustomOption, hasGroup]);
  const isEmptyValue = useMemo(()=> !isEmpty(value),[value])
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
  const onValueChange = (optValue: MaybeArray<string | number>) => {
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
            onValueChange([...(value as Array<string | number>)]);
          }
        }
        clearInput();
        break;
      default:
        break;
    }
  };

  const onListSelect = (selectedValue: string | number, _: string[], option: OptionProps) => {
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

  const onListDeselect = (selectedValue: string, _: string[], option: OptionProps) => {
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
  const onAllowClear = (e: React.MouseEvent<Element, MouseEvent>) =>{
    e.stopPropagation();
    if(allowClear){
    if(input){
      clearInput();
    } else {
      onValueChange(!multiple ? '' : [])
    }
    onClear?.();
    }
  }
  const onTagCloseClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, v: string | number) => {
    e.stopPropagation();
    onValueChange(without((value as MaybeArray<string>) || [], v));
  };

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
  const onMouseEnter = ()=>{
    if(allowClear){
      setIsHovered(true);
    }
  }
  const onMouseLeave = ()=>{
    if(allowClear){
      setIsHovered(false);
    }
  }
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
      ref={ref}
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
      <div className={`${prefix}-arrow`}>
        {allowClear &&  isEmptyValue && isHovered ?  <CloseCircleFilled onClick={onAllowClear} /> : arrowComponent}
      </div>
    </div>
  );
  const list = (
    <div style={{ width: autoWidth ? Math.max(ref?.current?.clientWidth || 0, 160) : undefined }}>
      {completeOptions.length > 0 ? (
        <List
          value={value}
          width={autoWidth ? Math.max(ref?.current?.clientWidth || 0, 160) : undefined}
          dataSource={(completeOptions as unknown) as Option[]}
          onChange={onValueChange}
          required={!allowDeselect}
          isMultiple={multiple}
          labelRenderer={labelRenderer(input, prefix)}
          onSelect={onListSelect}
          onDeselect={onListDeselect}
          height={
            listHeight ||
            '100%'
          }
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
}) as CompoundedSelect;

export default Select;
