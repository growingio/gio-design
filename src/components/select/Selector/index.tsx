import { DownFilled, CloseCircleFilled } from '@gio-design/icons';
import classnames from 'classnames';
import { isEmpty, isNil } from 'lodash';
import React, { useRef, useState, useImperativeHandle, useMemo, useCallback } from 'react';
import Tag from '../../tag';
import ToolTip from '../../tooltip';
import { SelectorProps } from '../interface';
import SearchInput from './input';

const defaultArrowComponent = (prefix: string) => <DownFilled className={`${prefix}-icon-arrow`} />;
const defaultCloseComponent = (prefix: string) => <CloseCircleFilled className={`${prefix}-icon-close`} />;

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
    searchType,
    arrowComponent,
    closeComponent,
    placeholder,
    innerInputPlaceHolder,
    deleteValue,
    optionLabelRenderer,
    getOptionByValue,
    onInputChange,
    onAllowClear,
    onFocusChange,
    onSelectorKeyDown,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const selectorAllRef = useRef<HTMLSpanElement>(null);
  const selectValuesRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isEmptyValue = useMemo(() => !isEmpty(value), [value]);
  const showClose = allowClear && (isEmptyValue || input) && isHovered && !disabled;
  const selectValuesWidth = selectValuesRef?.current?.getBoundingClientRect()?.width;
  const isShowTooltip = style?.width && (selectValuesWidth || 0) - (selectorAllRef?.current?.offsetWidth || 0) <= 0;
  useImperativeHandle(ref, () => ({
    clientWidth: selectorRef?.current?.clientWidth,
    focus: () => {
      inputRef?.current?.focus();
    },
    blur: () => {
      inputRef?.current?.blur();
    },
    onBlur: () => {
      selectorRef?.current?.blur();
    },
    onFocus: () => {
      selectorRef?.current?.focus();
    },
  }));

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
  const onAllClearClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    if (allowClear) onAllowClear();
  };
  const onFocus = useCallback(() => {
    rest?.onFocus?.(); // dropdown event mothods
    onFocusChange?.(true);
  }, [onFocusChange, rest]);

  const onBlur = useCallback(() => {
    rest?.onBlur?.();
    onFocusChange?.(false);
  }, [onFocusChange, rest]);

  // ========================== render =======================
  const renderPlaceHolder = () => {
    if (isEmpty(value) && (searchType === 'inner' || !input) && placeholder) {
      return <div className={`${prefix}-item ${prefix}-placeholder`}>{innerInputPlaceHolder || placeholder}</div>;
    }
    return null;
  };

  const renderMultipleValue = () => {
    const onTagCloseClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, v: string | number) => {
      e.stopPropagation();
      deleteValue(value as React.ReactText[], v);
    };
    if (mode === 'tags') {
      return (value as Array<string | number>)?.map((v) => (
        <Tag
          key={v}
          className={`${prefix}-tag-item`}
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
      const item = getOptionByValue(curr);
      if (item) {
        return [...prev, item?.title || item?.label];
      }
      return [...prev, curr];
    }, []);

    return (searchType === 'inner' || !input) && !isNil(value) ? (
      <ToolTip
        disabled={!isShowTooltip}
        title={allValueLabel?.join(',')}
        placement="bottom"
        getTooltipContainer={() => selectorRef?.current?.parentElement || document.body}
      >
        <div
          className={`${prefix}-item-all`}
          style={{ maxWidth: style && style.width && style?.width > 0 ? 'fill-available' : undefined }}
        >
          <span ref={selectorAllRef} className={classnames(`${prefix}-item-all-text`, {})}>
            {allValueLabel?.join('，')}
          </span>
        </div>
      </ToolTip>
    ) : null;
  };

  const renderSingleValue = () => {
    const text = optionLabelRenderer(value as string | number, getOptionByValue(value as string | number));
    return (!input || searchType === 'inner') && (typeof value === 'string' || typeof value === 'number') ? (
      <ToolTip
        disabled={!isShowTooltip}
        title={text}
        placement="bottom"
        getTooltipContainer={() => selectorRef?.current?.parentElement || document.body}
      >
        <div className={classnames(`${prefix}-item`)}>
          <span ref={selectorAllRef} className={classnames(`${prefix}-item-text`)}>
            {text}
          </span>
        </div>
      </ToolTip>
    ) : null;
  };

  return (
    <div
      role={disabled ? undefined : 'combobox'}
      aria-expanded={visible}
      aria-controls="expandable"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      className={classnames(`${prefix}`, `${prefix}-${size}`, {
        [`${prefix}-single`]: !multiple,
        [`${prefix}-bordered`]: bordered,
        [`${prefix}-focused`]: isFocused,
        [`${prefix}-disabled`]: disabled,
      },className)}
      aria-disabled={disabled}
      aria-hidden="true"
      style={style}
      ref={selectorRef as any}
      // Dropdown trigger set Event on rest, fix dropdown can not onclick trigger
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onSelectorKeyDown}
    >
      <div id="selector" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className={`${prefix}-selector`}>
          <div className={classnames(`${prefix}-values-wrapper`)} ref={selectValuesRef}>
            {multiple ? renderMultipleValue() : renderSingleValue()}
            {searchType === 'normal' && !disabled && (
              <SearchInput
                prefix={prefix}
                mode={mode}
                multiple={multiple}
                onInputChange={onInputChange}
                inputValue={input}
                ref={inputRef}
              />
            )}
            {renderPlaceHolder()}
          </div>
        </div>
        <div
          aria-hidden="true"
          className={classnames(`${prefix}-arrow`, {
            [`${prefix}-arrow-focused`]: visible,
          })}
          onClick={showClose ? onAllClearClick : undefined}
        >
          {showClose
            ? closeComponent || defaultCloseComponent(prefix)
            : arrowComponent || defaultArrowComponent(prefix)}
        </div>
      </div>
    </div>
  );
};

const ForwardSelector = React.forwardRef(Selector);
export default ForwardSelector;
