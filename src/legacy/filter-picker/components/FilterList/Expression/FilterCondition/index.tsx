import React, { useMemo, useState } from 'react';
import { useLocale } from '@gio-design/utils';
import parseValuesToText from './utils';
import FilterAttrOverlay from './FilterAttrOverlay';
import { attributeValue, FilterValueType, StringValue, NumberValue, DateValue } from './interfaces';
import Selector from '../../../../../selector-pro';
import { ListValue, operationsOptionType } from '../../../../interfaces';
import Tooltip from '../../../../../../tooltip'; // new
import { defaultOperationsOption, FilterPickerContext, TextObject } from '../../../../FilterPicker';
import defaultLocaleTextObject from '../../../../locales/zh-CN';

interface FilterConditionProps {
  valueType: attributeValue;
  onSubmit: (v: FilterValueType) => void;
  onCancel: () => void;
  op: StringValue | NumberValue | DateValue | ListValue;
  dimensionValueRequest?: (data: any) => Promise<any>;
  timeRange: string;
  measurements: any[];
  values: string[];
  exprKey: string;
  operationsOption?: operationsOptionType;
  numType?: 'positivedecimal' | 'decimal' | 'positiveInteger';
  disabled?: boolean;
  borderless?: boolean;
  size?: 'large' | 'middle' | 'small';
}

function FilterCondition(props: FilterConditionProps) {
  const {
    valueType = 'string',
    onSubmit,
    onCancel,
    op = '=',
    dimensionValueRequest,
    timeRange,
    measurements,
    values,
    exprKey,
    operationsOption,
    numType,
    disabled = false,
    borderless = true,
    size = 'middle',
  } = props;
  const localeTextObject: TextObject = useLocale('FilterPicker');
  const textObject = useMemo(() => ({ ...defaultLocaleTextObject, ...localeTextObject }), [localeTextObject]);
  const [visible, setVisible] = useState(false);
  const conditionText = useMemo<string>(
    () => parseValuesToText(valueType, op, values, textObject),
    [valueType, op, values, textObject]
  );
  const visibleChange = (v: boolean) => {
    setVisible(v);
  };

  const curryDimensionValueRequest = (
    (timeRangeValue: string, measurementsValue: any[]) => (dimension: string, keyword: string) =>
      dimensionValueRequest?.({
        dimension,
        timeRange: timeRangeValue,
        metrics: measurementsValue,
        keyword,
      })
  )(timeRange, measurements);

  const submit = (v: FilterValueType) => {
    setVisible(false);
    onSubmit(v);
  };
  const cancel = () => {
    setVisible(false);
    onCancel();
  };

  const valueRender = () => (
    <span className="filter-condition_select">
      <Tooltip
        title={conditionText}
        disabled={conditionText === textObject.selectFilter}
        getContainer={() => document.body}
        placement="topLeft"
      >
        <span className="filter-condition_select-text">{conditionText}</span>
      </Tooltip>
    </span>
  );

  const dropdownRender = () => (
    <FilterAttrOverlay
      valueType={valueType}
      onSubmit={submit}
      onCancel={cancel}
      op={op}
      curryDimensionValueRequest={curryDimensionValueRequest}
      values={values}
      exprKey={exprKey}
      operationsOption={{ ...defaultOperationsOption, ...operationsOption }}
      numType={numType}
    />
  );

  return exprKey ? (
    <FilterPickerContext.Provider value={{ textObject } as any}>
      <Selector
        valueRender={valueRender}
        dropdownVisible={visible}
        dropdownRender={dropdownRender}
        onDropdownVisibleChange={visibleChange}
        disabled={disabled}
        borderless={borderless}
        size={size}
      />
    </FilterPickerContext.Provider>
  ) : null;
}
export default FilterCondition;
