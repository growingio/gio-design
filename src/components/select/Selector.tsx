import { DownFilled, CloseCircleFilled } from '@gio-design/icons';
import classnames from 'classnames';
import { isEmpty, isNil, without } from 'lodash';
import React, { useEffect, useRef, useState, useImperativeHandle, useMemo } from 'react';
import { Tag } from '../..';
import { MaybeArray, Option } from './interface';

interface SelectorProps {
  input: string;
  disabled: boolean;
  prefix: string;
  size: string;
  multiple: boolean;
  bordered: boolean;
  isFocused: boolean;
  className?: string | undefined;
  visible: boolean;
  style?: React.CSSProperties | undefined;
  allowClear: boolean;
  mode: string;
  value?: MaybeArray<string | number> | undefined | null;
  searchable: boolean;
  hasExactMatch: boolean;
  allowCustomOption: boolean;
  placeholder?: string | undefined;
  onValueChange: (optValue: MaybeArray<string | number> | null) => void;
  optionLabelRenderer: (value: string | number, option?: Option) => React.ReactNode;
  getOptionByValue: (optValue: string | number) => Option;
  onSearch?: (input: string) => void | undefined;
  setInput: (value: React.SetStateAction<string>) => void;
  clearInput: () => void;
  onClear?: () => void | undefined;
  arrowComponent?: React.ReactElement | undefined;
  closeComponent?: React.ReactElement | undefined;
}

const defaultArrowComponent = (prefix: string) => {
  return <DownFilled className={`${prefix}-icon-arrow`} />;
};
const defaultCloseComponent = (prefix: string) => {
  return <CloseCircleFilled className={`${prefix}-icon-close`} />;
};

const Selector: React.ForwardRefRenderFunction<unknown, SelectorProps> = (props, ref) => {
  const {
    input,
    disabled,
    prefix,
    size,
    multiple,
    bordered,
    isFocused,
    className,
    visible,
    style,
    allowClear,
    mode,
    value,
    searchable,
    hasExactMatch,
    allowCustomOption,
    arrowComponent,
    closeComponent,
    placeholder,
    onValueChange,
    optionLabelRenderer,
    getOptionByValue,
    setInput,
    onSearch,
    clearInput,
    onClear,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputWidth, setInputWidth] = useState(2);
  const inputWidthRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isEmptyValue = useMemo(() => !isEmpty(value), [value]);
  const showClose = allowClear && (isEmptyValue || input) && isHovered;

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef?.current?.focus();
    },
    blur: () => {
      inputRef?.current?.blur();
    },
  }));
  useEffect(() => {
    if (inputWidthRef.current) {
      setInputWidth(inputWidthRef.current?.getBoundingClientRect().width + 4);
    }
  }, [input]);

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

  // ========================== render =======================
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
  const onTagCloseClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, v: string | number) => {
    e.stopPropagation();
    onValueChange(without((value as MaybeArray<string>) || [], v));
  };
  const renderMultipleValue = () => {
    if (mode === 'tags') {
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
    }
    const allValueLabel = (value as Array<string | number>)?.reduce((prev: any[], curr) => {
      if (getOptionByValue(curr)) {
        prev.push(getOptionByValue(curr)?.title || (getOptionByValue(curr)?.label as string));
      }
      return prev;
    }, []);
    return !input && !isNil(value) ? (
      <div
        className={`${prefix}-item-all`}
        style={{ maxWidth: style && style.width && style?.width > 0 ? 'fill-available' : undefined }}
      >
        <span className={`${prefix}-item-all-text`}>{allValueLabel?.join(',')}</span>
      </div>
    ) : null;
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
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onSearch?.(e.target.value);
    setInput(e.target.value);
  };
  const onInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (input) e.stopPropagation();
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
  return (
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
      ref={ref as any}
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
        {showClose ? closeComponent || defaultCloseComponent(prefix) : arrowComponent || defaultArrowComponent(prefix)}
      </div>
    </div>
  );
};

const ForwardSelector = React.forwardRef(Selector);
export default ForwardSelector;
