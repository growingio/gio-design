import React, { useState, useContext, useMemo, useRef, useEffect } from 'react';
import classnames from 'classnames';

import { UpFilled, DownFilled } from '@gio-design/icons';
import { filter, intersection, concat } from 'lodash';
import Dropdown from '../dropdown';
import Input from '../input';
import Tag from '../tag';
import List from '../list';
import { ConfigContext } from '../config-provider';

import { SelectProps, Option } from './interface';

interface IArrow {
  prefix: string;
  open: boolean;
}
const Arrow: React.FC<IArrow> = ({ prefix, open }: IArrow) =>
  open ? <UpFilled className={`${prefix}-arrow`} /> : <DownFilled className={`${prefix}-arrow`} />;

const freeInputOption = (value: string): Option => ({
  value,
  label: value,
  groupValue: 'freeInput',
  groupLabel: '自由输入',
});

const defaultListRowHeight = 44;

const defaultLabelRenderer = (input: string, prefix: string) => (option: Option, isGroup: boolean) => {
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

const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const {
    multiple = false,
    options,
    value: _value,
    defaultValue,
    customizePrefixCls,
    onChange,
    size = 'medium',
    searchable = false,
    searchPredicate = defaultSearchPredicate,
    labelRenderer = defaultLabelRenderer,
    listHeight,
    listRowHeight = defaultListRowHeight,
    width,
    getContainer,

    // deprecated;
    defaultSelection = [],
  } = props;

  const defaultValues = defaultValue || defaultSelection;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefix = getPrefixCls('select', customizePrefixCls);
  const [_selection, _setSelection] = useState(new Set(concat<string>([], defaultValues)));
  const value = new Set(concat<string>([], _value || []));
  const selection = _value ? value : _selection;
  const [extraOptions, setExtraOptions] = useState<Option[]>([]);
  // options { value: index } hashtable;
  const [extendedOptions, optionHash, LabelHash, groupCount] = useMemo(() => {
    const groupKeys = new Map();
    const interalExtendedOptions = options.concat(extraOptions);
    const [internalOptionValueHash, internalOptionLabelHash] = interalExtendedOptions.reduce(
      (maps, option, index) => {
        maps[0].set(option.value, index);
        maps[1].set(option.label, true);
        if (option.groupLabel !== undefined) {
          groupKeys.set(option.groupLabel, true);
        }
        return maps;
      },
      [new Map(), new Map()]
    );
    return [interalExtendedOptions, internalOptionValueHash, internalOptionLabelHash, groupKeys.size];
  }, [options, extraOptions]);
  const [isFocused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [inputWidth, setInputWidth] = useState(2);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputWidthRef = useRef<HTMLDivElement>(null);

  const filteredOptions = filter(extendedOptions, searchPredicate(input));
  const hasExactMatch = LabelHash.get(input);

  if (!hasExactMatch && input) {
    filteredOptions.push(freeInputOption(input));
  }

  useEffect(() => {
    if (inputWidthRef.current) {
      setInputWidth(inputWidthRef.current?.getBoundingClientRect().width + 4);
    }
  }, [input]);

  const setSelection = (newSelection: string[] | Set<string>) => {
    const optSelection = new Set(newSelection);
    _setSelection(optSelection);
    if (!multiple) {
      setOpen(false);
      inputRef.current?.blur();
    }
    setExtraOptions(
      intersection(
        Array.from(newSelection),
        extraOptions.map((option) => option.value)
      ).map((v) => freeInputOption(v))
    );
    clearInput();
    if (onChange) {
      const selectedOptions = Array.from(optSelection).map(
        (v) => extendedOptions[optionHash.get(v)] || freeInputOption(v)
      );
      onChange(multiple ? selectedOptions : selectedOptions[0]);
    }
  };

  const onSelectChange = (v: string | string[]) => {
    setSelection(Array.isArray(v) ? v : [v]);
  };

  const onSelected = (v: string) => {
    if (optionHash.get(v) === undefined) {
      addExtraOptions(v);
    }
  };

  const addExtraOptions = (v: string) => {
    if (!hasExactMatch) {
      extraOptions.push(freeInputOption(v));
      setExtraOptions([...extraOptions]);
    }
  };

  const onSelectionKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // delete key
      case 8:
      case 46:
        if (!input.length) {
          const selectionArr = Array.from(selection);
          selectionArr.pop();
          setSelection(selectionArr);
        }
        break;
      // enter key
      case 13:
        if (input) {
          addExtraOptions(input);
          setSelection(multiple ? selection.add(input) : [input]);
          clearInput();
        }
        break;
      default:
        break;
    }
  };

  const onInputChange = (v: string) => {
    setInput(v);
  };

  const clearInput = () => {
    setInput('');
  };

  const onSelectorFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setFocused(true);
  };

  const onSelectorBlur = () => {
    setFocused(false);
  };

  const onVisibleChange = (visible: boolean) => {
    setOpen(visible);
  };

  const onTagCloseClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const key = e.currentTarget?.getAttribute('data-key') || '';
    selection.delete(key);
    setSelection(selection);
  };

  const renderSingleValue = () => (
    <div className={`${prefix}-item`}>
      {!input ? extendedOptions[optionHash.get(Array.from(selection)[0])]?.label : null}
    </div>
  );

  const renderMultipleValue = () =>
    Array.from(selection).map((v) => (
      <Tag key={v} data-key={v} className={`${prefix}-item`} closable persistCloseIcon onClose={onTagCloseClick}>
        {extendedOptions[optionHash.get(v)]?.label}
      </Tag>
    ));

  const trigger = (
    <div
      role="combobox"
      aria-expanded={open}
      aria-controls="expandable"
      tabIndex={0}
      className={classnames(`${prefix}`, `${prefix}-${size}`, {
        [`${prefix}-single`]: !multiple,
        [`${prefix}-focused`]: isFocused,
      })}
      onFocus={onSelectorFocus}
      onBlur={onSelectorBlur}
    >
      <div className={`${prefix}-selector`} style={width ? { width } : undefined}>
        <div className={classnames(`${prefix}-values-wrapper`)}>
          {multiple ? renderMultipleValue() : renderSingleValue()}
          {searchable ? (
            <>
              <div ref={inputWidthRef} className={classnames(`${prefix}-input-reference`, `${prefix}-item`)}>
                {input}
              </div>
              <Input
                forwardRef={inputRef}
                style={{ width: inputWidth }}
                className={classnames(`${prefix}-input`, `${prefix}-item`)}
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                tabIndex={-1}
                onKeyDown={onSelectionKeyDown}
              />
            </>
          ) : null}
        </div>
      </div>
      <Arrow prefix={prefix} open={open} />
    </div>
  );

  const list = (
    <List
      value={Array.from(selection)}
      dataSource={filteredOptions}
      onChange={onSelectChange}
      isMultiple={multiple}
      labelRenderer={labelRenderer(input, prefix)}
      width={Math.max(width || 0, 160)}
      onSelect={onSelected}
      height={listHeight || (filteredOptions.length + groupCount) * defaultListRowHeight}
      rowHeight={listRowHeight}
    />
  );

  return (
    <Dropdown
      visible={open}
      onVisibleChange={onVisibleChange}
      trigger="click"
      placement="bottomLeft"
      overlay={list}
      overlayClassName={`${prefix}-dropdown`}
      getTooltipContainer={getContainer}
    >
      {trigger}
    </Dropdown>
  );
};

export default Select;
