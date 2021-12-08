import React, { useMemo, useState } from 'react';
import { FilterOutlined } from '@gio-design/icons';
import { useLocale } from '@gio-design/utils';
import FilterOverlay from './components/FilterOverlay/index';
import { FilterPickerProps, FilterValueType } from './interfaces';
import Button from '../../button'; // new
import Dropdown from '../dropdown';
import defaultLocaleTextObject from './locales/zh-CN';
import './style';
import { defaultOperationsOption } from './components/FilterList/Expression/FilterCondition';

export type TextObject = typeof defaultLocaleTextObject & { code: 'zh-CN' | 'en-US' };

export const FilterPickerContext = React.createContext<
  Pick<FilterPickerProps, 'fetchDetailData' | 'operationsOption'> & {
    textObject: TextObject;
  }
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
    placement = 'bottomRight',
    disabled,
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
      <Dropdown
        visible={hasVisible ? visible : localVisible}
        trigger={['click']}
        onVisibleChange={visibleChange}
        overlay={
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
        getTooltipContainer={getTooltipContainer}
        destroyTooltipOnHide
        disabled={disabled}
      >
        {children || (
          <Button.IconButton size="small" type={!localVisible ? 'text' : 'secondary'}>
            <FilterOutlined size="14px" />
          </Button.IconButton>
        )}
      </Dropdown>
    </FilterPickerContext.Provider>
  );
};

export default FilterPicker;
