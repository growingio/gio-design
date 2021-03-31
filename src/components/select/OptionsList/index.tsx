/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {LegacyRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import classnames from 'classnames';
import { ListRef } from 'rc-virtual-list';
import VirtualList from '../VirtualList';
import { OptionsListProps, Option } from '../interface';
import Checkbox from '../../checkbox';
import { ForwardRenderGroup, ForwardRenderOption, ForwardRenderTooltip } from './OptionItem';
import SearchBar from '../../search-bar';
import Button from '../../button';



const OptionsList: React.ForwardRefRenderFunction<any, OptionsListProps> = (props, ref) => {
  const {
    input,
    prefixCls,
    data,
    groupStyle,
    height,
    itemHeight,
    isUseAll,
    selected,
    searchType,
    tempValue,
    value,
    placeholder,
    notFoundContent,
    onValueChange,
    onTempValueChange,
    setTempValue,
    onInputChange,
    onOptionClick,
    onOptionListKeyDown,
    activeIndex,
    multiple,
    isFooter,
    style,
    setActiveIndex,
    ...restProps
  } = props;

  const selectAllRef = useRef(null);
  const OptionListRef = useRef<HTMLDivElement>(null);
  const VirtualListRef = useRef<ListRef>(null);

  useImperativeHandle(ref, () => ({
    onConfirm: () => {
      onConfirm()
    },
    onCancel: () => {
      onCancel()
    },
    onFocus: () => {
      OptionListRef?.current?.focus();
    },
    onBlur: () => {
      OptionListRef?.current?.blur();
    },
    scrollIntoView: (index: number, offset?: number) => {
      scrollIntoView(index, offset)
    }
    
  }));


  
  const filterflattenOptions = useMemo(
    () =>
      data.filter((filterOption: Option & { isSelectOptGroup: boolean }) => !filterOption.isSelectOptGroup),
    [data]
  );

  const isChecked = useMemo(() => (selected as [])?.length >= 1, [selected]);
  const isIndeterminate = isChecked && (selected as [])?.length < filterflattenOptions?.length;

  const onAllClick = (checked: boolean) => {
    if (isFooter) {
      if (checked) {
        setTempValue((value || []) as React.ReactText[]);
      } else {
        const values = filterflattenOptions.reduce(
          (prev: unknown[], curr: Option) => [...prev, curr.value || curr.label],
          []
        ).filter((v:any) => !tempValue.includes(v))
        
        setTempValue(values as React.ReactText[]);
      }
      return;
    }
    onValueChange?.(
      checked
        ? null
        : filterflattenOptions.reduce((prev: any[], curr: Option) => [...prev, curr.value || curr.label], [])
    );
  };
  const onConfirm = useCallback(() => onTempValueChange(tempValue),[onTempValueChange, tempValue]);
  const onCancel = useCallback(() => onTempValueChange([]), [onTempValueChange]);

  const scrollIntoView = (index: number,offset?: number) => {
    VirtualListRef?.current?.scrollTo({ index, offset });
  };
  const renderAllOptions = () => (
      <div
        ref={selectAllRef}
        className={classnames(`${prefixCls}-list-option-all`, {})}
        onClick={(e) => {
          e.stopPropagation();
          onAllClick(isChecked);
        }}
        aria-hidden="true"
      >
        <>
          <Checkbox checked={isChecked} indeterminate={isIndeterminate} />
          <span style={{ width: 10 }} />
        </>
        全部
      </div>
    );
  return (
    <div
      className={`${prefixCls}-list`}
      style={style}
      ref={OptionListRef as LegacyRef<HTMLDivElement>}
      aria-hidden='true'
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      onMouseLeave={() => setActiveIndex(-1)}
      onKeyDown={onOptionListKeyDown}
    >
      {searchType === 'inner' && (
        <div className={classnames(`${prefixCls}-list-search-bar`, {})}>
          <SearchBar onChange={onInputChange} value={input} placeholder={placeholder} />
        </div>
      )}
      {isUseAll && renderAllOptions()}
      {data.length > 0 ? (
        <VirtualList
          itemKey="value"
          prefixCls={prefixCls}
          ref={VirtualListRef}
          data={data}
          height={height}
          itemHeight={itemHeight}
          {...restProps}
        >
          {(option: Option & { isSelectOptGroup: boolean}, index: number) => option.isSelectOptGroup ? (
              <ForwardRenderGroup option={option} prefixCls={prefixCls} groupStyle={groupStyle} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            ) : (
              <ForwardRenderTooltip
                tooltip={option?.tooltip}
                render={(
                  <ForwardRenderOption
                    option={option}
                    prefixCls={prefixCls}
                    selected={selected}
                    index={index}
                    activeIndex={activeIndex}
                    multiple={multiple}
                    onOptionClick={onOptionClick}
                    setActiveIndex={setActiveIndex}
                    {...restProps}
                  />
                )}
              />
            )}
        </VirtualList>
      ) : (
        notFoundContent
      )}

      {isFooter && (
        <div className={`${prefixCls}-footer-button-group`}>
          <Button
            type="secondary"
            size="middle"
            className={classnames(`${prefixCls}-button`, {
              [`${prefixCls}-button-active`]: activeIndex === data.length,
            })}
            onClick={onCancel}
          >
            取消
          </Button>
          <Button
            type="secondary"
            className={classnames({[`${prefixCls}-button-active`]: activeIndex === data.length + 1})}
            size="middle"
            onClick={onConfirm}
          >
            确定
          </Button>
        </div>
      )}
    </div>
  );
};

const ForwardRenderOptionList = React.forwardRef(OptionsList);

export default ForwardRenderOptionList;
