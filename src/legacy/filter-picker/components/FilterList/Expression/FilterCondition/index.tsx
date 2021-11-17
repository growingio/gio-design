import React, { useMemo, useState } from 'react';
import parseValuesToText from './utils';
import FilterAttrOverlay from './FilterAttrOverlay';
import { attributeValue, FilterValueType, StringValue, NumberValue, DateValue } from './interfaces';
import Selector from '../../../../../selector-pro';
import { operationsOptionType } from '../../../../interfaces';
import Tooltip from '../../../../../../tooltip'; // new

const defaultOperationsOption: operationsOptionType = {
  string: ['=', '!=', 'in', 'not in', 'like', 'not like', 'hasValue', 'noValue'],
  int: ['=', '!=', '>', '>=', '<', '<=', 'between', 'not between', 'hasValue', 'noValue'],
  date: ['=', '!=', '>', '<', 'relativeBetween', 'relativeCurrent', 'between', 'not between', 'hasValue', 'noValue'],
  STRING: ['=', '!=', 'in', 'not in', 'like', 'not like'],
};

interface FilterConditionProps {
  valueType: attributeValue;
  onSubmit: (v: FilterValueType) => void;
  onCancel: () => void;
  op: StringValue | NumberValue | DateValue;
  dimensionValueRequest?: (data: any) => Promise<any>;
  timeRange: string;
  measurements: any[];
  values: string[];
  exprKey: string;
  operationsOption?: operationsOptionType;
  numType?: 'positivedecimal' | 'decimal';
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
  const [visible, setVisible] = useState(false);
  const conditionText = useMemo<string>(() => parseValuesToText(valueType, op, values), [valueType, op, values]);
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
      <Tooltip title={conditionText} disabled={conditionText === '选择过滤条件'} placement="topLeft">
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
    <Selector
      valueRender={valueRender}
      dropdownVisible={visible}
      dropdownRender={dropdownRender}
      onDropdownVisibleChange={visibleChange}
      disabled={disabled}
      borderless={borderless}
      size={size}
    />
  ) : null;
}
export default FilterCondition;
