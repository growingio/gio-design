import React, { useEffect, useState, useMemo, useContext } from 'react';
import { DeleteOutlined } from '@gio-design/icons';
import PropertySelector, { PropertyValue } from '../../../../property-selector';
import FilterCondition from './FilterCondition';
import './index.less';
import { attributeValue, FilterValueType, StringValue, NumberValue, DateValue, ListValue } from '../../../interfaces';
import { FilterPickerContext } from '../../../FilterPicker';
import Button from '../../../../../button'; // new

interface ExpressionProps {
  index?: number;
  filterItem: FilterValueType;
  deleteFilterItem: (index: number) => void;
  dimensionValueRequest?: (data: any) => Promise<any>;
  timeRange: string;
  measurements: any[];
  onChange: (expression: FilterValueType, index: number) => void;
  propertyOptions: any[];
  exprs: any[];
  recentlyStorePrefix: string;
}
function Expression(props: ExpressionProps) {
  const { textObject } = useContext(FilterPickerContext);
  const {
    index = 0,
    filterItem,
    deleteFilterItem,
    dimensionValueRequest,
    timeRange,
    measurements,
    onChange,
    propertyOptions,
    exprs,
    recentlyStorePrefix,
  } = props;
  const [valueType, setValueType] = useState<attributeValue>(
    (filterItem?.valueType?.toLowerCase() as attributeValue) || 'string'
  );
  const [values, setValues] = useState<string[]>(filterItem?.values);
  const [exprKey, setExprKey] = useState<string>(filterItem?.key || '');
  const [exprName, setExprName] = useState<string>(filterItem?.name || '');
  const [groupId, setGroupId] = useState<string>(filterItem?.groupId || '');
  const [iconId, setIconId] = useState<string>(filterItem?.iconId || '');
  const [op, setOp] = useState<StringValue | NumberValue | DateValue | ListValue>(filterItem?.op);
  const [subFilterItem, setSubFilterItem] = useState<FilterValueType>(filterItem);
  const { fetchDetailData, operationsOption } = React.useContext(FilterPickerContext);

  const submit = (v: FilterValueType) => {
    const expr: FilterValueType = {
      key: exprKey,
      name: exprName,
      valueType,
      ...v,
    };
    v && setValues(v.values);
    v && setOp(v.op);
    setSubFilterItem(expr);
    onChange(expr, index);
  };

  useEffect(() => {
    setSubFilterItem(filterItem);
  }, [filterItem]);

  const cancel = () => {
    onChange(subFilterItem, index);
  };

  const changePropertyPicker = (v: PropertyValue) => {
    if (v) {
      setValueType((v.valueType || 'string') as attributeValue);
      setExprName(v.label ?? '');
      setExprKey(v.value ?? '');
      setValues([]);
      setOp('=');
      setGroupId(v.groupId ?? '');
      setIconId(v.iconId ?? '');
    }
    const type = v?.valueType ? v?.valueType.toLowerCase() : 'string';
    const expr: FilterValueType = {
      key: v?.value,
      name: v?.label,
      valueType: type as attributeValue,
      op: type === 'list' ? 'hasAll' : '=',
      groupId: v?.groupId,
      iconId: v?.iconId,
      values: [],
    };
    onChange(expr, index);
  };

  const propertyValue = useMemo(
    () => (exprKey ? { value: exprKey, label: exprName, id: exprKey, groupId, iconId } : undefined),
    [exprKey, exprName, groupId, iconId]
  );

  return (
    <div className="expression-box" id="expression-box">
      <div className="express-regular_select">
        <div className="expression-icon">{index + 1}</div>
        <PropertySelector
          data-testid="propertySelect"
          className="express-propertySelect"
          placeholder={textObject.selectProperty}
          value={propertyValue}
          dataSource={propertyOptions.map((propertyOption: any) => ({
            ...propertyOption,
            ...{ valueType: propertyOption.valueType?.toLowerCase() },
          }))}
          disabledValues={exprs.map((expr: any) => expr.key)}
          onChange={changePropertyPicker}
          recentlyStorePrefix={recentlyStorePrefix}
          fetchDetailData={fetchDetailData}
          hideInputDetail
        />

        <FilterCondition
          valueType={valueType}
          onSubmit={submit}
          op={op}
          dimensionValueRequest={dimensionValueRequest}
          timeRange={timeRange}
          measurements={measurements}
          values={values}
          exprKey={exprKey}
          onCancel={cancel}
          operationsOption={operationsOption}
        />
      </div>
      <Button.IconButton type="text" size="small" onClick={() => deleteFilterItem(index)}>
        <DeleteOutlined size="14px" />
      </Button.IconButton>
    </div>
  );
}

export default Expression;
