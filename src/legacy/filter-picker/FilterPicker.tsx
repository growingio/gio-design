import React, { useMemo, useState } from 'react';
import { FilterOutlined } from '@gio-design/icons';
import { useLocale } from '@gio-design/utils';
import FilterOverlay from './components/FilterOverlay/index';
import { FilterPickerProps, FilterValueType, operationsOptionType } from './interfaces';
import Button from '../../button'; // new
import defaultLocaleTextObject from './locales/zh-CN';
import './style';
import { Popover } from '../..';

export const defaultOperationsOption: operationsOptionType = {
  string: ['=', '!=', 'in', 'not in', 'like', 'not like', 'hasValue', 'noValue'],
  int: ['=', '!=', '>', '>=', '<', '<=', 'between', 'not between', 'hasValue', 'noValue'],
  double: ['=', '!=', '>', '>=', '<', '<=', 'between', 'not between', 'hasValue', 'noValue'],
  date: ['=', '!=', '>', '<', 'relativeBetween', 'relativeCurrent', 'between', 'not between', 'hasValue', 'noValue'],
  list: ['hasAll', 'not hasAny', 'empty', 'not empty'],
};

export type TextObject = typeof defaultLocaleTextObject & { code: 'zh-CN' | 'en-US' };

export const FilterPickerContext = React.createContext<
  Pick<FilterPickerProps, 'fetchDetailData' | 'operationsOption'> & {
    textObject: TextObject;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
>({ textObject: { ...defaultLocaleTextObject, code: 'zh-CN' } });

const FilterPicker = (props: FilterPickerProps) => {
  const {
    children,
    getTooltipContainer,
    filter,
    propertyOptions,
    onConfirm,
    dimensionValueRequest,
    measurements,
    timeRange,
    recentlyStorePrefix,
    fetchDetailData,
    operationsOption,
    hasVisible = false,
    visible,
    onVisibleChange,
    placement = 'bottomLeft',
    disabled,
    ...rest
  } = props;

  const localeTextObject: TextObject = useLocale('FilterPicker');
  const textObject = useMemo(() => ({ ...defaultLocaleTextObject, ...localeTextObject }), [localeTextObject]);

  const [localVisible, setLocalVisible] = useState(false);
  const visibleChange = (v: boolean) => {
    setLocalVisible(v);
    onVisibleChange?.(v);
  };
  const cancel = () => {
    setLocalVisible(false);
    hasVisible && onVisibleChange?.(false);
  };
  const submit = (v: FilterValueType[]) => {
    setLocalVisible(false);
    hasVisible && onVisibleChange?.(false);
    onConfirm?.({ ...filter, exprs: v });
  };
  return (
    <FilterPickerContext.Provider
      value={{ fetchDetailData, textObject, operationsOption: { ...defaultOperationsOption, ...operationsOption } }}
    >
      <Popover
        visible={hasVisible ? visible : localVisible}
        trigger={['click']}
        onVisibleChange={visibleChange}
        content={
          <FilterOverlay
            onCancel={cancel}
            onSubmit={submit}
            filterList={filter.exprs}
            propertyOptions={propertyOptions}
            dimensionValueRequest={dimensionValueRequest}
            measurements={measurements}
            timeRange={timeRange}
            recentlyStorePrefix={recentlyStorePrefix}
          />
        }
        placement={placement}
        getContainer={getTooltipContainer}
        destroyOnHide
        disabled={disabled}
      >
        {children || (
          <Button.IconButton data-testid="filter-picker" size="small" active={localVisible} type="secondary" {...rest}>
            <FilterOutlined size="14px" />
          </Button.IconButton>
        )}
      </Popover>
    </FilterPickerContext.Provider>
  );
};

export default FilterPicker;
