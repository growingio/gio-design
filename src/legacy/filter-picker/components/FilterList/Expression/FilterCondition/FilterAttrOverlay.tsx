import React, { useContext, useEffect, useState } from 'react';
import NumberAttrSelect from './components/NumberAttrSelect';
import DateAttrSelect from './components/DateAttrSelect';
import StringAttrSelect from './components/StringAttrSelect/index';
import Footer from '../../../Footer';
import './attrSelect.less';
import {
  attributeValue,
  StringValue,
  NumberValue,
  DateValue,
  FilterValueType,
  useSelectOptions,
  AttributeMap,
} from './interfaces';
import { operationsOptionType, titleGroup } from '../../../../interfaces';
import Checkbox from '../../../../../../checkbox'; // new
import Select from '../../../../../../select'; // new
import Divider from '../../../../../../divider';
import { FilterPickerContext } from '../../../../FilterPicker';

interface FilterAttrOverlayProps {
  valueType: attributeValue;
  onSubmit: (v: FilterValueType) => void;
  onCancel: () => void;
  op: StringValue | NumberValue | DateValue;
  curryDimensionValueRequest: (dimension: string, keyword: string) => Promise<any> | undefined;
  values: string[];
  exprKey: string;
  operationsOption?: operationsOptionType;
  numType?: 'positivedecimal' | 'decimal';
}

function FilterAttrOverlay(props: FilterAttrOverlayProps) {
  const { textObject: t } = useContext(FilterPickerContext);
  const selectOptions = useSelectOptions();
  const { valueType, onSubmit, onCancel, op, curryDimensionValueRequest, values, exprKey, operationsOption, numType } =
    props;
  const [operationValue, setOperationValue] = useState<StringValue | NumberValue | DateValue>(op);
  const [attrValue, setAttrValue] = useState<string[]>(values);
  const [checked, setChecked] = useState<boolean>(valueType === 'date' && (op === '>=' || op === '<='));

  const titleMap: titleGroup = {
    string: t.string,
    int: t.int,
    date: t.date,
    double: t.double,
  };

  useEffect(() => {
    if (valueType === 'date') {
      // 此处是为了处理，日期类型时，包含当天，选项('>=', '<=')不在 selectOptions 里面
      if (op === '>=') {
        setOperationValue('>');
      } else if (op === '<=') {
        setOperationValue('<');
      } else if (op === 'relativeTime') {
        // 相对现在和相对区间，传的参数都为relativeTime，需要转换成relativeCurrent（相对现在），relativeBetween（相对区间）
        const relativeTime = values?.[0].split(':')[1].split(',');
        if (relativeTime.length === 1 || relativeTime.includes('0')) {
          setOperationValue('relativeCurrent');
        } else {
          setOperationValue('relativeBetween');
        }
      }
    }
    if (values?.[0] === ' ') {
      setOperationValue(op === '!=' ? 'hasValue' : 'noValue');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [op, valueType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const selectChange = (v: StringValue | NumberValue) => {
    v && setOperationValue(v);
    v && setAttrValue([]);
    v && setChecked(false);
  };

  // 解析操作字段
  // 有值(hasValue) => (!=)
  // 无值(noValue) => (=)

  // 在日期类型下，在某天之前，在某天之后，需要判断是否包含当日
  // 若包含当日在某天之前(<)=> (<=)
  // 若包含当日，在某天之后(>) => (>=)
  // 相对现在(relativeCurrent) => (relativeTime)
  // 相对区间(relativeBetween) => (relativeTime)
  const parseValue = (
    v: StringValue | NumberValue | DateValue,
    check: boolean
  ): StringValue | NumberValue | DateValue => {
    const includesMap: { [key: string]: DateValue } = {
      '>': '>=',
      '<': '<=',
    };
    if (v === 'hasValue') {
      return '!=';
    }
    if (v === 'noValue') {
      return '=';
    }
    if (check) {
      return includesMap[v];
    }
    if (v.includes('relative')) {
      return 'relativeTime';
    }
    return v;
  };

  const submit = () => {
    const filterValue: FilterValueType = {
      op: parseValue(operationValue, checked),
      values: operationValue !== 'hasValue' && operationValue !== 'noValue' ? attrValue : [' '],
    };
    onSubmit(filterValue);
  };

  const cancel = () => {
    onSubmit({
      op: '=',
      values: [],
    });
    onCancel();
  };

  const getAttrSelect = (attr: attributeValue, selectValue: string) => {
    switch (attr) {
      case AttributeMap.date:
        // 日期类型
        return (
          <DateAttrSelect
            style={{ width: '100%' }}
            attrSelect={selectValue}
            attrChange={setAttrValue}
            values={attrValue}
          />
        );
      case AttributeMap.string:
        return (
          // 字符串类型
          <StringAttrSelect
            valueType={attr}
            attrSelect={selectValue}
            attrChange={setAttrValue}
            curryDimensionValueRequest={curryDimensionValueRequest}
            values={attrValue}
            exprKey={exprKey}
          />
        );
      default:
        return (
          <NumberAttrSelect
            attrSelect={selectValue}
            attrChange={setAttrValue}
            values={attrValue}
            type={numType || 'decimal'}
          />
        );
    }
  };

  return (
    <div className="filter-attr_select-box">
      <div>
        <div className="filter-attr_select-title">{titleMap[valueType] || t.string}</div>
        <Select
          options={
            operationsOption
              ? selectOptions?.[valueType]?.filter((opItem) =>
                  operationsOption?.[valueType].includes(opItem.value as any)
                )
              : selectOptions?.[valueType]
          }
          value={operationValue}
          style={{ marginTop: '16px', width: '100%' }}
          placeholder={t.select}
          onChange={selectChange}
          getContainer={(node) => node.parentNode as HTMLDivElement}
          overlayStyle={{ maxWidth: 350, minWidth: 150 }}
        />
        <Divider style={{ margin: '14px 0 16px' }} />
        {getAttrSelect(valueType, operationValue)}
        {valueType === AttributeMap.date && (operationValue === '>' || operationValue === '<') && (
          <Checkbox checked={checked} onChange={handleChange} style={{ marginTop: 16 }}>
            {t.includeToday}
          </Checkbox>
        )}
      </div>
      <Footer
        onSubmit={submit}
        onCancel={cancel}
        // 当values为空，同时不时无值，有值状态下，确认按钮disable
        comfirmStatus={operationValue !== 'hasValue' && operationValue !== 'noValue' && !attrValue.length}
      />
    </div>
  );
}

export default FilterAttrOverlay;
